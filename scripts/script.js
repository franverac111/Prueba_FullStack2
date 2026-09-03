function inyectarHeader(){
    document.getElementById("header").innerHTML = '<div class="logo"><img src="https://static.wikia.nocookie.net/myl-tcg/images/f/f4/Myl-logo1-sf.png/revision/latest?cb=20240717144516&path-prefix=es" alt="icono tienda"></div><nav class="menu"><ul><li><a href="/index.html">Inicio</a></li><li><a href="/paginas/tienda.html">Productos</a></li><li><a href="/paginas/nosotros.html">Nosotros</a></li><li><a href="/paginas/blogs.html">Noticias</a></li><li><a href="/paginas/contacto.html">Contacto</a></li><li><a href="/paginas/login.html">Iniciar Sesión</a></li><li><a href="/paginas/registro.html">Registrarse</a></li></ul></nav>';
}

function inyectarFooter(){
    document.getElementById("footer").innerHTML = '<div class="footer-contenido"><!-- Bloque 1: Identidad y Copyright --><div class="footer-seccion"><h3>El Caldero de la Abundancia</h3><p>&copy; 2026 Todos los derechos reservados.</p><p>Tu tienda de Singles número uno de Chile.</p></div><div class="footer-seccion"><h4>Prueba 1</h4><p>Asignatura: Desarrollo Fullstack II (DSY1104)</p><p>Diseñado por: Eduardo Barrera, Reynaldo Cabello, Ángela Robles y Francisco Vera.</p><p>Duoc UC - 2026</p></div></div>';
}

inyectarHeader();
inyectarFooter();