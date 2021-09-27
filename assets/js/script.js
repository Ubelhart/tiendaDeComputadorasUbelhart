class Producto {
  constructor(id, nombre, imagen, cantidad, categoria, precio, precioUnidad) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.cantidad = cantidad;
    this.categoria = categoria;
    this.precio = precio;
    this.precioUnidad = precioUnidad;
  }

  getPrecio() {
    return this.precio;
  }
}

let productos = [];
let carrito = [];
let carritoAgregado;
let DOMbutton = document.getElementsByClassName("btn-agr");

productos.push(
  new Producto(
    1,
    "RTX 3070",
    "./media/img/productoUno.webp",
    1,
    "Tarjeta Gráfica",
    312801,
    312801
  )
);
productos.push(
  new Producto(
    2,
    "SPECTRIX",
    "./media/img/productoDos.webp",
    1,
    "Memoria Ram",
    8124,
    8124
  )
);
productos.push(
  new Producto(
    3,
    "KINGSTON",
    "./media/img/productoTres.webp",
    1,
    "SSD",
    4289,
    4289
  )
);
productos.push(
  new Producto(
    4,
    "XIGMATEK",
    "./media/img/productoCuatro.webp",
    1,
    "Gabinete",
    15256,
    15256
  )
);
productos.push(
  new Producto(
    5,
    "i9-10850K",
    "./media/img/productoCinco.webp",
    1,
    "Procesador",
    59999,
    59999
  )
);
productos.push(
  new Producto(
    6,
    "ASUS ROG STRIX B550-F",
    "./media/img/productoSeis.webp",
    1,
    "Placa Madre",
    28399,
    28399
  )
);

//Visualiza los productos en el HTML a partir de los objetos

function dibujarProductos(productos) {
  productos.forEach((element) => {
    let { id, nombre, categoria, imagen, precio } = element;
    let section = document.createElement("section");
    section.innerHTML = `<h2> ${nombre}</h2>
          <div>
            <img src="${imagen}" alt="${categoria}">
          </div>
          <div class="price">
            <input id="btn${id}" class="btn btn-agr" type="button" value="Agregar">
            <p>$${precio}</p>
          </div>`;

    $("#items").append(section);
  });
  agregarAlCarrito();
  dibujarCarrito();
}

// Visualiza el carrito dinamicamente dependiendo de que elegiste

function dibujarCarrito() {
  carritoAgregado = JSON.parse(localStorage.getItem("carrito"));
  if (carrito.length === 0 && carritoAgregado) {
    for (let i = 0; i < carritoAgregado.length; i++) {
      carrito.push(carritoAgregado[i]);
    }
  }
  if (carritoAgregado) {
    for (let i = 0; i < carritoAgregado.length; i++) {
      let section = document.createElement("section");
      section.innerHTML = `<div>
                                            <img src="${carritoAgregado[i].imagen}" alt="${carritoAgregado[i].categoria}">
                                          </div>
                                          <div>
                                            <h3>${carritoAgregado[i].nombre}</h3>
                                            <p>Cantidad: ${carritoAgregado[i].cantidad}</p>
                                            <p>$${carritoAgregado[i].precio}</p>
                                          </div>
                                          `;

      $("#carrito").append(section);
    }
  }
  calcularTotal();
}

// Calcula es precio de todos los productos del carrito

function calcularTotal() {
  for (let i = 0; i < carrito.length; i++) {
    let total = 0;
    total = total + carrito[i].precio;
    $("#total").text("$" + total);
  }
}

// Finaliza la compra una vez apretado el boton Finalizar Compra

function finalizarCompra() {
  $("#btn-fin").click(() => {
    if (carritoAgregado) {
      localStorage.clear();
      $("#carrito").html("<h3>Su Compra se ha Completado Exitosamente</h3>");
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  });
}

// Agrega los productos a otro array para mandarlo al local storage

function agregarAlCarrito() {
  for (let i = 0; i < $(".btn-agr").length; i++) {
    DOMbutton[i].onclick = () => {
      let existeProducto = carrito.some(
        (element) => element.id === productos[i].id
      );
      if (existeProducto) {
        carrito.map((element) => {
          if (element.id === productos[i].id) {
            element.cantidad++;
            element.precio = element.precioUnidad * element.cantidad;
            return element;
          } else {
            return element;
          }
        });
      } else {
        carrito.push(productos[i]);
      }
      if (carrito.length > 0) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
      $("#carrito").text(" ");
      dibujarCarrito();
    };
  }
  finalizarCompra();
}

dibujarProductos(productos);
