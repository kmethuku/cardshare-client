const openLib = 'http://openlibrary.org/search.json?title=';
const googleBooks = 'https://www.googleapis.com/books/v1/volumes?q='
const key = '&key='
const apiKey = (process.env.googlebooksAPI as string)

// export const searchService = (query: any): Promise<any> => {
//   return fetch(openLib + query)
//     .then(data => data.json())
//     .then(res => res.docs);
// }

// export const discoverSearchService = (query: string, id: any): Promise<any> => {
//   return fetch(`${openLib}${query}`)
//     .then((data) => data.json())
//     .then((res) => {
//       let longKey = '/works/'+ id;
//       let found = res.docs.find((match: any) => match.key == longKey);
//     return {
//       title: found.title,
//       src: found.cover_i ? `https://covers.openlibrary.org/b/id/${found.cover_i}-M.jpg`
//       : undefined,
//       OLID: id,
//     }})
// };

export const searchBookService = (query: string): Promise<any> => {
  return fetch(`${googleBooks}${query}${key}AIzaSyBVdBpxaBKFOa_6fuLJ4qhszSOhjK-19bo`)
  .then(res => res.json())
  .then(data => {
    console.log(data.items)
    return data.items;
  });
}

export const discoverySearchingService = async (query, id):Promise<any> {
  let result = await searchBookService(query);
  let book = result.find(match:any) => match.id===id);
  return {
    title:book.volumeInfo.title,
    src:Book.volumeInfo.imageLinks.thumbnail,
    OLID: id
  }
}