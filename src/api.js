const API_URL = 'https://www.etnassoft.com/api/v1/get/';

export async function getData(category, limit = 32) {
  const response = await fetch(
    `${API_URL}/?category_id=${category}&num_items=${limit}&criteria=most_viewed`
  );
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/?get_categories=all`);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getBookData(id) {
  const response = await fetch(`${API_URL}/?id=${id}`);
  const responseJSON = await response.json();
  return responseJSON;
}
