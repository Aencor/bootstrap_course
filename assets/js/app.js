document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://dragonball-api.com/api/characters";
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
            characterCard.classList.add("col-md-3", "mb-4");
            var name = character.name,
                image = character.image;
            characterCard.innerHTML = `
              <div class="card h-100 text-center">
                <img src="${image}" class="card-img-top" alt="${name}">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
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
