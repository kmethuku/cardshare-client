const openLib = 'http://openlibrary.org/search.json?title=';

export const searchService = (query: any): Promise<any> => {
  return fetch(openLib + query)
    .then(data => data.json())
    .then(res => res.docs);
}

export const discoverSearchService = (query: string, id: any): Promise<any> => {
  return fetch(`${openLib}${query}`)
    .then((data) => data.json())
    .then((res) => {
      let longKey = '/works/'+ id;
      let found = res.docs.find((match: any) => match.key == longKey);
    return {
      title: found.title,
      src: found.cover_i ? `https://covers.openlibrary.org/b/id/${found.cover_i}-M.jpg`
      : undefined,
      OLID: id,
    }})
};