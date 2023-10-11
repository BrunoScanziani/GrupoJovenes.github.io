let urlCart = "https://japceibal.github.io/emercado-api/user_cart/";
let arrayIds = JSON.parse(localStorage.getItem("prodCarrito"));
const id = 25801;
let container = document.getElementById("productsCarritoContainer");

document.addEventListener("DOMContentLoaded",() => {

    getJSONData(urlCart + id + `.json`).then(function(resultObj){
        //Agrego el producto al carrito//
        if (resultObj.status === "ok"){
            let data = resultObj.data;
            container.innerHTML += `
            <div class="d-flex flex-row align-items-center">
                <div class="col d-flex justify-content-left">
                    <div class="col-lg-2"></div>
                    <img src=${data.articles[0].image} class="img-thumbnail col-md-6"></img>
                </div>
                <div class="col">
                    <p>${data.articles[0].name}</p>
                </div>
                <div class="col">
                    <p>${data.articles[0].currency} ${data.articles[0].unitCost}</p>
                </div>
                <div class="col">
                    <div class="col-md-4">
                        <input type="number" class="form-control" id="cantidad" value="1" min="1">
                    </div>
                </div>
                <div class="col">
                    <strong id="subtotal"></strong> 
                </div>    
            </div>
            <hr style="border: 1px solid lightgray; margin: 12px 0px; color: black;" class="bg-light">
            `
            
            
            const precio = data.articles[0].unitCost;
            const cantidadInput = document.getElementById("cantidad");
            const subtotalSpan = document.getElementById("subtotal");
            subtotalSpan.innerHTML = "USD " + cantidadInput.value * precio;

            cantidadInput.addEventListener("input", () => {
                subtotalSpan.innerHTML = " ";
                subtotalSpan.innerHTML = "USD " + cantidadInput.value * precio;
            });


        }
    })





})
