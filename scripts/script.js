
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function obtenerPrefijo() {
    return window.location.pathname.includes('/paginas/') ? '../' : '';
}
function inyectarHeader() {
    const headerElement = document.getElementById("header");
    if (!headerElement) return;

    const prefijo = obtenerPrefijo();

    headerElement.innerHTML = `
        <div class="logo">
            <img src="https://static.wikia.nocookie.net/myl-tcg/images/f/f4/Myl-logo1-sf.png/revision/latest?cb=20240717144516&path-prefix=es" alt="icono tienda">
        </div>
        
        <h1>El Caldero de la Abundancia</h1>
        
        <nav class="menu-navegacion">
            <ul>
                <li><a href="${prefijo}index.html">Inicio</a></li>
                <li><a href="${prefijo}paginas/tienda.html">Productos</a></li>
                <li><a href="${prefijo}paginas/nosotros.html">Nosotros</a></li>
                <li><a href="${prefijo}paginas/blogs.html">Noticias</a></li>
                <li><a href="${prefijo}paginas/contacto.html">Contacto</a></li>
                <li><a href="${prefijo}paginas/login.html">Iniciar Sesión</a></li>
                <li><a href="${prefijo}paginas/carrito.html"></a></li>
            </ul>
        </nav>


        <div class="carrito-header">
            <a href="${prefijo}paginas/carrito.html">
                <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Carrito de compras" class="icono-carrito">
            </a>
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

// 1. Iniciar usuario Admin para poder agrefgar cartas al inventario
(function inicializarAdmin() {
    const usuarios = JSON.parse(localStorage.getItem("tcg_usuarios")) || [];
    const existeAdmin = usuarios.some(u => u.correo === "admin@duoc.cl");

    if (!existeAdmin) {
        usuarios.push({
            correo: "admin@duoc.cl",
            password: "admin",
            rol: "admin",
            nombre: "Administrador Duoc"
        });
        localStorage.setItem("tcg_usuarios", JSON.stringify(usuarios));
    }
})();

// 2. Control de Inicio de Sesión
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const correo = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            const usuarios = JSON.parse(localStorage.getItem("tcg_usuarios")) || [];
            const usuarioValido = usuarios.find(u => u.correo === correo && u.password === password);

            if (usuarioValido) {
                // Guarda la sesión con la clave exactas que lee scriptAgregar.js
                const sesion = {
                    correo: usuarioValido.correo,
                    rol: usuarioValido.rol,
                    nombre: usuarioValido.nombre
                };

                localStorage.setItem("tcg_sesion", JSON.stringify(sesion));

                if (sesion.rol === "admin") {
                    // Redirección entre archivos de la misma carpeta /paginas/
                    window.location.href = "agregar.html"; 
                } else {
                    window.location.href = "../index.html";
                }
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }
});
