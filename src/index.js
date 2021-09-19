import { renderHTML } from './ui.js';

function init() {
  renderHTML();
  new Splide('#splide', {
    perPage: 3,
    rewind: true,
  }).mount();
}

init();
