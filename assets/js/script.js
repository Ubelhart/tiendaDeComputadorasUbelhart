class Producto {

  constructor(nombre, categoria, memoria, precio) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.memoria = memoria
    this.precio = precio;
  }

  getPrecio() {
    return this.precio;
  }
}

let productos = [];

productos[0] = new Producto('RTX 3070', 'Tarjeta Gráfica', '8GB', 312801);
productos[1] = new Producto('SPECTRIX', 'Memoria Ram', '8GB', 8124);
productos[2] = new Producto('KINGSTON', 'SSD', '240GB', 4289);

const ordenarPrecios = productos.sort(function (productoUno, productoDos) {

  if (productoUno.precio > productoDos.precio) {
    return 1;

  } else if (productoUno.precio < productoDos.precio) {
    return -1;

  }
  return 0;

});

alert('Los precios ordenados de menor a mayor son: ');

for (const producto of productos) {
  alert(producto.nombre + ': ' + producto.precio);

}

function elegir() {
  let producto = prompt('¿De cual quieres saber el precio?: RTX 3070, SPECTRIX, KINGSTON').toUpperCase();

  return producto;
}

let articulo = elegir();

function mostrar(nombre, mercancia) {
  if (articulo == nombre) {
    alert('El precio es: ' + mercancia.getPrecio());
  }
}



mostrar('RTX 3070', productos[2]);
mostrar('SPECTRIX', productos[1]);
mostrar('KINGSTON', productos[0]);

