let urlCart = "https://japceibal.github.io/emercado-api/user_cart/";
let arrayIds = JSON.parse(localStorage.getItem("prodCarrito"));
const id = 25801;
let container = document.getElementById("productsCarritoContainer");
let array2 = []

let data = [];

if (!localStorage.getItem("prodCarrito")){
    getJSONData(urlCart + id + `.json`).then(function(resultObj){
        if (resultObj.status === "ok"){
            array2.push({id:resultObj.data.articles[0].id.toString(),cant:1})
        }
    })
}else if( !JSON.parse( localStorage.getItem("prodCarrito").includes(50924) ) ){
    getJSONData(urlCart + id + `.json`).then(function(resultObj){
        if (resultObj.status === "ok"){
            array2.push({id:resultObj.data.articles[0].id.toString(),cant:1})
        }
    })
}

document.addEventListener("DOMContentLoaded",() => {
    setTimeout(mostrarCarrito,300)
})

function mostrarCarrito(){
    arrayCarrito = JSON.parse(localStorage.getItem("prodCarrito"));

    if (localStorage.getItem("prodCarrito")){

        const contador = [];

        arrayCarrito.forEach(elem => {
            if (contador[elem] === undefined){
                contador[elem] = 1;
            }else{
                contador[elem]++;
            }
        })
        
        for(const elem in contador){
            array2.push({id:elem,cant:contador[elem]})
        }
        
        if( JSON.parse( localStorage.getItem("prodCarrito").includes(50924) ) ){
            array2.forEach(elem => {
                if (elem.id == '50924'){
                    elem.cant++
                    }
            })
        }
        
    }

    array2.forEach(elem => {
        mostrarArt(elem)
        }
    )
}

function mostrarArt(element){
    getJSONData(PRODUCT_INFO_URL + element.id + ".json").then(function(resultCart){
        if (resultCart.status === "ok"){
            let dataCart = resultCart.data;
            container.innerHTML += `
                <div class="d-flex flex-row align-items-center">
                    <div class="col d-flex justify-content-left">
                        <div class="col-lg-2"></div>
                        <img src=${dataCart.images[0]} class="img-thumbnail col-md-6"></img>
                    </div>
                    <div class="col">
                        <p>${dataCart.name}</p>
                    </div>
                    <div class="col">
                        <p>${dataCart.currency} ${dataCart.cost}</p>
                    </div>
                    <div class="col">
                        <div class="col-md-4">
                            <input type="number" class="form-control" id="cantidad${dataCart.id}" value="${element.cant}" min="1" 
                                        onchange="modifSubtotal(${dataCart.id}, ${dataCart.cost}, '${dataCart.currency}')" 
                                        oninput="modifSubtotal(${dataCart.id}, ${dataCart.cost}, '${dataCart.currency}')">
                        </div>
                    </div>
                    <div class="col">
                        <strong id="subtotal${dataCart.id}"></strong> 
                    </div>
                    <div class="col">
                        <button class="btn btn-danger"><i class='far fa-trash-alt'></i></button>
                    </div>    
                </div>
                <hr style="border: 1px solid lightgray; margin: 12px 0px; color: black;" class="bg-light">
                `;
                
            let precio = dataCart.cost;
            let cantidadInput = document.getElementById("cantidad" + dataCart.id);
            let subtotalSpan = document.getElementById("subtotal" + dataCart.id);
            let currency = dataCart.currency;
            subtotalSpan.innerHTML = currency + " " + cantidadInput.value * precio;

            cantidadInput.addEventListener("input", () => {
                subtotalSpan.innerHTML = " ";
                subtotalSpan.innerHTML = currency + " " + cantidadInput.value * precio;
            });
        };
    })
}

function modifSubtotal(id, price, moneda) {
    let cantidadInput = document.getElementById("cantidad" + id);
    let subtotalSpan = document.getElementById("subtotal" + id);

    subtotalSpan.innerHTML = moneda + " " + cantidadInput.value * price;
}

//Accedo a los valores que necesito, la opción de envio seleccionada y los campos subtotal costo de envío y total.
var opEnv1 = document.getElementById("Envio1");
var opEnv2 = document.getElementById("Envio2");
var opEnv3 = document.getElementById("Envio3");
var subTot = document.getElementById("subTot");
var costEnvio = document.getElementById("costoenvio");
var total = document.getElementById("costototal");
var costoENVIO = 0;

const cartScript = document.getElementById("subtotal")


