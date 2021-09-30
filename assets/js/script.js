class Producto {
  constructor(id, nombre, imagen, categoria, precioUnidad) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precioUnidad = precioUnidad;
  }

  getPrecio() {
    return this.precio;
  }
}

let productos = [];
let carrito = [];
let DOMbutton = document.getElementsByClassName("btn-agr");

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
}

$(document).ready(function () {
  // Visualiza el carrito dinamicamente dependiendo de que elegiste

  function dibujarCarrito() {
    let carritoHTML = $("#carrito");
    carritoHTML.html("");
    carrito.forEach((producto) => {
      let section = document.createElement("section");
      let { imagen, categoria, nombre, cantidad, precio } = producto;
      section.innerHTML = `<div>
                                          <img src="${imagen}" alt="${categoria}">
                                        </div>
                                        <div>
                                          <h3>${nombre}</h3>
                                          <p>Cantidad: ${cantidad}</p>
                                          <p>$${precio}</p>
                                        </div>
                                        `;

      carritoHTML.append(section);
    });
    calcularTotal();
  }

  // Visualiza una tarjeta del producto

  function dibujarTarjeta(idProducto) {
    let section = document.createElement("section");
    let producto = productos.find((producto) => producto.id === idProducto);
    section.innerHTML = `<p>HAS AGREGADO</p>
                                      <div>
                                        <img src="${producto.imagen}" alt="${producto.categoria}">
                                      </div>
                                      <div>
                                        <p>${producto.nombre}</p>
                                        <p>$${producto.precioUnidad}</p>
                                      <p>AL CARRITO</p>
                                      </div>`;

    $("#tarjeta")
      .html(section)
      .fadeIn("slow", function () {
        setTimeout(() => {
          $("#tarjeta").fadeOut();
        }, 1000);
      });
  }

  // Agrega los productos a otro array para mandarlo al local storage

  function agregarAlCarrito(idNuevoProducto) {
    let existeProducto = carrito.find(
      (element) => element.id === idNuevoProducto
    );
    if (existeProducto) {
      carrito = carrito.map((element) => {
        if (element.id === idNuevoProducto) {
          element.cantidad = element.cantidad + 1;
          element.precio = element.precioUnidad * element.cantidad;
          return element;
        }
        return element;
      });
    } else {
      let nuevoProducto = productos.find(
        (element) => element.id === idNuevoProducto
      );
      nuevoProducto.cantidad = 1;
      nuevoProducto.precio = nuevoProducto.precioUnidad;
      carrito.push(nuevoProducto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    $("#carrito").text(" ");
  }

  // Calcula es precio de todos los productos del carrito

  function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      total = total + carrito[i].precio;
      $("#total").text("$" + total);
    }
  }

  // Finaliza la compra una vez apretado el boton Finalizar Compra

  $("#btn-fin").click(() => {
    if (carrito.length > 0) {
      localStorage.clear();
      carrito = new Array();
      $("#carrito").html("<h3>Su Compra se ha Completado Exitosamente</h3>");
      $("#total").text("$0");
    }
  });

  // Hace una animacion cuando apretas el carrito

  $("#boton-carrito").click(() => {
    dibujarCarrito();
    $("#aside").animate(
      {
        width: "toggle",
      },
      500
    );
  });

  // Evento del boton agregar

  $(".btn-agr").click((event) => {
    let idNuevoProducto = parseInt(event.target.id);
    agregarAlCarrito(idNuevoProducto);
    dibujarCarrito();
    dibujarTarjeta(idNuevoProducto);
  });
});

dibujarProductos(productos);
