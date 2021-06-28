const googleBooksURI = 'https://www.googleapis.com/books/v1/volumes?q=';
const bookById = 'https://www.googleapis.com/books/v1/volumes/';

export const searchBookService = (query: string): Promise<any> => {
  return fetch(`${googleBooksURI}${query}`)
    .then((res) => res.json())
    .then((data) => data.items);
}

export const getBookDetailsService = async (id: string): Promise<any> => {
  return fetch(`${bookById}${id}`)
    .then((res) => res.json())
    .then((data) => ({
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors[0],
        publishedDate: data.volumeInfo.publishedDate,
        description: data.volumeInfo.description,
        pageCount: data.volumeInfo.pageCount,
        averageRating: data.volumeInfo.averageRating,
        img: data.volumeInfo.imageLinks.thumbnail,
        link: data.volumeInfo.previewLink,
      })
    );
}