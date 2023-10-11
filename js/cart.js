let urlCart = "https://japceibal.github.io/emercado-api/user_cart/";
let arrayIds = JSON.parse(localStorage.getItem("prodCarrito"));
const id = 25801;
let container = document.getElementById("productsCarritoContainer");
const cartScript = document.getElementById("subtotal")

document.addEventListener("DOMContentLoaded", () => {



    getJSONData(urlCart + id + `.json`).then(function (resultObj) {
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
        if (resultObj.status === "ok") {
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
            
            let precio1 = data.articles[0].unitCost;
            let cantidadInput1 = document.getElementById("cantidad");
            let subtotalSpan1 = document.getElementById("subtotal");
            let currency1 = data.articles[0].currency

            subtotalSpan1.innerHTML = currency1 + " " + cantidadInput1.value * precio1;

            cantidadInput1.addEventListener("input", () => {
                subtotalSpan1.innerHTML = " ";
                subtotalSpan1.innerHTML = currency1 + " " + cantidadInput1.value * precio1;
            });
        }
    })

    actualizarCantidadEnCarrito()

    if (arrayCarrito.length > 0) {
        arrayCarrito.forEach(element => {
            if (element !== 50924) {
                getJSONData(PRODUCT_INFO_URL + element + ".json").then(function (resultCart) {
                    if (resultCart.status === "ok") {
                        let dataCart = resultCart.data;
                        container.innerHTML += `
                            <div class="row">
                                <div class="col">
                                    <img src=${dataCart.images[0]} class="img_cart"></img>
                                </div>
                                <div class="col">
                                    <p>${dataCart.name}</p>
                                </div>
                                <div class="col">
                                    <p>${dataCart.currency} ${dataCart.cost}</p>
                                </div>
                                <div class="col">
                                    <input type="number" class="counter_cart" id="cantidad${dataCart.id}" value="1" min="1">
                                </div>
                                <div class="col">
                                    <p id="subtotal${dataCart.id}"></p> 
                                </div>    
                            </div>
                            <hr>
                            `;
                        let precio = dataCart.cost;
                        let cantidadInput = document.getElementById("cantidad" + dataCart.id);
                        let subtotalSpan = document.getElementById("subtotal" + dataCart.id);
                        let currency = dataCart.currency
                        subtotalSpan.innerHTML = currency + " " + cantidadInput.value * precio;

                        cantidadInput.addEventListener("input", () => {
                            subtotalSpan.innerHTML = " ";
                            subtotalSpan.innerHTML = currency + " " + cantidadInput.value * precio;
                        });
                    };
                });
            }
        });
    }



});