class Interfaz {

  constructor() {
    this.init();
  }

  init() {
    this.construirSelect();
  }

  construirSelect() {
    // Obtiene los paises de la API
    api.obtenerPaises()
      .then(paises => {

        const array = paises.paises;

        // Ordena el arreglo de objetos por Country
        array.sort(function(a, b) {
          if (a.Country > b.Country) {
            return 1;
          }
          if(a.Country < b.Country){
            return -1;
          }
          return 0
        });

        // Seleccionamos el select
        const select = document.querySelector('#pais');

        // Iteramos los datos y llenamos el select
        for(const [key, value] of Object.entries(array)) {
          
          // Creamos el option
          const option = document.createElement('option');
          option.value = value.Slug;
          option.appendChild(document.createTextNode(value.Country));
          select.appendChild(option);

        }
      })
  }

  // Mostrar mensaje en caso de que no se seleccione nada
  mostrarMensaje(mensaje, clases) {
    
    const resultadoAnterior = document.querySelector('#resultado > div');

    if(resultadoAnterior) {
      resultadoAnterior.remove();
    }

    const div = document.createElement('div');
    div.className = clases;
    div.appendChild(document.createTextNode(mensaje));

    const divMensaje = document.querySelector('.mensaje');
    divMensaje.appendChild(div);

    setTimeout(() => {
      document.querySelector('.mensaje div').remove();
    },1500);

  }

  // imprimir el resultado
  mostrarResultado(datos) {

    // En caso de un resultado anterior
    const resultadoAnterior = document.querySelector('#resultado > div');

    if(resultadoAnterior) {
      resultadoAnterior.remove();
    }

    // Recogemos el dato
    const resultado = datos[0];

    // Validamos que el dato exista
    if(resultado) {

      // Construimos el template
      let templateHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Resultados</h5>
          <h6 class="card-subtitle mb-2 text-muted">${resultado.Country}. Latitud: ${resultado.Lat} Longitud: ${resultado.Lon}</h6>
          <div class="card-text">Casos Registrados: <b>${resultado.Confirmed}</b></div>
          <div class="card-text">Activos: <b>${resultado.Active}</b></div>
          <div class="card-text">Recuperados: <b>${resultado.Recovered}</b></div>
          <div class="card-text">Fallecidos: <b>${resultado.Deaths}</b></div>
        </div>
        <div class="card-footer text-muted">
          Ultima Actualizacion ${resultado.Date}
        </div>
      </div>`;

      this.mostrarOcultarSpinner('block');

      setTimeout(() => {
      
      //Insertar el resultado
      document.querySelector('#resultado').innerHTML = templateHTML;

      this.mostrarOcultarSpinner('none');

      },2000);

    
    } else {
      // En caso de que no exista resultado...

      this.mostrarOcultarSpinner('block');

      setTimeout(() => {
      
        this.mostrarMensaje('No hay informacion disponible', 'mensaje-error alert alert-info')
  
        this.mostrarOcultarSpinner('none');
  
      },1500);
      
    }
    
  }

  mostrarOcultarSpinner(vista){
    const spinner = document.querySelector('.spinner');
    spinner.style.display = vista;
  }
}