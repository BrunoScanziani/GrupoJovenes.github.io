const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// Toma como parámetro el id del producto y lo almacena en el objeto localStorage del navegador.
// Al clickear sobre un producto, redirige a la página product-info.html
function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html"
}

// Redirige el index al login en caso de no estar logeado.
// En caso de estar logeado, agrega el usuario con un dropdown menu.
var loggedin = localStorage.getItem("email");

if (!loggedin) {
  window.location = "login.html";
} else {
  let barra = document.getElementById("barra");
  let userNavItem = document.createElement("li");

  // Agregamos la clase 'dropdown' al elemento <li>
  userNavItem.className = "nav-item dropdown";
  userNavItem.innerHTML =
    `
    <a class="nav-link dropdown-toggle text-center" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

      <!-- Imagen de perfil -->
        <img src="img/nano.jpg" class="profile-image" alt="Imagen de perfil">

          <!-- El nombre de usuario se mostrará aquí -->
            ${localStorage.getItem("email")}

    </a>

    <!-- Agregamos la clase 'dropdown-menu-end' para centrar a la derecha -->
    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown"> 

    <!-- Redirige a la página de carrito -->
    <a class="dropdown-item" href="cart.html">
      <span id="carrito-nav-item" class="badge bg-primary">0</span> <img src="img/anadir-al-carrito.png"> Mi carrito
    </a>
    
    <!-- Redirige a la página de perfil -->
    <a class="dropdown-item" href="my-profile.html">
      <img src="img/avatar-de-perfil.png"> Mi perfil
    </a>
    
    <!-- Interruptor para Modo Día / Modo Noche -->
    <div class="dropdown-divider"></div>
    
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="modeSwitch">
      <label class="form-check-label" for="modeSwitch">Modo Nocturno</label>
      </label>
    </div>
    <div class="dropdown-divider"></div>
    <!-- Agregamos un manejador de eventos al enlace de cierre de sesión -->
    <a class="dropdown-item" href="#" id="cerrarSesion">
      <img src="img/salida.png"> Cerrar sesión
    </a>
    
    </div>
`;

  // Agregamos el elemento <li> con el menú desplegable al final de la barra
  barra.innerHTML += userNavItem.outerHTML;

  // Manejador de eventos para el enlace "Cerrar sesión"
  document.getElementById("cerrarSesion").addEventListener("click", function () {
    // Elimina el usuario del Local Storage
    localStorage.removeItem("email");
    // Redirige al usuario a la página de inicio de sesión
    window.location = "login.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (!localStorage.getItem("nightmode")) {
      localStorage.setItem("nightmode", false)
    } else

      if (localStorage.getItem("nightmode") == "true") {
        document.getElementById("modeSwitch").setAttribute("checked", true)
      }

    actualTheme()
  }, 100);

})

function actualTheme() {

  //Arreglo con todos los elementos dentro del main, + el body.
  var divs = document.querySelector("main").querySelectorAll("*");
  //Div con la imagen de fondo
  var img = document.getElementById("background-img");
  //Div con la otra mitad de la pagina
  var img2 = document.getElementById("background-img2");
  //aaa
  var listas = document.querySelectorAll("list-group-item");

  var nightmode = localStorage.getItem("nightmode");

  if (nightmode == "true") {
    console.log("pongo oscuro")

    //Agrego las clases de modo oscuro a los divs
    divs.forEach(element => {
      if (element.classList.contains("bg-light")) {
        element.classList.remove("bg-light");
      }
      element.classList.add("bg-dark");
      element.style.color = "lightgray";
    })

    listas.forEach(element => {
      if (element.classList.contains("bg-light")) {
        element.classList.remove("bg-light");
      }
      element.classList.add("bg-dark");
      element.style.color = "lightgray";
    })

    document.body.classList.add("bg-dark");
    if (document.body.classList.contains("bg-light")) {
      document.body.classList.remove("bg-light");
    }

    //Cambio la imagen de fondo
    if (img != null) {
      img.classList.remove("jumbotron");
      img.classList.add("jumbotron2");
      img2.classList.remove(...img2.classList);
      img2.style.color = "black";
    }

  } else {
    console.log("despongo oscuro")

    //Agrego las clases de modo light y saco las de modo night
    divs.forEach(element => {
      if (element.classList.contains("bg-dark")) {
        element.classList.remove("bg-dark");
      }
      element.classList.add("bg-light");
      element.style.color = "black";
    })

    listas.forEach(element => {
      if (element.classList.contains("bg-dark")) {
        element.classList.remove("bg-dark");
      }
      element.classList.add("bg-light");
      element.style.color = "lightgray";
    })

    document.body.classList.add("bg-light");
    if (document.body.classList.contains("bg-dark")) {
      document.body.classList.remove("bg-dark");
    }

    //Cambio la imagen de fondo
    if (img != null) {
      img.classList.remove("jumbotron2");
      img.classList.add("jumbotron");
      img2.classList.add("album", "py-5", "bg-light");
    }
  }
}

var modeSwitch = document.getElementById("modeSwitch");

modeSwitch.addEventListener("click", () => {
  switchTheme()
  actualTheme()
})

function switchTheme() {
  var nightmode = localStorage.getItem("nightmode");

  if (nightmode == "false") {
    console.log("oscuro")
    localStorage.setItem("nightmode", "true")
  } else {
    console.log("noscuro")
    localStorage.setItem("nightmode", "false")
  }
}

// ************************
//     SOBRE EL CARRITO 
// ************************

let arrayCarrito = []

const carritoNavItem = document.getElementById("carrito-nav-item");

let menuUsuario = document.getElementById("userDropdown")

// Hace que el indicador de productos se actualice cada vez que el usuario quiera ver
menuUsuario.addEventListener("click", () => (
  actualizarCantidadEnCarrito()

))

function actualizarProdCarrito() {

  if (!localStorage.getItem("prodCarrito")) {
    arrayCarrito.push(Product.id)
    localStorage.setItem("prodCarrito", JSON.stringify(arrayCarrito));

  } else {
    arrayCarrito = JSON.parse(localStorage.getItem("prodCarrito"));

    if (!arrayCarrito.includes(Product.id)) {
      arrayCarrito.push(Product.id);
      localStorage.setItem("prodCarrito", JSON.stringify(arrayCarrito));

    }
  }

  actualizarCantidadEnCarrito()
}

function actualizarCantidadEnCarrito() {
  arrayCarrito = JSON.parse(localStorage.getItem("prodCarrito"))

  let cantidadEnCarrito = 0

  arrayCarrito.forEach(element => {
    cantidadEnCarrito++
  });
  carritoNavItem.textContent = cantidadEnCarrito;
}