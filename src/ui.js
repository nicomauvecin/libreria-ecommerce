const app = document.querySelector('#app');

export const renderHTML = () => {
  app.innerHTML = `
  <header class="header">
  <div class="notification">ENVIOS GRATIS DESDE $4000 EN TODO EL PAIS.</div>
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
  <div class="menu-container"></div>
  <div class="cart-container"></div>
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
<section class="products-container">
</section>
</div>

    `;
};
