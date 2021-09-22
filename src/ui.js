const app = document.querySelector('#app');

export const renderHTML = () => {
  app.innerHTML = `
  <header class="header">
  <div class="notification">ENVIOS GRATIS A TODO EL PAIS DESDE $4000.</div>
  <nav class="navbar">
    <div class="toggle-container">☰</div>
    <div class="brand-container">
      <h1>CEMENTERIO DE LIBROS</h1>
    </div>
    <div class="cart-menu">
      <i class="fas fa-shopping-cart"></i>
      <span id="cart">1</span>
    </div>
  </nav>
</header>
<section class="carousel">
<div class="splide" id="splide">
	<div class="splide__track">
		<ul class="splide__list">
			<li class="splide__slide"><img src="./static/1.jpg"></li>
			<li class="splide__slide"><img src="./static/2.jpg"></li>
			<li class="splide__slide"><img src="./static/3.jpg"></li>
			<li class="splide__slide"><img src="./static/4.jpg"></li>
			<li class="splide__slide"><img src="./static/5.jpg"></li>
		</ul>
	</div>
</div>
</section>
<div class="wrapper">
<div class="menu-container">
    <h2>Categorias</h2>
    <ul id="menu"></ul>
</div>
<div class="products-container" id="container">
</div>
</div>
    `;
};

export function loading() {
  const container = document.querySelector('#container');
  const menu = document.querySelector('#menu');

  menu.innerHTML = `<h2 class="loading">Cargando...</h2>`;

  container.innerHTML = `
    <h2 class="loading">Cargando...</h2>
    `;
}

export async function renderMenu(cb) {
  const respuesta = await cb();
  const menu = document.querySelector('#menu');
  menu.innerHTML = '';
  respuesta.forEach((element) => {
    menu.innerHTML += `
      <li class="menu-item">
      <span data-id="${element.category_id}">${element.name}</span>
      </li>
      `;
  });
}

export async function renderProducts(categoria, inicial, final, cb) {
  const respuesta = await cb(categoria, inicial, final);
  const container = document.querySelector('#container');
  container.innerHTML = '';
  container.classList.add('active');
  respuesta.forEach((element) => {
    container.innerHTML += `
    <div class="card-book" data-id="${element.ID}"">
      <img class="desvanecer" src="${element.cover}">
      <div class="info-book">
        <h3>${element.title}</h3>
        <img src="../static/stars.png">
        <h4>$<span id="price">9.99</span></h4>
        <button class="btn btn-principal">Ver Info</button>
        <button class="btn btn-principal">Agregar al carrito</button>
      </div>
    </div>
    `;
  });
}
