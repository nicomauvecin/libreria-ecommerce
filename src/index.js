import { getBookData, getCategories, getData } from './api.js';
import {
  loading,
  renderHTML,
  renderProducts,
  renderMenu,
  clickHandler,
  renderModalBook,
  renderBookData,
  renderModalCart,
} from './ui.js';

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
  clickHandler(getBookData, renderModalBook, renderBookData, renderModalCart);
}
init();
