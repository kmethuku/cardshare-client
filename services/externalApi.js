const openLib = 'http://openlibrary.org/search.json?title=';

export const searchService = (query) => {
  return fetch(openLib + query)
    .then(data => data.json())
    .then(res => res.docs);
}