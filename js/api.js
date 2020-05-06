class API {

  // Funcion para formatear fecha
  formatDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() - 1),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  //Obtener todos los paises
  async obtenerPaises() {

    //URL de la API
    const url = `https://api.covid19api.com/countries`;

    // Fetch a la API
    const urlObtenerPais = await fetch(url);

    // Respuesta en JSON
    const paises = await urlObtenerPais.json();

    return {
      paises
    }
  }

  async obtenerResultado(pais) {

    // Obtener la fecha formateada
    const fecha = this.formatDate();

    // URL de consulta
    const url = `https://api.covid19api.com/live/country/${pais}/status/confirmed/date/${fecha}T00:00:00Z`;

    // Consultar la rest API
    const urlConvertir = await fetch(url);

    // Transformar en JSON
    const resultado = await urlConvertir.json();

    return {
      resultado
    }

  }
}