export let cart = [];

export function addCart(bookID, bookIMG, bookTITLE) {
  if (bookID === null) {
    return cart;
  }
  const exist = cart.some((element) => {
    return element.id === bookID;
  });

  if (exist) {
    cart.forEach((element) => {
      if (element.id === bookID) {
        element.items++;
      }
    });
    return cart;
  } else {
    cart = [
      ...cart,
      {
        id: bookID,
        title: bookTITLE,
        src: bookIMG,
        price: 9.99,
        items: 1,
      },
    ];
    return cart;
  }
}

export function clearCart() {
  cart = [];
  return cart;
}

export function clearItem(id) {
  cart.forEach((element, index) => {
    if (element.id === id) {
      cart.splice(index, 1);
    }
  });
  return cart;
}
