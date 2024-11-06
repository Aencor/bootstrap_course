document.addEventListener("DOMContentLoaded", () =>{
  // Obtener el parametro ID de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const planetId = urlParams.get('id');

  // Verificar el ID de que exista en el API

  if(!planetId){
    document.querySelector('#planet-detail').innerHTML = '<p class="text-danger">No se encontró el ID</p>';
    return;
  }

  const apiURL = `https://dragonball-api.com/api/planets/${planetId}`;
  const planetDetailContainer = document.querySelector("#planet-detail");
  const planetNameContainer = document.querySelector('#planet-name');
  const planetPictureContainer = document.querySelector('#planet-picture');
  const planetDescContainer = document.querySelector('#planet-description');
  const planetCharacters = document.querySelector('#planet-characters');
  fetch(apiURL)
    .then(response => {
      if(!response.ok){
        throw new Error(`Error en la llamada a la API: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })

    .then(planet => {
    if(planet) {
      console.log(planet);
      var name = planet.name,
          description = planet.description,
          image = planet.image,
          characters = planet.characters;

      // Agregar los datos al DOM 
      if(planet){
        if(Array.isArray(characters)){
          console.log('Si hay personajes');
          characters.forEach(character =>{
            if(character){
              const characterCard = document.createElement("div");
              characterCard.classList.add("col-md-3", "mb-4");
              var name = character.name,
              image = character.image,
              id = character.id;
              characterCard.innerHTML = `
                <div class="card">
                  <div class="char-photo" style="background-image : url(${image})"></div>
                  <h3 class="my-3 text-center">${name}</h3>
                  <a href="personaje.html?id=${id}" class="btn btn-primary btn-lg db-btn">
                    Ver Personaje
                  </a>
                </div>
              `;

              planetCharacters.appendChild(characterCard);
            }
          })
        }
        planetNameContainer.innerHTML = name;
        planetDescContainer.innerHTML = '<p class="lead">' + description + '</p>';
        planetPictureContainer.innerHTML = '<div class="planet-photo-container" style="background-image: url(' + image + ')"></div>';
       
      }
    } else {
      planetDetailContainer.innerHTML = `<p class="text-danger">Detalles del personaje no disponibles</p>`;
    }
  })
  .catch(error =>{
    planetDetailContainer.innerHTML = `<p class="text-danger">Hubo un error en el API</p>`;
    console.error("Error:", error);
  });
});