class Producto {
  constructor(id, nombre, imagen, categoria, precio) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precio = precio;
  }

  getPrecio() {
    return this.precio;
  }
}

let productos = [];
let carrito = [];
let carritoAgregado;
let total = 0;
let DOMitems = document.getElementById("items");
let DOMbutton = document.getElementsByClassName("btn-agr");
let DOMcarrito = document.getElementById("carrito");
let DOMbotonCarrito = document.getElementById("btn-fin");
let DOMtotal = document.getElementById("total");

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
    "Gabinete",
    28399
  )
);

//Visualiza los productos en el HTML a partir de los objetos

function dibujarProductos(productos) {
  for (let i = 0; i < productos.length; i++) {
    let section = document.createElement("section");
    section.innerHTML = `<h2> ${productos[i].nombre}</h2>
        <div>
          <img src="${productos[i].imagen}" alt="${productos[i].categoria}">
        </div>
        <div class="price">
          <input class="btn btn-agr" type="button" value="Agregar">
          <p>$${productos[i].precio}</p>
        </div>`;

    items.appendChild(section);
  }
  dibujarCarrito();
  agregarAlCarrito();
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
      section.innerHTML = `<h3> ${carritoAgregado[i].nombre}</h3>
            <div>
              <img src="${carritoAgregado[i].imagen}" alt="${carritoAgregado[i].categoria}">
            </div>
            <p>$${carritoAgregado[i].precio}</p>`;

      DOMcarrito.appendChild(section);
    }
  }
  calcularTotal();
  DOMtotal.innerText = "$" + total;
}

// Calcula es precio de todos los productos del carrito

function calcularTotal() {
  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio;
  }
}

// Finaliza la compra una vez apretado el boton Finalizar Compra

function finalizarCompra() {
  DOMbotonCarrito.onclick = () => {
    function vaciarCarrito(carrito) {
      for (let i = 0; (i = carrito.length); i--) {
        carrito.pop();
      }
    }
    if (carritoAgregado) {
      vaciarCarrito(carrito);
      localStorage.clear();
      vaciarCarrito(carritoAgregado);
      total = 0;
      DOMtotal.innerText = "$" + total;
      DOMcarrito.innerHTML = "<h3>Su Compra se ha Completado Exitosamente</h3>";
    }
  };
}

// Agrega los productos a otro array para mandarlo al local storage

function agregarAlCarrito() {
  for (let i = 0; i < DOMbutton.length; i++) {
    DOMbutton[i].onclick = () => {
      carrito.push(productos[i]);
      if (carrito.length > 0) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
      DOMcarrito.textContent = " ";
      dibujarCarrito();
    };
  }
  finalizarCompra();
}

dibujarProductos(productos);
