// Función para inicializar el modal
function initModal(openButtonClass, modalId, imageId) {
    const openModalButtons = document.querySelectorAll(openButtonClass);
    const fullscreenModal = document.getElementById(modalId);
    const fullscreenImage = document.getElementById(imageId);

    if (openModalButtons && fullscreenModal && fullscreenImage) {
        openModalButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const originalSrc = button.getAttribute('data-original-src');
                fullscreenImage.src = originalSrc;
                fullscreenModal.classList.add('active');
            });
        });

        // Cerrar el modal al hacer clic en el botón de cerrar
        const closeModalButton = fullscreenModal.querySelector('.close-modal');
        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                fullscreenModal.classList.remove('active');
            });
        }

        // Cerrar el modal al hacer clic fuera de la imagen
        fullscreenModal.addEventListener('click', (event) => {
            if (event.target === fullscreenModal) {
                fullscreenModal.classList.remove('active');
            }
        });
    }
}

// Función para manejar el efecto de giro y la transición suave
function initImageFlip() {
    const showSituacion = document.getElementById('show-situacion');
    const baseImage = document.getElementById('base-image');
    const situacionImage = document.getElementById('situacion-image');

    if (showSituacion && baseImage && situacionImage) {
        let isFlipped = false; // Estado para rastrear si las imágenes están giradas

        showSituacion.addEventListener('click', function () {
            if (isFlipped) {
                // Volver al estado inicial
                baseImage.style.transform = 'rotateY(0deg)';
                situacionImage.style.transform = 'rotateY(180deg)';
            } else {
                // Girar las imágenes
                baseImage.style.transform = 'rotateY(180deg)';
                situacionImage.style.transform = 'rotateY(0deg)';
            }

            // Alternar el estado
            isFlipped = !isFlipped;
        });
    }
}

// Inicializar ambas funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initModal('.open-modal', 'fullscreenModal', 'fullscreenImage'); // Inicializar el modal
    initImageFlip(); // Inicializar el efecto de giro
});