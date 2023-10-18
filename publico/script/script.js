//TEXTO DINÁMICO HERO
const spanTextoEscrito = document.querySelector(".texto_escrito");
const arrayTexto = [
  "Corrección de textos",
  "Editing",
  "Briefing editorial",
  "Informes de lectura",
];
const tardanzaTexto = 200;
const tiempoBorrar = 100;
const nuevoTiempoBorrar = 2000;
let arrayTextoIndice = 0;
let caracteresIndice = 0;

function escribir() {
  if (caracteresIndice < arrayTexto[arrayTextoIndice].length) {
    spanTextoEscrito.textContent +=
      arrayTexto[arrayTextoIndice].charAt(caracteresIndice);
    caracteresIndice++;
    setTimeout(escribir, tiempoBorrar);
  } else {
    setTimeout(borrar, nuevoTiempoBorrar);
  }
}

function borrar() {
  if (caracteresIndice > 0) {
    spanTextoEscrito.textContent = arrayTexto[arrayTextoIndice].substring(
      0,
      caracteresIndice - 1
    );
    caracteresIndice--;
    setTimeout(borrar, tiempoBorrar);
  } else {
    arrayTextoIndice++;
    if (arrayTextoIndice >= arrayTexto.length) arrayTextoIndice = 0;
    setTimeout(escribir, tardanzaTexto + 200);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(escribir, nuevoTiempoBorrar + 100);
});

// RESEÑAS

let textosUsuario = document.querySelectorAll(".texto_usuario");
let iconosTestimonio = document.querySelectorAll(".icono_testimonio");

for (let i = 0; i < iconosTestimonio.length; i++) {
  iconosTestimonio[i].addEventListener("click", function mostrarResena() {
    for (let i = 0; i < iconosTestimonio.length; i++) {
      iconosTestimonio[i].classList.remove("imagen_resena_activa");
    }
    for (let i = 0; i < textosUsuario.length; i++) {
      textosUsuario[i].classList.remove("resena_activa");
    }
    iconosTestimonio[i].classList.add("imagen_resena_activa");
    textosUsuario[i].classList.add("resena_activa");
  });
}
