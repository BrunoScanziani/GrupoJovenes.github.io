let url = "https://japceibal.github.io/emercado-api/user_cart/";
let a = [];
let id = "25801";

document.addEventListener("DOMContentLoaded",() => {
    getJSONData(url+id+`.json`).then(function(resultObj){
        if (resultObj.status === "ok"){
           a = resultObj.data;
           console.log(a)
        }
    })
})
