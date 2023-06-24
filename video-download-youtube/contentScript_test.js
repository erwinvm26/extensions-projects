// Función para inyectar código en cada card de video
function injectCodeInVideoCards() {
  const cards = document.querySelectorAll("div#primary div#contents div#dismissible")

  cards.forEach((card) => {
    // Aquí puedes inyectar el código que desees en cada card de video
    // Por ejemplo, puedes agregar un nuevo elemento o modificar el contenido existente

    // Ejemplo: Agregar un nuevo elemento <span> con el texto "Código inyectado"
    const span = document.createElement('span');
    span.textContent = 'Código inyectado';
    card.appendChild(span);
  });
}

// Observador de mutación para detectar cuando se agregan nuevas cards de video al DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Verificar si las mutaciones incluyen nuevas cards de video
    const addedNodes = mutation.addedNodes;
    const videoCards = Array.from(addedNodes).filter(
      (node) => node.matches && node.matches('#meta')
    );

    if (videoCards.length > 0) {
      // Si se agregaron nuevas cards de video, inyectar código en ellas
      injectCodeInVideoCards();
    }
  });
});

// Configuración del observador de mutación
const observerConfig = {
  childList: true, // Observar cambios en los hijos del elemento observado
  subtree: true, // Observar cambios en todo el subárbol del elemento observado
};

// Iniciar la observación en el elemento contenedor de las cards de video en YouTube
const targetNode = document.getElementById('dismissible'); // Reemplaza 'contents' con el ID correcto del contenedor de las cards de video
observer.observe(targetNode, observerConfig);

// Ejecutar la función de inyección de código al cargar la página
window.addEventListener('load', injectCodeInVideoCards);
