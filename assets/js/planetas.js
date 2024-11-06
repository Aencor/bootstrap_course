document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://dragonball-api.com/api/planets?limit=50";
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
                desc = character.description,
                id = character.id;
            characterCard.innerHTML = `
              <div class="card h-100 d-flex flex-column align-items-center text-center border border-primary border-3 rounded-3">
                <div class="character-pic my-3 border border-2 border-success rounded-circle" style="background-image:url(${image})"></div>
                <div class="card-body w-100">
                  <h2 class="card-title">${name}</h5>

                    <a href="planeta.html?id=${id}" class="btn db-btn btn-lg btn-danger">Ver Más</a>
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
