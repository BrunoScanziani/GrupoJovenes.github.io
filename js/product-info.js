//Constante con la id del producto.
const id = localStorage.ProdID;
//Constante con la info del producto a partir de la id.
const Prod_URL = PRODUCT_INFO_URL + id + EXT_TYPE;
//Constante con la info de los comentarios.
const COMMENTS = PRODUCT_INFO_COMMENTS_URL + id + EXT_TYPE;
//Variable para guardar la info del producto.
let Product = null;
//Variable para guardar los comentarios.
let Comments = null;

//Muestra la info del producto al cargar la pagina
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(Prod_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {
            Product = resultObj.data;
            ShowProductInfo()
        }
    })

    getJSONData(COMMENTS).then(function (resultObj) {
        if (resultObj.status == "ok") {
            Comments = resultObj.data;
            ShowComments()
        }
    })
})

//Variable asociada al div del producto.
let container = document.getElementById("prod-container");

//Función encargada de mostrar la información del producto.
function ShowProductInfo() {
    container.innerHTML = `
            <br> 
            <br> 
            <div class="row">
            <div class="col-md-6">
                <h2>${Product.name}</h2>
            </div>
            <div class="col-md-6 text-md-end">
                <!-- Agrega el botón de Comprar con el atributo href -->
                <button class="btn btn-primary btn-comprar" onclick="agregarAlCarrito()">Comprar</button>
            </div>
            <hr style="border: 1px solid #000; margin: 20px 0;">
            <h5>Precio</h5>
            <p>${Product.currency} ${Product.cost}</p>
            <h5>Descripción</h5>
            <p>${Product.description}</p>
            <h5>Categoría</h5>
            <p>${Product.category}</p>
            <h5>Cantidad de vendidos</h5>
            <p>${Product.soldCount}</p>
            <h5>Imágenes ilustrativas</h5>
            
            <br>
            <div id="carouselImg" class="carousel slide" data-bs-ride="carousel" style="width:50%">
                 
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${Product.images[0]}" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="${Product.images[1]}" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="${Product.images[2]}" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="${Product.images[3]}" class="d-block w-100">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselImg" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselImg" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
    
            <br> <br> <br> <br>
            <h4>Comentarios</h4>
        `
    ShowRelated();
}

//Variable asociada al div de los comentarios.
let comentarios = document.getElementById("comments");

//Funcion encargada de mostrar y actualizar la lista de comentarios.
function ShowComments() {
    comentarios.innerHTML = ``;
    Comments.forEach(element => {
        comentarios.innerHTML += `
            <div class"list-group">
                <div class="list-group-item">
                    <div class="d-flex">
                        <p><strong>${element.user}</strong>${" - " + element.dateTime + " - "}</p>
                        <div class="ratings" id="${element.dateTime}">
                        </div>
                    </div>
                    <div>
                        <p>${element.description}</p>
                    </div>
                </div>
            </div>
        `
        let rating = document.getElementById(element.dateTime);
        for (let i = 1; i <= 5; i++) {
            rating.innerHTML += i <= element.score ?
                `<i class="fa fa-star rating-color"></i>` : `<i class="fa fa-star ratings-i"></i>`
        }
    });
    actualTheme()
}

//Función encargada de agregar comentarios al array.
function AddComment(e) {
    e.preventDefault();
    if (document.getElementById("text-comment").value && (document.getElementById("comment-rate").value) !== "elige") {
        let Comentario = {
            product: Product.id,
            score: Number(document.getElementById("comment-rate").value),
            description: document.getElementById("text-comment").value,
            user: localStorage.getItem("email"),
            dateTime: dateConvert(new Date)
        }
        Comments.push(Comentario);
        ShowComments();
    }
}

//Evento para agregar comentarios al clickear el botón.
let submit = document.getElementById("btn");
submit.addEventListener("click", AddComment)

//Función para convertir la fecha de ISOString al formato utilizado en el array.
function dateConvert(dateString) {
    var isoDate = new Date(dateString);
    var year = isoDate.getUTCFullYear();
    var month = String(isoDate.getUTCMonth() + 1).padStart(2, "0"); // Sumar 1 al mes ya que los meses en JavaScript se indexan desde 0
    var day = String(isoDate.getUTCDate()).padStart(2, "0");
    var hour = String(isoDate.getUTCHours()).padStart(2, "0");
    var minutes = String(isoDate.getUTCMinutes()).padStart(2, "0");
    var seconds = String(isoDate.getUTCSeconds()).padStart(2, "0");
    var formattedDateStr = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    return formattedDateStr;
}

//Función para mostrar los productos relacionados.
var related = document.getElementById("related");
function ShowRelated() {
    related.innerHTML =
        `
                            <br> <hr> <br>
                                <h4>Productos relacionados</h4>
                                <br>
                                <div id="carouselRelated" class="carousel slide" data-bs-ride="carousel" style="width:50%">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="${Product.relatedProducts[0].image}" class="d-block w-100" onclick="setProdID(${Product.relatedProducts[0].id})">
                                            
                                        </div>
                                        <div class="carousel-item">
                                            <img src="${Product.relatedProducts[1].image}" class="d-block w-100" onclick="setProdID(${Product.relatedProducts[1].id})">
                                            
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" data-bs-target="#carouselRelated" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    </button>
                                    <button class="carousel-control-next" data-bs-target="#carouselRelated" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    </button>
                                </div>
                            `
}

function agregarAlCarrito() {

    // Actualiza el texto en el desplegable del carrito
    actualizarProdCarrito();

    alert('Producto agregado al carrito');
}

