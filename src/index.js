import { getBookData, getCategories, getData } from './api.js';
import { addCart, clearCart, clearItem } from './cart.js';
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

const category = 220;

async function init() {
  renderHTML();

  new Splide('#splide', {
    perPage: 3,
    rewind: true,
  }).mount();

  loading();
  await renderMenu(getCategories);
  await renderProducts(category, getData);
  clickHandler(
    getData,
    getBookData,
    renderModalBook,
    renderBookData,
    renderModalCart,
    addCart,
    clearCart,
    clearItem
  );
}
init();
