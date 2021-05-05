const openLib = 'http://openlibrary.org/search.json?title=';
const googleBooksURI = 'https://www.googleapis.com/books/v1/volumes?q='
const apiKey = (process.env.googlebooksAPI as string)

export const searchBookService = (query: string): Promise<any> => {
  return fetch(`${googleBooksURI}${query}&key=AIzaSyBVdBpxaBKFOa_6fuLJ4qhszSOhjK-19bo`)
  .then(res => res.json())
  .then(data => {
    return data.items;
  });
}

export const discoverySearchingService = async (query: string, id: string):Promise<any> => {
  let result = await searchBookService(query);
  let book = result.find((match:any) => match.id===id);
  return {
    title:book.volumeInfo.title,
    src: book.volumeInfo.imageLinks.thumbnail,
    OLID: id
  }
}