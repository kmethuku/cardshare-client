const URL = 'http://localhost:3000'

export const newDeckService = (email, body) => {
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

export const discoverBookService = (selectedBook) => {
  fetch(`${URL}/discover/${selectedBook.OLID}`).then(data => data.json()).then(res => {
    let allDecks = [];
    res.forEach(match => match.myDecks.forEach(deck => {
      deck.creator = match.username;
      allDecks.push(deck);
    }));
    return allDecks;
  })
}

// OLID
// 