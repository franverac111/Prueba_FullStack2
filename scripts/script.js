
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

    actualizarResumen();
}

function actualizarResumen() {
    let cantidad = 0;
    let total = 0;

    for (let producto of carrito) {
        cantidad += producto.cantidad;
        total += producto.precio * producto.cantidad;
    }

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
    } else {
        carrito = [];
    }

    if (carrito.length == 0) {
        document.getElementById("carrito").innerHTML =
            "<p>El carrito está vacío.</p>";
        return;
    }

    document.getElementById("carrito").innerHTML =
        "<div class='fila-carrito encabezado'>" +
        "<strong>Producto</strong>" +
        "<strong>Cantidad</strong>" +
        "<strong>Precio</strong>" +
        "<strong>Subtotal</strong>" +
        "<strong></strong>" +
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
        "<div class='total-carrito'>" +
        "<h2>Total: $" + totalCarrito + "</h2>" +
        "<button onclick='vaciarCarrito()'>Vaciar carrito</button>" +
        "<button>Ir a pagar</button>" +
        "</div>";
}

function eliminarProducto(indice) {
    carrito[indice].cantidad -= 1;

    if (carrito[indice].cantidad == 0) {
        carrito.splice(indice, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
    actualizarResumen();
}

function vaciarCarrito() {
    carrito = [];

    localStorage.removeItem("carrito");

    mostrarCarrito();
    actualizarResumen();
}

if (document.getElementById("carrito")) {
    mostrarCarrito();
}

// =============================
// VALIDACIÓN DEL LOGIN
// =============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const loginMessage = document.getElementById("loginMessage");

        // Limpiar mensajes anteriores
        emailError.textContent = "";
        passwordError.textContent = "";
        loginMessage.textContent = "";

        let formularioValido = true;

        // Validar correo
        if (email === "") {
            emailError.textContent = "El correo electrónico es obligatorio.";
            formularioValido = false;

        } else if (email.length > 100) {
            emailError.textContent = "El correo no puede superar los 100 caracteres.";
            formularioValido = false;

        } else if (
            !email.endsWith("@duoc.cl") &&
            !email.endsWith("@profesor.duoc.cl") &&
            !email.endsWith("@gmail.com")
        ) {
            emailError.textContent =
                "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            formularioValido = false;
        }

        // Validar contraseña
        if (password === "") {
            passwordError.textContent = "La contraseña es obligatoria.";
            formularioValido = false;

        } else if (password.length < 4 || password.length > 10) {
            passwordError.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres.";
            formularioValido = false;
        }

        // Resultado de la validación
        if (formularioValido) {
            loginMessage.textContent = "Datos válidos. Puedes continuar.";
        }

    });

}
if (document.getElementById("cantidad")) {
    actualizarResumen();
}
