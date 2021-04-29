const URL = 'http://localhost:3000'

export const newDeckService = (email: string, body: string): Promise<any> => {
  return fetch(`${URL}/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
    body: JSON.stringify(body),
  })
    .then(data => data.json());
}

export const discoverBookService = (selectedBook: any): Promise<any> => {
  return fetch(`${URL}/discover/${selectedBook.OLID}`).then(data => data.json()).then(res => {
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