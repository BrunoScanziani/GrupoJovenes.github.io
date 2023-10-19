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