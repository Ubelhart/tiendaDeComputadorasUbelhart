class Producto {
  constructor(id, nombre, imagen, categoria, precioUnidad) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precioUnidad = precioUnidad;
  }
}

const productos = [];
let carrito = [];
let carritoHTML = $("#carrito");
let carritoFin = $("#carrito-fin");
const URLGET =
  "https://api.mercadolibre.com/sites/MLA/search?q=pc%20componentes&limit=6";

productos.push(
  new Producto(
    1,
    "RTX 3070",
    "./media/img/productoUno.webp",
    "Tarjeta Gráfica",
    312801
  )
);
productos.push(
  new Producto(
    2,
    "SPECTRIX",
    "./media/img/productoDos.webp",
    "Memoria Ram",
    8124
  )
);
productos.push(
  new Producto(3, "KINGSTON", "./media/img/productoTres.webp", "SSD", 4289)
);
productos.push(
  new Producto(
    4,
    "XIGMATEK",
    "./media/img/productoCuatro.webp",
    "Gabinete",
    15256
  )
);
productos.push(
  new Producto(
    5,
    "i9-10850K",
    "./media/img/productoCinco.webp",
    "Procesador",
    59999
  )
);
productos.push(
  new Producto(
    6,
    "ASUS ROG STRIX B550-F",
    "./media/img/productoSeis.webp",
    "Placa Madre",
    28399
  )
);

//Visualiza los productos en el HTML a partir de los objetos

function dibujarProductos(productos) {
  if (localStorage.length > 0) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }
  productos.forEach((element) => {
    let { id, nombre, categoria, imagen, precioUnidad } = element;
    let section = document.createElement("section");
    section.innerHTML = `<h2> ${nombre}</h2>
          <div>
            <img src="${imagen}" alt="${categoria}">
          </div>
          <div class="price">
            <input id="${id}" class="btn btn-agr" type="button" value="Agregar">
            <p>$${precioUnidad}</p>
          </div>`;

    $("#items").append(section);
  });
  $("#items").append(
    `<input id="ver-mas" class="btn btn-ver-mas" type="button" value="VER MAS"/>`
  );
}

// Visualiza el carrito dinamicamente dependiendo de que elegiste

function dibujarCarrito(dom) {
  dom.html("");
  carrito.forEach((producto) => {
    let li = document.createElement("li");
    let { id, imagen, categoria, nombre, cantidad, precio } = producto;
    li.innerHTML = `<h4>${nombre}</h4>
                              <div>
                                <img src="${imagen}" alt="${categoria}">
                              </div>
                              <div>
                                <p>Cantidad: ${cantidad}</p>
                                <p>$${precio}</p>
                              </div>
                              <div>
                                <input id="btn-menos${id}" data-id="${id}" class="btn" type="button" value="-">
                                <input id="btn-mas${id}" data-id="${id}"class="btn" type="button" value="+">
                              </div>
                              `;

    dom.append(li);
  });
  calcularTotal();
}

// Calcula es precio de todos los productos del carrito

function calcularTotal() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio;
    $(".total").text("$" + total);
    $("#cuota1").text(`1 Cuota de $${total}`);
    $("#cuota3").text(`3 Cuotas de $${total / 3}`);
    $("#cuota6").text(`6 Cuotas de $${total / 6}`);
    $("#cuota12").text(`12 Cuotas de $${total / 12}`);
  }
}

