const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


// Redirige el index al login en caso de no estar logeado
var loggedin = localStorage.getItem("email");

if (!loggedin) {
    window.location = "login.html";
} else {
    let barra = document.getElementById("barra");
    let userNavItem = document.createElement("li");
    userNavItem.className = "nav-item dropdown"; // Agregamos la clase 'dropdown' al elemento <li>
    userNavItem.innerHTML = `
        <a class="nav-link dropdown-toggle text-center" id="userDropdown" role="button" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <img src="img/nano.jpg" class="profile-image" alt="Imagen de perfil"> <!-- Imagen de perfil -->
            ${localStorage.getItem("email")} <!-- El nombre de usuario se mostrará aquí -->
        </a>
        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown"> <!-- Agregamos la clase 'dropdown-menu-end' para centrar a la derecha -->
            <a class="dropdown-item" href="micarrito.html">Mi carrito</a> <!-- Redirige a la página de carrito -->
            <a class="dropdown-item" href="miperfil.html">Mi perfil</a> <!-- Redirige a la página de perfil -->
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" id="cerrarSesion">Cerrar sesión</a> <!-- Agregamos un manejador de eventos al enlace de cierre de sesión -->
        </div>
    `;

    barra.innerHTML += userNavItem.outerHTML; // Agregamos el elemento <li> con el menú desplegable al final de la barra

    // Manejador de eventos para el enlace "Cerrar sesión"
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        // Elimina el usuario del Local Storage
        localStorage.removeItem("email");
        // Redirige al usuario a la página de inicio de sesión
        window.location = "login.html";
    });
}

// Toma como parámetro el id del producto y lo almacena en el objeto localStorage del navegador.
// Al clickear sobre un producto, redirige a la página product-info.html
function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html"
}


