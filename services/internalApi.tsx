const URL = 'http://localhost:3001'

export const newDeckService = (email: string, body: any): Promise<any> => {
  body = JSON.stringify(body)
  return fetch(`${URL}/myDecks/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
    body,
  })
    .then(data => {
      let result = data.json();
      console.log(result)
      return result;
    });
}

export const discoverBookService = (selectedBook: any): Promise<any> => {
  const OLID = selectedBook.OLID.slice(6)
  return fetch(`${URL}/discover/OLID${OLID}`)
    .then(data => data.json())
    .then(res => {
      let allDecks: any[] = [];
      res.forEach((match: any) => match.myDecks.forEach((deck: any) => {
        deck.creator = match.username;
        allDecks.push(deck);
      }));
      return allDecks;
    })
}

export const signUpService = (body: any): Promise<any> => {
  return fetch(`${URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(data => data.json())
}