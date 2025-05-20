/**
 * inyecta el navbar, el language menu y el footer en cada página
 */
export function initUtils() {
  // header (navbar)
  fetch('./shared/navbar.html')
    .then(res => res.text())
    .then(html => {
      const header = document.querySelector('header');
      if (header) {
        header.innerHTML = html;
        // una vez inyectado el navbar, inyectamos también el language menu
        injectLanguageMenu();
      }
    });

  // footer
  fetch('./shared/footer.html')
    .then(res => res.text())
    .then(html => {
      const footer = document.querySelector('footer');
      if (footer) footer.innerHTML = html;
    });

  // inicializar comportamiento de toggle del navbar y del language menu
  initToggles();
}

/**
 * obtiene y parsea json de una url
 * @param {string} url 
 * @returns {promise<any>}
 */
export function fetchJSON(url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`failed to fetch ${url}: ${res.status}`);
    return res.json();
  });
}

/**
 * inyecta el language menu dentro del navbar
 */
function injectLanguageMenu() {
  fetch('./shared/language-menu.html')
    .then(res => res.text())
    .then(html => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        // lo insertamos al final del navbar
        navbar.insertAdjacentHTML('beforeend', html);
      }
    });
}

/**
 * inicializa los listeners para toggles:
 * - menu responsive (navbar)
 * - menu de idioma
 * - cerrar language menu al hacer clic fuera
 */
function initToggles() {
  document.addEventListener('click', e => {
    // toggle navbar en móvil
    if (e.target.matches('.nav-toggle')) {
      document.querySelector('.nav-links')?.classList.toggle('show');
    }

    // toggle language menu
    if (e.target.matches('.language-toggle')) {
      const menu = e.target.closest('.language-menu');
      menu?.classList.toggle('open');
      e.target.setAttribute(
        'aria-expanded',
        menu?.classList.contains('open') ? 'true' : 'false'
      );
    }

    // cerrar language menu si se hace clic fuera
    if (
      !e.target.closest('.language-menu') &&
      document.querySelector('.language-menu.open')
    ) {
      document.querySelectorAll('.language-menu.open').forEach(m => {
        m.classList.remove('open');
        m.querySelector('.language-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
