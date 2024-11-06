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
  const characterPictureContainer = document.querySelector('#character-picture');
  const characterDescContainer = document.querySelector('#character-description');
  const kiContainer = document.querySelector('#character-ki');
  const maxKiContainer = document.querySelector('#character-maxki');
  const characterRace = document.querySelector('#character-race');
  const characterGender = document.querySelector('#character-gender');
  const characterAffi = document.querySelector('#character-affi');
  const characterTransformations = document.querySelector('#character-transform');
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

      // Agregar los datos al DOM 
      if(character){
        characterNameContainer.innerHTML = name;
        characterAffi.innerHTML = affi;
        characterGender.innerHTML = gender;
        characterRace.innerHTML = race;
        characterDescContainer.innerHTML = '<p class="lead">' + description + '</p>';
        characterPictureContainer.innerHTML = '<div class="character-photo-container" style="background-image: url(' + image + ')"></div>';
        kiContainer.innerHTML = '<span class="text-danger fw-bold">' + ki + '</span>';
        maxKiContainer.innerHTML = '<span class="text-danger fw-bold">' + maxKi + '</span>';
        // characterDetailContainer.innerHTML = ``;

        // Agregar Transformaciones si existen
        if(Array.isArray(character.transformations) && character.transformations.length > 0){
          console.log('Si hay Transformaciones');
          transformationsCarousel = `
            <div id="transformationsCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${character.transformations.map((transformation, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${transformation.image}" class="d-block w-100" alt="${transformation.name}">
                    <div class="carousel-caption d-none d-md-block">
                      <h5>${transformation.name}</h5>
                    </div>
                  </div>
                `).join('')}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#transformationsCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#transformationsCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          `;

          characterTransformations.innerHTML = `${transformationsCarousel}`;
        }
      }
    } else {
      characterDetailContainer.innerHTML = `<p class="text-danger">Detalles del personaje no disponibles</p>`;
    }
  })
  .catch(error =>{
    characterDetailContainer.innerHTML = `<p class="text-danger">Hubo un error en el API</p>`;
    console.error("Error:", error);
  });
});