document.addEventListener("DOMContentLoaded", () => {

    const sesion = JSON.parse(localStorage.getItem("tcg_sesion"));

    
    if (!sesion || sesion.rol !== "admin") {
        alert("Acceso denegado. Debes iniciar sesión como Administrador.");
        window.location.href = "login.html"; // Ventana de login que debe hacer angela
        return; // Detiene la ejecución del código
    }

        //instrucciones para cerrar sesión
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        
        const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
        
        if (confirmar) {
            // Elimina los datos de la sesión
            localStorage.removeItem("tcg_sesion");
            
            // Redirige al login
            window.location.href = "login.html";
        }
    });
}
    const form = document.getElementById("form-producto");

    renderizarTabla();

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            
            const productoValido = obtenerInfoProducto();

            
            if (productoValido) {
                guardarProducto(productoValido);
                form.reset();
                document.getElementById("producto-id").value = "";
                renderizarTabla();
            }
        });
    }

    
});

// Función para guardar en LocalStorage
function guardarProducto(producto) {
    let productos = JSON.parse(localStorage.getItem("tcg_productos")) || [];
    
    if (producto.id === "") {
        productos.push(producto); // Crear nuevo
    } else {
        productos[producto.id] = producto; // Editar existente
    }

    localStorage.setItem("tcg_productos", JSON.stringify(productos));
    alert("Producto guardado con éxito.");
}

function renderizarTabla() {
    const lista = document.getElementById("lista-productos");
    if (!lista) return;

    let productos = JSON.parse(localStorage.getItem("tcg_productos")) || [];
    lista.innerHTML = "";

    productos.forEach((p, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${p.imagen}" alt="${p.nombre}" width="40"></td>
            <td>${p.nombre}</td>
            <td>${p.tipo.toUpperCase()}</td>
            <td>${p.rareza.toUpperCase()}</td>
            <td>$${parseFloat(p.precio).toFixed(0)}</td>
            <td>
                <button onclick="prepararEdicion(${index})">Editar</button>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        lista.appendChild(tr);
    });
}

window.prepararEdicion = function(index) {
    let productos = JSON.parse(localStorage.getItem("tcg_productos")) || [];
    let p = productos[index];

    document.getElementById("producto-id").value = index;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("tipo").value = p.tipo;
    document.getElementById("rareza").value = p.rareza;
    document.getElementById("precio").value = p.precio;
    document.getElementById("imagen").value = p.imagen;
};

window.eliminarProducto = function(index) {
    if (confirm("¿Deseas eliminar esta carta del inventario?")) {
        let productos = JSON.parse(localStorage.getItem("tcg_productos")) || [];
        productos.splice(index, 1);
        localStorage.setItem("tcg_productos", JSON.stringify(productos));
        renderizarTabla();
    }
};

// Métodos de validación basados en las clases de tu profesor
function obtenerInfoProducto() {
    let nombre = obtenerString("nombre", "nombre de la carta", 3, 50);
    let tipo = obtenerSelect("tipo", "categoría");
    let rareza = obtenerSelect("rareza", "rareza");
    let precio = obtenerFloat("precio", "precio", 1, 1000000);
    let imagen = obtenerUrl("imagen", "URL de la imagen");

    if (!nombre || !tipo || !rareza || !precio || !imagen) {
        return null;
    }

    return {
        id: document.getElementById("producto-id") ? document.getElementById("producto-id").value : "",
        nombre: nombre.value.trim(),
        tipo: tipo.value,
        rareza: rareza.value,
        precio: parseFloat(precio.value.trim()),
        imagen: imagen.value.trim()
    };
}

function obtenerString(nombre, variable, min, max) {
    let apunta = document.getElementById(nombre);
    let valor = validarString(apunta.value, min, max);
    return apuntarInput(apunta, variable, valor);
}

function obtenerFloat(precio, variable, min, max) {
    let apunta = document.getElementById(precio);
    let valor = validarFloat(apunta.value, min, max);
    return apuntarInput(apunta, variable, valor);
}

function obtenerSelect(ids  , variable) {
    let apunta = document.getElementById(ids);
    let valor = apunta.value !== "";
    return apuntarInput(apunta, variable, valor);
}

function obtenerUrl(url, variable) {
    let apunta = document.getElementById(url);
    let valor = validarUrl(apunta.value);
    return apuntarInput(apunta, variable, valor);
}

function apuntarInput(elemento, variable, valor) {
    if (valor) {
        elemento.classList.remove("border-red");
        return elemento;
    } else {
        alert(variable + " no válido");
        elemento.classList.add("border-red");
        elemento.focus();
        return null;
    }
}

//Validaciones
function validarFloat(value, min, max) {
    let trimmedValue = value.trim();
    if (trimmedValue === "" || isNaN(trimmedValue)) return false;
    let numero = parseFloat(trimmedValue);
    if (min !== undefined && numero < min) return false;
    if (max !== undefined && numero > max) return false;
    return true;
}

function validarString(text, min, max) {
    if (typeof text !== "string") return false;
    let trimmedText = text.trim();
    return (trimmedText.length >= min && trimmedText.length <= max);
}

function validarUrl(value) {
    let trimmed = value.trim();
    return trimmed !== "" && (trimmed.startsWith("http://") || trimmed.startsWith("https://"));
}