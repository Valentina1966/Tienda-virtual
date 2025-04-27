//Definir productos
const productos = [
    {
        id: 1,
        nombre: "Producto 1",
        descripcion: "Descripción del producto 1",
        precio: 80.00,
        imagen: "media/tienda1.jpeg"
    },
    {
        id: 2,
        nombre: "Producto 2",
        descripcion: "Descripción del producto 2",
        precio: 80.000,
        imagen: "media/tienda2.jpeg"
    },
    {
        id: 3,
        nombre: "Producto 3",
        descripcion: "Descripción del producto 3",
        precio: 100.000,
        imagen: "media/tienda3.jpeg"
    },
    {
        id: 4,
        nombre: "Producto 4",
        descripcion: "Descripción del producto 4",
        precio: 60.000,
        imagen: "media/tienda3.jpeg"
    }
];

// Definir carrito
const carrito = [];


// Función para agregar producto al carrito
function agregarProducto(id) {
    const producto = productos.find((p) => p.id === id);
    if (producto) {
        const existeEnCarrito = carrito.find((p) => p.id === id);
        if (existeEnCarrito) {
            existeEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();
    }
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toFixed(2)}
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            <input type="number" value="${producto.cantidad}" onchange="editarCantidad(${producto.id}, this.value)">
        `;
        listaCarrito.appendChild(li);
        total += producto.precio * producto.cantidad;
    });
    document.getElementById("total-carrito").innerText = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar producto del carrito
function eliminarProducto(id) {
    const indice = carrito.findIndex((p) => p.id === id);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        actualizarCarrito();
    }
}

// Función para editar cantidad de producto en el carrito
function editarCantidad(id, cantidad) {
    const producto = carrito.find((p) => p.id === id);
    if (producto) {
        producto.cantidad = parseInt(cantidad);
        actualizarCarrito();
    }
}

// Cargar productos al inicio
cargarProductos();