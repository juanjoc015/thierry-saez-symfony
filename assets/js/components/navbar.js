
export default function ToggleMenu() {
    const navbar = document.querySelector("#navbar");
    const icons = document.querySelector("#icons");
    const header = document.querySelector(".header");

    // Cambiar el color de los <li> en la ruta 'home'
    const currentPath = window.location.pathname; // Ruta actual
    if (currentPath === "/" && window.innerWidth > 900) { // Verifica ruta y tamaño de pantalla
        const menuItems = document.querySelectorAll(".menu li");
        menuItems.forEach((item) => {
            item.style.color = "black"; 
        });
    }

    if (icons && navbar && header) {
        if (!icons.dataset.listenerAdded) {
            const iconElement = icons.querySelector("i");

            icons.addEventListener("click", () => {
                navbar.classList.toggle("active");

                if (navbar.classList.contains("active")) {
                    header.style.position = "fixed";
                    header.style.backgroundColor = "white";
                    iconElement.classList.remove("fa-bars");
                    iconElement.classList.add("fa-xmark", "icon-large"); // Ajusta el tamaño aquí
                } else {
                    header.style.position = "relative";
                    header.style.removeProperty("background-color");
                    iconElement.classList.remove("fa-xmark", "icon-large");
                    iconElement.classList.add("fa-bars");
                }
            });

            icons.dataset.listenerAdded = "true";
        }
    } else {
        console.warn("Elementos #navbar o #icons no encontrados.");
    }
}



