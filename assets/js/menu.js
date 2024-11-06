document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://dragonball-api.com/api/characters";
  const charactersContainer = document.querySelector("#character-menu");

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
            const characterCard = document.createElement("nav");
            characterCard.classList.add("nav", "flex-column");
            var name = character.name,
                image = character.image,
                id = character.id;
            characterCard.innerHTML = `<li><a style="background-image: url(${image})" class="mb-3 w-100 btn btn-primary db-btn btn-lg" href="personaje.html?id=${id}">${name}</a></li>`;

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
