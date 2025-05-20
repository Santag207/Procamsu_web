import { fetchJSON } from './utils.js';

export async function init() {
  const cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
  const products = await fetchJSON('../data/products.json');
  const container = document.getElementById('cart-list');
  let total = 0;

  cartIds.forEach(id => {
    const p = products.find(x => x.id === id);
    if (p) {
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div>${p.name}</div>
        <div>$${p.price}</div>
      `;
      container.appendChild(item);
      total += p.price;
    }
  });

  document.getElementById('cart-total').textContent = `$${total}`;
}