$(document).ready(function () {
  // Dibuja nuevos productos dinamicamente con datos de la api de Mercadolibre
  $("#ver-mas").click(() => {
    $.ajax({
      url: URLGET,
      success: function (data) {
        let id = 7;
        for (let i = 0; i < data.results.length; i++) {
          productos.push(
            new Producto(
              id++,
              data.results[i].title,
              data.results[i].thumbnail,
              data.results[i].domain_id,
              data.results[i].price
            )
          );
        }
        $("#items").html("");
        dibujarProductos(productos);
        $("#ver-mas").remove();
      },
    });
  });

  // Visualiza una tarjeta del producto

  function dibujarTarjeta(idProducto) {
    let div = document.createElement("div");
    let producto = productos.find((producto) => producto.id === idProducto);
    div.innerHTML = `<p>HAS AGREGADO</p>
                                      <div>
                                        <img src="${producto.imagen}" alt="${producto.categoria}">
                                      </div>
                                      <div>
                                        <p>${producto.nombre}</p>
                                        <p>$${producto.precioUnidad}</p>
                                      <p>AL CARRITO</p>
                                      </div>`;

    $("#tarjeta")
      .html(div)
      .fadeIn("slow", function () {
        setTimeout(() => {
          $("#tarjeta").fadeOut();
        }, 1000);
      });
  }

  // Agrega los productos a otro array para mandarlo al local storage

  function agregarAlCarrito(id) {
    let existeProducto = carrito.find((element) => element.id === id);
    if (existeProducto) {
      carrito = carrito.map((element) => {
        if (element.id === id) {
          element.cantidad = element.cantidad + 1;
          element.precio = element.precioUnidad * element.cantidad;
          return element;
        }
        return element;
      });
    } else {
      let nuevoProducto = productos.find((element) => element.id === id);
      nuevoProducto.cantidad = 1;
      nuevoProducto.precio = nuevoProducto.precioUnidad;
      carrito.push(nuevoProducto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoHTML.text(" ");
  }

  function restarAlCarrito(id) {
    let existeProducto = carrito.find((element) => element.id === id);
    if (existeProducto) {
      carrito = carrito.map((element) => {
        if (element.id === id) {
          element.cantidad = element.cantidad - 1;
          element.precio = element.precio - element.precioUnidad;
          return element;
        }
        return element;
      });
      carrito = carrito.filter((element) => {
        return element.cantidad > 0;
      });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoHTML.text(" ");
  }

  // Finaliza la compra una vez apretado el boton Finalizar Compra

  $("#btn-fin").click((e) => {
    e.preventDefault();
    if (carrito.length > 0 && validarFormulario() == true) {
      localStorage.clear();
      carrito = new Array();
      carritoFin.html(
        `<h2 class="exito">Su Compra se ha Completado Exitosamente</h2>`
      );
      $(".total").text("$0");
      setTimeout(() => {
        location.href = "./index.html";
      }, 1000);
    }
  });

  // Hace una animacion cuando apretas el carrito

  $("#boton-carrito").click(() => {
    dibujarCarrito(carritoHTML);
    $("#aside").animate(
      {
        width: "toggle",
      },
      500
    );
  });

  // Evento del boton agregar

  $(document).on("click", ".btn-agr", (event) => {
    let id = parseInt(event.target.id);
    agregarAlCarrito(id);
    dibujarCarrito(carritoHTML);
    dibujarTarjeta(id);
  });

  // Evento para agregar mas cantidad desde el carrito

  function cambiarCantidad(boton, cantidad) {
    for (let i = 0; i <= 12; i++) {
      $(document).on("click", `#btn-${boton + i}`, () => {
        let id = parseInt($(`#btn-${boton + i}`).attr("data-id"));
        cantidad(id);
        dibujarCarrito(carritoHTML);
        dibujarCarrito(carritoFin);
      });
    }
  }
  cambiarCantidad("mas", agregarAlCarrito);
  cambiarCantidad("menos", restarAlCarrito);
});
// Los botones cambian de color al hacerles click

$(document).on("click", ".btn", (event) => {
  let id = event.target.id;
  $("#" + id).toggleClass("btn btn-click");
  setTimeout(() => {
    $("#" + id).toggleClass("btn-click btn");
  }, 250);
});

// Valida el formulario para finalizar la compra

function validarFormulario() {
  $(".error").fadeOut();

  if ($("#name").val() == "") {
    $("#name").after(`<p class="error">Tiene que escribir su nombre</p>`);
    $("#name").focus();
    return false;
  }

  if ($("#email").val() == "") {
    $("#email").after(`<p class="error">Tiene que escribir su email</p>`);
    $("#email").focus();
    return false;
  }

  if ($("#tel").val() == "") {
    $("#tel").after(`<p class="error">Tiene que escribir su telefono</p>`);
    $("#tel").focus();
    return false;
  }

  if ($("#numero-tarjeta").val() == "") {
    $("#numero-tarjeta").after(
      `<p class="error">Tiene que escribir su número de tarjeta</p>`
    );
    $("#numero-tarjeta").focus();
    return false;
  }

  if ($("#nombre-tarjeta").val() == "") {
    $("#nombre-tarjeta").after(
      `<p class="error">Tiene que escribir el nombre que aparece en su tarjeta</p>`
    );
    $("#nombre-tarjeta").focus();
    return false;
  }

  if ($("#cvc-tarjeta").val() == "") {
    $("#cvc-tarjeta").after(
      `<p class="error">Tiene que escribir el cvc de su tarjeta</p>`
    );
    $("#cvc-tarjeta").focus();
    return false;
  }

  if ($("#desde-tarjeta").val() == "" || $("#hasta-tarjeta").val() == "") {
    $("#tar-fec").after(
      `<p class="error">Tiene que escribir el desde y hasta de su tarjeta</p>`
    );
    $("#desde-tarjeta").focus();
    return false;
  }

  return true;
}

dibujarProductos(productos);
dibujarCarrito(carritoFin);
