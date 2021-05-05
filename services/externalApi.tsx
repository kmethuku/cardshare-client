const openLib = 'http://openlibrary.org/search.json?title=';
const googleBooksURI = 'https://www.googleapis.com/books/v1/volumes?q='
const apiKey = (process.env.googleBooks as string)


export const searchBookService = (query: string): Promise<any> => {
  console.log(process.env.googleBooks)
  return fetch(`${googleBooksURI}${query}&${apiKey}`)
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