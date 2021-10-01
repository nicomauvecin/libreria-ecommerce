const app = document.querySelector('#app');

export const renderHTML = () => {
  app.innerHTML = `
  <header class="header">
  <div class="notification">ENVIOS GRATIS A TODO EL PAIS DESDE $4000.</div>
  <nav class="navbar">
    <div class="toggle-container"><i class="fas fa-user"></i></div>
    <div class="brand-container">
      <h1>CEMENTERIO DE LIBROS</h1>
    </div>
    <div class="cart-menu" id="cart" data-toggle="modal" data-target="#exampleModalCenter">
      <i class="fas fa-shopping-cart"></i>
      <span id="cart-items">0</span>
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
    <ul id="menu">
      <h2 class="loading">Cargando...</h2>
    </ul>
</div>
<div class="products-container" id="container">
</div>
    `;
};

let itemsCart = 0;

export function loading() {
  const container = document.querySelector('#container');
  container.classList.remove('active');

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
      <span id="item" data-id="${element.category_id}">${element.name}</span>
      </li>
      `;
  });
}

export async function renderProducts(categoria, cb) {
  const respuesta = await cb(categoria);
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
        <button class="btn btn-principal" id="btn-info" data-toggle="modal" data-target="#exampleModalCenter">Ver Info</button>
        <button class="btn btn-principal" id="btn-cart">Agregar al carrito</button>
      </div>
    </div>
    `;
  });
}

export function clickHandler(
  cbAPIData,
  cbAPIBook,
  cbRenderBookHTML,
  cbRenderBookData,
  cbRenderCartHTML,
  cbCart,
  cbClearCart,
  cbClearItem
) {
  productsHandler(cbAPIBook, cbRenderBookHTML, cbRenderBookData, cbCart);
  menuHandler(cbAPIData);
  cartHandler(cbRenderCartHTML, cbCart);
  modalHandler(cbRenderCartHTML, cbCart, cbClearItem, cbClearCart);
}

function productsHandler(
  cbAPIBook,
  cbRenderBookHTML,
  cbRenderBookData,
  cbCart
) {
  const productsContainer = document.querySelector('.products-container');
  productsContainer.onclick = async (e) => {
    if (e.target.id === 'btn-info') {
      cbRenderBookHTML();
      const bookID = e.target.parentNode.parentNode.dataset.id;
      const response = await cbAPIBook(bookID);
      await cbRenderBookData(response);
    } else if (e.target.id === 'btn-cart') {
      const selectedBook = e.target.parentNode.parentNode;
      const bookID = selectedBook.dataset.id;
      const bookIMG = selectedBook.querySelector('img').src;
      const bookTITLE = selectedBook.querySelector('h3').textContent;
      cbCart(bookID, bookIMG, bookTITLE);
      increaseCartItems();
    }
  };
}

function menuHandler(cbAPIData) {
  const menu = document.querySelector('#menu');
  menu.onclick = (e) => {
    if (e.target.id === 'item') {
      const selectedCategory = e.target.dataset.id;
      loading();
      renderProducts(selectedCategory, cbAPIData);
    }
  };
}

function cartHandler(cbRenderCartHTML, cbCart) {
  const btnCart = document.querySelector('#cart');
  btnCart.onclick = () => {
    cbRenderCartHTML(cbCart(null));
  };
}

function modalHandler(cbRenderCartHTML, cbCart, cbClearItem, cbClearCart) {
  modalBody.onclick = (e) => {
    if (e.target.id === 'clear-cart-item') {
      const selectedItem = e.target.parentNode.parentNode;
      const quantityItems = Number(
        selectedItem.querySelector('#book-quantity').innerText
      );
      console.log(quantityItems);
      const itemID = selectedItem.dataset.id;
      cbRenderCartHTML(cbClearItem(itemID));
      decreaseCardItems(quantityItems);
    }
  };

  modalFooter.onclick = (e) => {
    if (e.target.id === 'buy-cart-modal') {
      const selectedBook = e.target.parentNode.parentNode;
      const bookID = selectedBook.dataset.id;
      const bookIMG = selectedBook.querySelector('img').src;
      const bookTITLE = selectedBook.querySelector('h3').textContent;
      cbCart(bookID, bookIMG, bookTITLE);
    }
    if (e.target.id === 'clear-cart') {
      cbRenderCartHTML(cbClearCart());
      decreaseCardItems();
    }
  };
}

function increaseCartItems() {
  itemsCart++;
  const cartItems = document.querySelector('#cart-items');
  cartItems.innerText = itemsCart;
}

function decreaseCardItems(quantity = itemsCart) {
  itemsCart = itemsCart - quantity;
  const cartItems = document.querySelector('#cart-items');
  cartItems.innerText = itemsCart;
}

const modalBody = document.querySelector('.modal-body');
const modalFooter = document.querySelector('.modal-footer');

export function renderModalCart(cart) {
  modalBody.innerHTML = '';
  modalBody.className = 'modal-body-cart';
  if (cart.length === 0) {
    modalBody.innerHTML = `<h3>El carrito está vacío</h3>`;
    modalFooter.innerHTML = '';
    return;
  }

  cart.forEach((element) => {
    modalBody.innerHTML += `
    <div class="cart-item" data-id="${element.id}">
      <div class="modal-info">
        <h3 id="modal-book-title">${element.title}</h4>
        <h5>$<span id="modal-book-price">9.99</span> - Cantidad: <span id="book-quantity">${element.items}</span></h5>
        <button type="button" class="btn btn-principal" id="clear-cart-item">
        Quitar del carrito
        </button>
      </div>
      <div class="modal-img-cart">
        <img src="${element.src}" id="modal-book-img">
      </div>
    </div>
    `;
  });
  modalFooter.innerHTML = `
  <h4>Total: ${cart.length * 9.99}</h4>
  <button type="button" class="btn btn-principal" id="clear-cart">
    Vaciar Carrito
  </button>
  <button type="button" class="btn btn-secundario" id="buy-cart">
    Comprar
  </button>
  `;
}

export function renderModalBook() {
  modalBody.className = 'modal-body';
  modalBody.innerHTML = `
  <div class="modal-info">
    <h3 id="modal-book-title">Cargando...</h4>
    <h4 id="modal-book-author">Cargando...</h4>
    <p id="modal-book-content">Cargando...</p>
    <h5>$<span id="modal-book-price">9.99</span></h5>
  </div>
  <div class="modal-img">
    <img src="" id="modal-book-img">
  </div> 
  `;

  modalFooter.innerHTML = `
  <button type="button" class="btn btn-principal" id="buy-cart-modal">
    Agregar al carrito
  </button>
  <button type="button" class="btn btn-secundario" data-dismiss="modal">
    Cerrar
  </button>
  `;
}

export function renderBookData(response) {
  const modalTitle = modalBody.querySelector('#modal-book-title');
  const modalAuthor = modalBody.querySelector('#modal-book-author');
  const modalDescription = modalBody.querySelector('#modal-book-content');
  const modalImage = modalBody.querySelector('#modal-book-img');

  const modalContent = document.querySelector('.modal-content');
  modalContent.dataset.id = response[0].ID;
  modalTitle.innerText = response[0].title;
  modalAuthor.innerText = response[0].author;
  modalDescription.innerText = response[0].content_short;
  modalImage.src = response[0].thumbnail;
}
