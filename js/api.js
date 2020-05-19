class API {

  //Obtener todos los paises
  async obtenerPaises() {

    //URL de la API
    const url = `https://coronavirus-19-api.herokuapp.com/countries`;

    // Fetch a la API
    const urlObtenerPais = await fetch(url);

    // Respuesta en JSON
    const paises = await urlObtenerPais.json();

    return {
      paises
    }
  }

  async obtenerResultado(pais) {

    // URL de consulta
    const url = `https://coronavirus-19-api.herokuapp.com/countries/${pais}`;

    // Consultar la rest API
    const urlConvertir = await fetch(url);

    // Transformar en JSON
    const resultado = await urlConvertir.json();

    return {
      resultado
    }

  }
}