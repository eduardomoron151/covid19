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
          if (a.country > b.country) {
            return 1;
          }
          if(a.country < b.country){
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
          option.value = value.country;
          option.appendChild(document.createTextNode(value.country));
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

    // Validamos que el dato exista
    if(datos) {

      // Construimos el template
      let templateHTML = `
      <div class="card">
        <div class="card-body shadow">
          <h5 class="card-title mb-2">Resultados de la busqueda</h5>
          <h6 class="card-subtitle mb-2 text-muted">${datos.country}</h6>
          <div class="card-text">Casos Registrados: <b>${datos.cases}</b></div>
          <div class="card-text">Activos: <b>${datos.active}</b></div>
          <div class="card-text">Recuperados: <b>${datos.recovered}</b></div>
          <div class="card-text">Criticos: <b>${datos.critical}</b></div>
          <div class="card-text">Fallecidos: <b>${datos.deaths}</b></div>
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