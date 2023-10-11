let urlCart = "https://japceibal.github.io/emercado-api/user_cart/";
let arrayIds = JSON.parse(localStorage.getItem("prodCarrito"));
const id = 25801;
let container = document.getElementById("productsCarritoContainer");

document.addEventListener("DOMContentLoaded",() => {

    getJSONData(urlCart + id + `.json`).then(function(resultObj){
        //Creo la cabecera de la lista de productos en el carrito//
        container.innerHTML += `
            <div class="row">
                <div class="col">
                
                </div>
                <div class="col font-weight-bold">
                Nombre
                </div>
                <div class="col font-weight-bold">
                Costo
                </div>
                <div class="col font-weight-bold">
                Cantidad
                </div>
                <div class="col font-weight-bold">
                Subtotal
                </div>    
        </div>
        <hr id="line">
        `
        //Agrego el producto al carrito//
        if (resultObj.status === "ok"){
            let data = resultObj.data;
            container.innerHTML += `
            <div class="row">
                <div class="col">
                <img src=${data.articles[0].image} class="img_cart"></img>
                </div>
                <div class="col">
                <p>${data.articles[0].name}</p>
                </div>
                <div class="col">
                <p>${data.articles[0].currency} ${data.articles[0].unitCost}</p>
                </div>
                <div class="col">
                <input type="number" class="counter_cart" id="cantidad" value="1" min="1">
                </div>
                <div class="col">
                <p id="subtotal"></p> 
                </div>    
        </div>
        <hr id="line">
            `
            
            const precio = data.articles[0].unitCost;
            const cantidadInput = document.getElementById("cantidad");
            const subtotalSpan = document.getElementById("subtotal");
            subtotalSpan.innerHTML = "USD" + cantidadInput.value * precio;

            cantidadInput.addEventListener("input", () => {
                subtotalSpan.innerHTML = " ";
                subtotalSpan.innerHTML = "USD" + cantidadInput.value * precio;
            });


        }
    })





})