function modifSubtotal(id, price, moneda) {
    let cantidadInput = document.getElementById("cantidad" + id);
    let subtotalSpan = document.getElementById("subtotal" + id);

    subtotalSpan.innerHTML = moneda + " " + cantidadInput.value * price;

}

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
                        <input type="number" class="counter_cart" id="cantidad${data.articles[0].id}" value="1" min="1" 
                            onchange="modifSubtotal(${data.articles[0].id}, ${data.articles[0].unitCost}, '${data.articles[0].currency}')" 
                            oninput="modifSubtotal(${data.articles[0].id}, ${data.articles[0].unitCost}, '${data.articles[0].currency}')">
                    </div>
                    <div class="col">
                        <p id="subtotal${data.articles[0].id}"></p> 
                    </div>    
                </div>
                <hr id="line">
                `

            let precio1 = data.articles[0].unitCost;
            let cantidadInput1 = document.getElementById("cantidad" + data.articles[0].id);
            let subtotalSpan1 = document.getElementById("subtotal" + data.articles[0].id);
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
                                    <input type="number" class="counter_cart" id="cantidad${dataCart.id}" value="1" min="1" 
                                        onchange="modifSubtotal(${dataCart.id}, ${dataCart.cost}, '${dataCart.currency}')" 
                                        oninput="modifSubtotal(${dataCart.id}, ${dataCart.cost}, '${dataCart.currency}')">
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
                            subtotalSpan1.innerHTML = " ";
                            subtotalSpan1.innerHTML = currency + " " + cantidadInput.value * precio;
                        })
                    };
                });
            }
        });
    }

//Establesco el costo de envío según la opción elegida
function actualizarCosto() {
    if (opEnv1.checked) {
        costoENVIO = 0.15;
    } else if (opEnv2.checked) {
        costoENVIO = 0.07;
    } else {
        costoENVIO = 0.05;
    }
}


//Agrego un evento para cada opción de forma que al darle click se actualize el campo costos acorde a eso.
console.log(array2);
opEnv1.addEventListener("click", function () {
    actualizarCosto(); //Se establece el costo recargo por el envío
    //Tomo todos los elementos del arreglo de cosas en el carrito y multiplico por la cantidad de elementos
    var acumuladorSubtotal = 0;

    array2.forEach(elem => {
        //Para cada elemento del carrito tomo su valor del subtotal
        var elemento = document.getElementById("subtotal" + elem.id).textContent;
        var regex = /(USD|\UYU)\s(\d+)/;
        var match = elemento.match(regex);
        
        // Coincidió con la expresión regular
        var moneda = match[1];
        var valor = parseFloat(match[2]);
        
        if (moneda === "USD") {
            // El precio está en dólares, guárdalo directamente en una variable
            acumuladorSubtotal += valor;
          } else if (moneda === "UYU") {
            // El precio está en pesos, convierte a dólares (supongamos que 1 dólar equivale a 40 pesos)
            var precioEnPesos = valor;
            acumuladorSubtotal += precioEnPesos / 40; // Cambia el factor de conversión según corresponda
          }
    }) //Termina el forEach

    subTot.innerHTML = "USD " + acumuladorSubtotal.toFixed(2);
    costEnvio.innerHTML = "USD " + (acumuladorSubtotal*costoENVIO).toFixed(2);
    total.innerHTML = "USD " + (acumuladorSubtotal + acumuladorSubtotal*costoENVIO).toFixed(2);
})

opEnv2.addEventListener("click", function () {
    actualizarCosto(); //Se establece el costo recargo por el envío
    //Tomo todos los elementos del arreglo de cosas en el carrito y multiplico por la cantidad de elementos
    var acumuladorSubtotal = 0;

    array2.forEach(elem => {
        //Para cada elemento del carrito tomo su valor del subtotal
        var elemento = document.getElementById("subtotal" + elem.id).textContent;
        var regex = /(USD|\UYU)\s(\d+)/;
        var match = elemento.match(regex);
        
        // Coincidió con la expresión regular
        var moneda = match[1];
        var valor = parseFloat(match[2]);
        
        if (moneda === "USD") {
            // El precio está en dólares, guárdalo directamente en una variable
            acumuladorSubtotal += valor;
          } else if (moneda === "UYU") {
            // El precio está en pesos, convierte a dólares (supongamos que 1 dólar equivale a 40 pesos)
            var precioEnPesos = valor;
            acumuladorSubtotal += precioEnPesos / 40; // Cambia el factor de conversión según corresponda
          }
    }) //Termina el forEach

    subTot.innerHTML = "USD " + acumuladorSubtotal.toFixed(2);
    costEnvio.innerHTML = "USD " + (acumuladorSubtotal*costoENVIO).toFixed(2);
    total.innerHTML = "USD " + (acumuladorSubtotal + acumuladorSubtotal*costoENVIO).toFixed(2);
})

opEnv3.addEventListener("click", function () {
    actualizarCosto(); //Se establece el costo recargo por el envío
    //Tomo todos los elementos del arreglo de cosas en el carrito y multiplico por la cantidad de elementos
    var acumuladorSubtotal = 0;

    array2.forEach(elem => {
        //Para cada elemento del carrito tomo su valor del subtotal
        var elemento = document.getElementById("subtotal" + elem.id).textContent;
        var regex = /(usd|\UYU)\s(\d+)/i;
        var match = elemento.match(regex);
        
        // Coincidió con la expresión regular
        var moneda = match[1];
        var valor = parseFloat(match[2]);
        
        if (moneda === "USD") {
            // El precio está en dólares, guárdalo directamente en una variable
            acumuladorSubtotal += valor;
          } else if (moneda === "UYU") {
            // El precio está en pesos, convierte a dólares (supongamos que 1 dólar equivale a 40 pesos)
            var precioEnPesos = valor;
            acumuladorSubtotal += precioEnPesos / 40; // Cambia el factor de conversión según corresponda
          }
    }) //Termina el forEach


    subTot.innerHTML = "USD " + acumuladorSubtotal.toFixed(2);
    costEnvio.innerHTML = "USD " + (acumuladorSubtotal*costoENVIO).toFixed(2);
    total.innerHTML = "USD " + (acumuladorSubtotal + acumuladorSubtotal*costoENVIO).toFixed(2);
})
});

