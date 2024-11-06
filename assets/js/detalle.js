document.addEventListener("DOMContentLoaded", () =>{
  // Obtener el parametro ID de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get('id');

  // Verificar el ID de que exista en el API

  if(!characterId){
    document.querySelector('#character-detail').innerHTML = '<p class="text-danger">No se encontró el ID</p>';
    return;
  }

  const apiURL = `https://dragonball-api.com/api/characters/${characterId}`;
  const characterDetailContainer = document.querySelector("#character-detail");
  const characterNameContainer = document.querySelector('#character-name');
  fetch(apiURL)
    .then(response => {
      if(!response.ok){
        throw new Error(`Error en la llamada a la API: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })

    .then(character => {
    if(character) {
      console.log(character);
      var name = character.name,
          ki = character.ki,
          maxKi = character.maxKi,
          race = character.race,
          gender = character.gender,
          description = character.description,
          image = character.image,
          affi = character.affiliation
          transformations = character.transformations;

      let transformationsCarousel = '';

      if(character.name){
        characterNameContainer.innerHTML = name;
        characterDetailContainer.innerHTML = ``;
      }
    } else {
      characterDetailContainer.innerHTML = `<p class="text-danger">Detalles del personaje no disponibles</p>`;
    }
  })
  .catch(error =>{
    characterDetailContainer.innerHTML = `<p class="text-danger">Hubo un error en el API</p>`;
  });
});