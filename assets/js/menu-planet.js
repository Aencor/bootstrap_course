document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://dragonball-api.com/api/planets";
  const planetsContainer = document.querySelector("#planet-menu");

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
        planetsContainer.innerHTML = '';

        data.items.forEach(planet => {
          if (planet.name && planet.image) {
            const planetCard = document.createElement("nav");
            planetCard.classList.add("nav", "flex-column");
            var name = planet.name,
                image = planet.image,
                id = planet.id;
            planetCard.innerHTML = `<li><a style="background-image: url(${image})" class="mb-3 w-100 btn btn-primary db-btn btn-lg" href="planeta.html?id=${id}">${name}</a></li>`;

            // Agregar la tarjeta al contenedor
            planetsContainer.appendChild(planetCard);
          }
        });
      } else {
        console.error("La API devolvió un formato inesperado:", data);
      }
    })
    .catch(error => {
      planetsContainer.innerHTML = `<p class="text-danger">Hubo un error al cargar los personajes.</p>`;
      console.error("Error:", error);
    });
});
