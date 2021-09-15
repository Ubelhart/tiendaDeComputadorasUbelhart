class Producto {
  constructor(nombre, imagen, categoria, memoria, precio, stock) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.categoria = categoria;
    this.memoria = memoria;
    this.precio = precio;
    this.stock = stock;
  }

  getPrecio() {
    return this.precio;
  }
}

let productos = [];
let productosCarrito;

productos.push(
  new Producto(
    "RTX 3070",
    "./media/img/productoUno.webp",
    "Tarjeta Gráfica",
    "8GB",
    312801,
    1
  )
);
productos.push(
  new Producto(
    "SPECTRIX",
    "./media/img/productoDos.webp",
    "Memoria Ram",
    "8GB",
    8124,
    1
  )
);
productos.push(
  new Producto(
    "KINGSTON",
    "./media/img/productoTres.webp",
    "SSD",
    "240GB",
    4289,
    1
  )
);
productos.push(
  new Producto(
    "XIGMATEK",
    "./media/img/productoCuatro.webp",
    "Gabinete",
    "Ninguna",
    15256,
    1
  )
);
productos.push(
  new Producto(
    "i9-10850K",
    "./media/img/productoCinco.webp",
    "Procesador",
    "Ninguna",
    59999,
    1
  )
);
productos.push(
  new Producto(
    "ASUS ROG STRIX B550-F",
    "./media/img/productoSeis.webp",
    "Gabinete",
    "Ninguna",
    28399,
    1
  )
);

let main = document.getElementById("main");

function agregarProductos() {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].stock > 0) {
      let section = document.createElement("section");
      section.innerHTML = `<h2> ${productos[i].nombre}</h2>
        <div class="img-container">
          <img src="${productos[i].imagen}" alt="${productos[i].categoria}">
        </div>
        <div class="price">
          <input type="button" value="Agregar">
          <p>$${productos[i].precio}</p>
        </div>`;

      main.appendChild(section);
    }
  }
}

agregarProductos();

function recargarProductos() {
  main.textContent = " ";
  agregarProductos();
  productosCarrito = productos.filter((s) => s.stock < 1);
}

let button = document.getElementsByTagName("input");

for (let i = 0; i < productos.length; i++) {
  button[i].onclick = () => {
    productos[i].stock--;
    if (productos[i].stock < 0) {
      recargarProductos();
    }
  };
}
