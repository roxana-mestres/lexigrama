//MENÚ NAV
/*Seleccionar elementos necesarios*/
const botonToggle = document.querySelector(".boton-toggle");
const botonToggleIcono = document.querySelector(".boton-toggle i");
const menuDesplegable = document.querySelector(".menu-desplegable");

botonToggle.addEventListener("click", function () {
  menuDesplegable.classList.toggle("abierto");
});

// Expresión regular para validar el formato del correo
const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

const formularioContacto = document.getElementById("formularioContacto");

formularioContacto.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;

  if (!emailRegex.test(correo)) {
    alert("El formato del correo electrónico no es válido");
    return;
  }

  const data = {
    nombre: nombre,
    correo: correo,
    mensaje: mensaje,
  };

  fetch("https://roxana-mestres.com/lexigrama/contacto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      if (data.message) {
        alert("Mensaje enviado exitosamente");
      } else {
        alert("Hubo un error al enviar el mensaje");
      }
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el mensaje");
    });
});

/*SUSCRIPCIÓN*/
document.addEventListener("DOMContentLoaded", function () {
  const formularioSuscripcion = document.getElementById(
    "formularioSuscripcion"
  );
  console.log("Adjuntando evento submit al formulario");
  formularioSuscripcion.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correoContacto").value;

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(correo)) {
      alert("El formato del correo electrónico es incorrecto.");
      return;
    }

    const data = {
      correo: correo,
    };

    console.log("Datos a enviar:", data);

    fetch("https://roxana-mestres.com/lexigrama/suscribir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (data.message) {
          alert("Suscripción exitosa. ¡Gracias por suscribirte!");
          formularioSuscripcion.reset();
        } else {
          alert("Hubo un error al suscribirse. Por favor, inténtalo de nuevo.");
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario de suscripción:", error);
        alert("Hubo un error al suscribirse. Por favor, inténtalo de nuevo.");
      });
  });
});
