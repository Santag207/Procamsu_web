import { fetchJSON } from '../utils.js';

export async function init() {
  const projects = await fetchJSON('../data/projects.json');
  const container = document.getElementById('projects-list');
  const template = document.getElementById('template-project').innerHTML;

  projects.forEach(proj => {
    const html = template
      .replace(/__TITLE__/g, proj.title)
      .replace(/__DESC__/g, proj.description)
      .replace(/__IMG__/g, proj.image);
    container.insertAdjacentHTML('beforeend', html);
  });
}
