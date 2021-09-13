class Producto {
  constructor(nombre, imagen, categoria, memoria, precio) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.categoria = categoria;
    this.memoria = memoria;
    this.precio = precio;
  }

  getPrecio() {
    return this.precio;
  }
}

let productos = [];

productos.push(
  new Producto(
    "RTX 3070",
    "./media/img/productoUno.webp",
    "Tarjeta Gráfica",
    "8GB",
    312801
  )
);
productos.push(
  new Producto(
    "SPECTRIX",
    "./media/img/productoDos.webp",
    "Memoria Ram",
    "8GB",
    8124
  )
);
productos.push(
  new Producto(
    "KINGSTON",
    "./media/img/productoTres.webp",
    "SSD",
    "240GB",
    4289
  )
);

let main = document.getElementById("main");

for (const producto of productos) {
  let section = document.createElement("section");
  section.innerHTML = `<h2> ${producto.nombre}</h2>
  <div class="img-container">
    <img src="${producto.imagen}" alt="${producto.categoria}">
  </div>
  <div class="price">
    <input type="button" value="Agregar">
    <p>$${producto.precio}</p>
  </div>`;
  main.appendChild(section);
}
