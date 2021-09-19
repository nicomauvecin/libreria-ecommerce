import { getCategories, getData } from './api.js';
import { loading, renderHTML, renderProducts, renderMenu } from './ui.js';

const app = document.querySelector('#app');
const initialCategory = 'programacion';
const initialLimit = 0;
const finalLimit = 32;

async function init() {
  renderHTML();

  new Splide('#splide', {
    perPage: 3,
    rewind: true,
  }).mount();

  loading();
  await renderMenu(getCategories);
  await renderProducts(initialCategory, initialLimit, finalLimit, getData);
}
init();
