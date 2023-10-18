//PESTAÑAS SERVICIOS

let btnServicios = document.querySelectorAll(".boton-pestanas");
let contenidosPestana = document.querySelectorAll(".contenido-pestana");

btnServicios.forEach((boton, i) => {
  boton.addEventListener("click", () => {
    contenidosPestana.forEach((contenido) => {
      contenido.classList.remove("contenido-pestana-activa");
    });
    btnServicios.forEach((boton) => {
      boton.classList.remove("boton-pestanas-activo");
    });
    contenidosPestana[i].classList.add("contenido-pestana-activa");
    btnServicios[i].classList.add("boton-pestanas-activo");
  });
});

//CALCULADORA

const correccionOrtotipo = document.getElementById("ortotipo");
const correccionEstilo = document.getElementById("estilo");
const editing = document.getElementById("editing");
const briefing = document.getElementById("briefing");
const informes = document.getElementById("informe");
const numPaginas = document.getElementById("num-pag");
const precioTotalElemento = document.getElementById("precio-total");
const precioTotalConIvaElemento = document.getElementById(
  "precio-total-con-iva"
);

// Precios por cada mil caracteres con espacios
const precios = {
  "correccion-ortotipo": 0.75,
  "correccion-estilo": 1.1,
  editing: 1.8,
  briefing: 150,
  informes: 180,
};

// Función para calcular el precio total
function actualizarPrecioTotal() {
  let precioTotal = 0;
  let servicios = "";

  if (correccionOrtotipo.checked && numPaginas.value) {
    let precioOrtotipo =
      precios["correccion-ortotipo"] * 2.1 * numPaginas.value;
    precioTotal += precioOrtotipo;
    servicios += `<strong>Corrección ortotipográfica:</strong> ${precioOrtotipo.toFixed(
      2
    )} euros. <br>`;
  }

  if (correccionEstilo.checked && numPaginas.value) {
    let precioEstilo = precios["correccion-estilo"] * numPaginas.value;
    precioTotal += precioEstilo;
    servicios += `<strong>Corrección de estilo:</strong> ${precioEstilo.toFixed(
      2
    )} euros. <br>`;
  }

  if (editing.checked && numPaginas.value) {
    let precioEditing = precios["editing"] * numPaginas.value;
    precioTotal += precioEditing;
    servicios += `<strong>Edición:</strong> ${precioEditing.toFixed(
      2
    )} euros. <br>`;
  }

  if (briefing.checked) {
    precioTotal += precios["briefing"];
    servicios += `<strong>Briefing:</strong> ${precios["briefing"].toFixed(
      2
    )} euros. <br>`;
  }

  if (informes.checked) {
    precioTotal += precios["informes"];
    servicios += `<strong>Informes:</strong> ${precios["informes"].toFixed(
      2
    )} euros. <br>`;
  }

  // Actualizar precio total

  precioTotalElemento.innerHTML =
    servicios +
    `<div class="separador"></div>` +
    `<strong>Precio Total: ${precioTotal.toFixed(2)} euros.</strong><br>`;

  // Actualizar precio total con IVA
  const precioTotalConIva = precioTotal * 1.21;
  precioTotalConIvaElemento.innerHTML = `<strong>Precio Total con IVA: ${precioTotalConIva.toFixed(
    2
  )} euros.</strong>`;
}

// Event listeners para numPaginas
numPaginas.addEventListener("input", actualizarPrecioTotal);

// Event listeners para los cambios
correccionOrtotipo.addEventListener("change", actualizarPrecioTotal);
correccionEstilo.addEventListener("change", actualizarPrecioTotal);
editing.addEventListener("change", actualizarPrecioTotal);
briefing.addEventListener("change", actualizarPrecioTotal);
informes.addEventListener("change", actualizarPrecioTotal);

// Calcular el precio total
actualizarPrecioTotal();
