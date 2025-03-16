import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';

import ToggleMenu from './js/components/navbar.js';

// Ejecutar ToggleMenu
new ToggleMenu();

// Re-ejecutar en cada cambio de página con Turbo
document.addEventListener('turbo:load', () => {
    ToggleMenu();
});