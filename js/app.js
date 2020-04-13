const api = new API();
const ui = new Interfaz();

// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
  $('#pais').select2();
});

// Leer el formulario
const formulario = document.querySelector('#formulario');

// EventListener
formulario.addEventListener('submit', (e) => {

  e.preventDefault();

  // Leer el pais seleccionado
  const paisSelect = document.querySelector('#pais');
  const paisSeleccionado = paisSelect.options[paisSelect.selectedIndex].value;

  
  // Comprobar que el campo tenga algo seleccionado
  if(paisSeleccionado === '') {
    
    // Mostrar mensaje de error
    ui.mostrarMensaje('Debe seleccionar un País', 'mensaje-error alert alert-info');

  } else {

    //Consultar la api
    api.obtenerResultado(paisSeleccionado)
      .then(data => {
        ui.mostrarResultado(data.resultado);
      })
  }
})