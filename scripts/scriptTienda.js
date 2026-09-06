document.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogo();
});

//Esta función renderiza la sección "productos" definida en "tienda.html", asi actualizamos la vista del catalogo
function renderizarCatalogo() {
    const contenedor = document.getElementById("productos");
    if (!contenedor) return;

    // Lee los productos creados en "agregar.html" como admin.
    let productosAdmin = JSON.parse(localStorage.getItem("tcg_productos")) || [];
    
    // Si hay productos guardados en el CRUD, los agregamos dinámicamente
    productosAdmin.forEach((p) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");

        divProducto.innerHTML = `
            <img src="${p.imagen}" alt="carta ${p.nombre}">
            <h2>${p.nombre}</h2>
            <p>$${parseFloat(p.precio)}</p>
            <button onclick="agregarProducto('${p.nombre}', ${p.precio})">agregar</button>
        `;

        contenedor.appendChild(divProducto);
    });


}