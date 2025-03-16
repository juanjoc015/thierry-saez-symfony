let currentIndex = 0;
let photos = [];

document.addEventListener('DOMContentLoaded', () => {
    photos = Array.from(document.querySelectorAll('.container-photo img')).map(img => img.src);

    document.querySelectorAll('.container-photo img').forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Eventos para los botones de navegación y cierre
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.querySelector('.prev').addEventListener('click', prevImage);
    document.querySelector('.next').addEventListener('click', nextImage);
});

function openModal(index) {
    currentIndex = index;
    document.getElementById('modalImage').src = photos[currentIndex];
    document.getElementById('imageModal').classList.add('active');
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
}

function prevImage() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    document.getElementById('modalImage').src = photos[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % photos.length;
    document.getElementById('modalImage').src = photos[currentIndex];
}

// Cerrar el modal al hacer clic fuera de la imagen
document.getElementById('imageModal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('imageModal')) {
        closeModal();
    }
});