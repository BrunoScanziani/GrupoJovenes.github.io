let email = document.getElementById("email");
let nombre1 = document.getElementById("nombre1");
let nombre2 = document.getElementById("nombre2");
let apellido1 = document.getElementById("apellido1");
let apellido2 = document.getElementById("apellido2");
let telefono = document.getElementById("telefono");

let profileimg = document.getElementById("img");

//Evento para cargar los datos del localStorage
document.addEventListener("DOMContentLoaded", () => {
    //Obtenemos la data de localStorage
    let data2 = JSON.parse(localStorage.getItem("data"));
    //Si existe la data, la mostramos
    if (data2){
        nombre1.value = data2.nombre1;
        nombre2.value = data2.nombre1;
        apellido1.value = data2.apellido1;
        apellido2.value = data2.apellido2;
        telefono.value = data2.telefono;
        profileimg.src = data2.imagen;
    }
    //De igual manera, el email lo mostramos, aunque no exista data en el localStorage
    email.value = localStorage.getItem(("email"));
})

let form = document.getElementById("form");
//Evento para validar el form al hacer submit
form.addEventListener("submit", (e) => {
    //Si no subimos una imagen nueva, volvemos a cargar la misma
    if (!imgData){
        imgData = profileimg.src
    }
    let data = {
        nombre1 : nombre1.value,
        nombre2 : nombre2.value,
        apellido1 : apellido1.value,
        apellido2 : apellido2.value,
        imagen : imgData,
        telefono : telefono.value,
    }
    console.log(data)

    //Accedemos al alert
    let alert = document.getElementById("alert");

    //Si los datos son válidos
    if (form.checkValidity()){
        e.preventDefault();
        //Cargamos los datos al localStorage
        localStorage.setItem("data",JSON.stringify(data));
        //Mostramos un success alert
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
        alert.textContent = "Cambios guardados exitosamente!";
        alert.classList.add("show");
        setTimeout(() => {
            //A los 3 seg, recargamos la pagina
            window.location = "my-profile.html"
          }, 3000);


    }else{
        //En caso de no ser válidos los datos
        e.stopPropagation();
        e.preventDefault();
        //Mostramos un danger alert
        alert.classList.add("alert-danger");
        alert.textContent = "Debes completar todos los campos marcados*.";
        alert.classList.add("show");
        //A los 5 seg, lo quitamos
        setTimeout(() => {
            alert.classList.remove("show");
          }, 5000)
    }
    
    //Se valida el form
    form.classList.add("was-validated")
})

let imgData = null;
//Evento al usar el input de imagen
document.getElementById("imagen").addEventListener("change",(event) => {
    //Accedemos al primer archivo dentro del input
    const file = event.target.files[0];

    //Si el archivo existe
    if (file){
        //Creamos una instancia de FileReader para leer los conenidos del archivo
        const reader = new FileReader();
        //Lee la imagen como base64
        reader.readAsDataURL(file);
        //Cuando el archivo se haya leído
        reader.onload = (e) => {
            //Obtenemos los datos de la img en formate base64 y los guardamos
            imgData = e.target.result;
        };
    }
});
