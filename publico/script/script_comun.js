//MENÚ NAV
const botonToggle = document.querySelector(".boton-toggle");
const botonToggleIcono = document.querySelector(".boton-toggle i");
const menuDesplegable = document.querySelector(".menu-desplegable");

botonToggle.addEventListener("click", function () {
  menuDesplegable.classList.toggle("abierto");
});

//BOTÓN SUBIR

const botonSubir = document.querySelector(".boton-subir");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    botonSubir.classList.add("enlace_activo");
  } else {
    botonSubir.classList.remove("enlace_activo");
  }
});

/*SUSCRIPCIÓN*/
document.addEventListener("DOMContentLoaded", function () {
  const formularioSuscripcion = document.getElementById(
    "formularioSuscripcion"
  );
  formularioSuscripcion.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value;

    // Validar el formato del correo utilizando una expresión regular
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(correo)) {
      alert("El formato del correo electrónico es incorrecto.");
      return;
    }

    const data = {
      correo: correo,
    };

    console.log("Datos a enviar:", data);

    fetch("https://proyectos-roxana-mestres.xyz/lexigrama/suscribir", {
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
