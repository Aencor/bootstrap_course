document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://dragonball-api.com/api/characters?limit=50";
  const charactersContainer = document.querySelector("#characters-container .row.data-load");

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la llamada a la API: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Inspecciona el formato de `data` en la consola

      // Verificamos si `data.items` es un arreglo y lo procesamos
      if (Array.isArray(data.items)) {
        charactersContainer.innerHTML = '';

        data.items.forEach(character => {
          if (character.name && character.image) {
            const characterCard = document.createElement("div");
            characterCard.classList.add("col-md-4", "mb-4");
            var name = character.name,
                image = character.image,
                affi = character.affiliation,
                desc = character.description,
                gender = character.gender,
                ki = character.ki,
                maxKi = character.maxKi,
                race = character.race;
                id = character.id;
            characterCard.innerHTML = `
              <div class="card h-100 d-flex flex-column align-items-center text-center border border-primary border-3 rounded-3">
                <div class="character-pic my-3 border border-2 border-success rounded-circle" style="background-image:url(${image})"></div>
                <div class="card-body w-100">
                  <h2 class="card-title">${name}</h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <span class="text-danger fw-bold">Raza :</span> ${race}
                    </li>
                    <li class="list-group-item">
                      <span class="text-danger fw-bold">Afiliación :</span> ${affi}
                    </li>
                    <li class="list-group-item">
                      <span class="text-danger fw-bold">Género :</span> ${gender}
                    </li>
                  </ul>

                    <a href="personaje.html?id=${id}" class="btn btn-sm btn-danger">Ver Más</a>
                </div>

                <div class="card-footer w-100">
                  <div class="d-flex justify-content-between">
                    <div class="fs-6">Ki : <strong>${ki}</strong></div>
                    <div class="fs-6">Max Ki : <strong>${maxKi}</strong></div>
                  </div>
                </div>
              </div>
            `;

            // Agregar la tarjeta al contenedor
            charactersContainer.appendChild(characterCard);
          }
        });
      } else {
        console.error("La API devolvió un formato inesperado:", data);
      }
    })
    .catch(error => {
      charactersContainer.innerHTML = `<p class="text-danger">Hubo un error al cargar los personajes.</p>`;
      console.error("Error:", error);
    });
});
