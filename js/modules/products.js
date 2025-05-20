import { fetchJSON } from '../utils.js';

export async function init() {
  const products = await fetchJSON('../data/products.json');
  const container = document.getElementById('products-list');
  const template = document.getElementById('template-product').innerHTML;

  products.forEach(p => {
    const html = template
      .replace(/__ID__/g, p.id)
      .replace(/__NAME__/g, p.name)
      .replace(/__PRICE__/g, p.price)
      .replace(/__IMG__/g, p.image);
    container.insertAdjacentHTML('beforeend', html);
  });

  // listener para botones "add to cart"
  container.addEventListener('click', evt => {
    if (evt.target.matches('button[data-id]')) {
      const id = evt.target.getAttribute('data-id');
      addToCart(id);
    }
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart');
}
