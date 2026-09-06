let cantidad = 0;
let total = 0;
let totalCarrito = 0;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function inyectarHeader(){
    const headerElem = document.getElementById("header");
    if (!headerElem) return;

    // Detecta si la página actual está dentro de la carpeta "paginas"
    
    const enPaginas = window.location.pathname.includes("/paginas/");
    
    // Define las rutas según la profundidad donde esté ubicado el usuario
    const prefix = enPaginas ? "./" : "paginas/";  //Control de Rutas Dinámicas (Lógica Preventiva):
    const homePath = enPaginas ? "../index.html" : "index.html";  //Control de Rutas Dinámicas (Lógica Preventiva):
    //Resolución Dinámica de Rutas: Garantiza la portabilidad del código para que funcione tanto en servidores locales (como Live Server) 
    // como en entornos de producción (servidores reales), sin importar la profundidad de la carpeta.
    //Palabras sencillas: Metodos para que la ruta sea encontrada si o si, sin importar en que carpeta estén. Por eso es preventivo

    headerElem.innerHTML = `
        <div class="logo">
            <img src="https://static.wikia.nocookie.net/myl-tcg/images/f/f4/Myl-logo1-sf.png/revision/latest?cb=20240717144516&path-prefix=es" alt="icono tienda">
        </div>
        <nav class="menu">
            <ul>
                <li><a href="${homePath}">Inicio</a></li>
                <li><a href="${prefix}tienda.html">Productos</a></li>
                <li><a href="${prefix}nosotros.html">Nosotros</a></li>
                <li><a href="${prefix}blogs.html">Noticias</a></li>
                <li><a href="${prefix}contacto.html">Contacto</a></li>
                <li><a href="${prefix}login.html">Iniciar Sesión</a></li>
                <li><a href="${prefix}registro.html">Registrarse</a></li>
            </ul>
        </nav>
    `;
}

function inyectarFooter() {
    const footerElem = document.getElementById("footer");
    if (!footerElem) return;

    footerElem.innerHTML = `
        <div class="footer-contenido">
            <div class="footer-seccion">
                <h3>El Caldero de la Abundancia</h3>
                <p>&copy; 2026 Todos los derechos reservados.</p>
                <p>Tu tienda de Singles número uno de Chile.</p>
            </div>
            <div class="footer-seccion">
                <h4>Prueba 1</h4>
                <p>Asignatura: Desarrollo Fullstack II (DSY1104)</p>
                <p>Diseñado por: Eduardo Barrera, Reynaldo Cabello, Ángela Robles y Francisco Vera.</p>
                <p>Duoc UC - 2026</p>
            </div>
        </div>
    `;
}

function inyectarFooter(){
    document.getElementById("footer").innerHTML = '<div class="footer-contenido"><!-- Bloque 1: Identidad y Copyright --><div class="footer-seccion"><h3>El Caldero de la Abundancia</h3><p>&copy; 2026 Todos los derechos reservados.</p><p>Tu tienda de Singles número uno de Chile.</p></div><div class="footer-seccion"><h4>Prueba 1</h4><p>Asignatura: Desarrollo Fullstack II (DSY1104)</p><p>Diseñado por: Eduardo Barrera, Reynaldo Cabello, Ángela Robles y Francisco Vera.</p><p>Duoc UC - 2026</p></div></div>';
}

inyectarHeader();
inyectarFooter();

function agregarProducto(nombre, precio) {
    let encontrado = false;

    for (let producto of carrito) {
        if (producto.nombre == nombre) {
            producto.cantidad += 1;
            encontrado = true;
        }
    }

    if (encontrado == false) {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cantidad += 1;
    total += precio;

    if (document.getElementById("cantidad")) {
        document.getElementById("cantidad").innerHTML = cantidad;
    }

    if (document.getElementById("total")) {
        document.getElementById("total").innerHTML = total;
    }
}

function mostrarCarrito() {
    let carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);

        document.getElementById("carrito").innerHTML =
            "<div class='fila-carrito'>" +
            "<strong>Producto</strong>" +
            "<strong>Cantidad</strong>" +
            "<strong>Precio</strong>" +
            "<strong>Subtotal</strong>" +
            "</div>";

        let totalCarrito = 0;

        for (let producto of carrito) {
            let subtotal = producto.precio * producto.cantidad;

            totalCarrito += subtotal;

            document.getElementById("carrito").innerHTML +=
                "<div class='fila-carrito'>" +
                "<span>" + producto.nombre + "</span>" +
                "<span>" + producto.cantidad + "</span>" +
                "<span>$" + producto.precio + "</span>" +
                "<span>$" + subtotal + "</span>" +
                "<button onclick='eliminarProducto(" + carrito.indexOf(producto) + ")'>Eliminar</button>" +
                "</div>";
        }

        document.getElementById("carrito").innerHTML +=
            "<h2>Total: $" + totalCarrito + "</h2>";
    }
}

if (document.getElementById("carrito")) {
    mostrarCarrito();
}
