import { initUtils } from '/utils.js';

const routes = {
  // ruta → función que importa el módulo correspondiente
  '../index.html': () => import('./modules/home.js'),
  '../pages/products/products.html': () => import('./modules/products.js'),
  '../pages/cart/cart.html': () => import('./modules/cart.js'),
  '../pages/projects/projects.html': () => import('./modules/projects.js'),
  '../pages/contact/contact.html': () => import('./modules/contact.js'),
};

document.addEventListener('DOMContentLoaded', async () => {
  initUtils();

  // obtener el nombre del archivo de la URL
  let path = window.location.pathname.split('/').pop();
  if (!path) path = '../index.html';

  if (routes[path]) {
    const module = await routes[path]();
    if (typeof module.init === 'function') {
      module.init();
    }
  }
});
