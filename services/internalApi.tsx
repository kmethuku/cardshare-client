const URL = 'http://localhost:3001'

export const newDeckService = (email: string|undefined, body: any): Promise<any> => {
  body = JSON.stringify(body)
  console.log(body)
  return fetch(`${URL}/myDecks/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
    body,
  })
    .then(data => {
      return data.json();
    });
}

export const getDeckByEmailService = (email:string): Promise<any> => {
  return fetch(`${URL}/myDecks/${email}`)
    .then(res => res.json())
    .then(data => {
      let deckList = data[0] ? data[0].myDecks : null;
      return deckList;
    })
}

export const deleteDeckByIdService = (email:string, id:string) : Promise<any> => {
  return fetch(`${URL}/myDecks/${email}-${id}`,{
    method:'DELETE',
  })
}

export const deleteSavedDeckByIdService = (email:string, id:string) : Promise<any> => {
  return fetch(`${URL}/savedDecks/${email}-${id}`,{
    method:'DELETE',
  })
}

export const getDeckByIdService = (id: string): Promise<any> => {
  return fetch(`${URL}/discover/${id}`)
    .then(res => res.json())
    .then(data => {
      data[0].myDecks[0].username = data[0].username;
      return data;
    })
}

export const discoverBookService = (selectedBook: any): Promise<any> => {
  const OLID = selectedBook.OLID
  return fetch(`${URL}/discover/OLID/${OLID}`)
    .then(res => res.json())
    .then(data => {
      let allDecks: any[] = [];
      data.forEach((match: any) => match.myDecks.forEach((deck: any) => {
        deck.creator = match.username;
        allDecks.push(deck);
      }));
      return allDecks;
    })
}

export const signUpService = async (body: any): Promise<any> => {
  return await fetch(`${URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.text())
}

export const saveDeckService = (email: string, selectedDeck: any): Promise<any> => {
  return fetch(`${URL}/savedDecks/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedDeck)
  })
    .then(res => res.text())
}

export const voteService = (id: string, direction: string): Promise<any> => {
  return fetch(`${URL}/discover/vote/${id}-${direction}`, {
    method: 'GET',
  })
  .then(res => res.text())
}

export const getDecksByGenreService = (genre: string): Promise<any> => {
  if (genre === 'discover') {
    return fetch(`${URL}/discover`)
      .then(res => res.json())
      .then(data => {
        let allDecks: any[] = [];
        let duplicateCheck: any[] = [];
        data.forEach((match: any) =>
          match.myDecks.forEach((deck: any) => {
            if (!duplicateCheck.includes(deck.OLID)) {
              deck.username = match.username;
              allDecks.push(deck);
              duplicateCheck.push(deck.OLID);
            }
          })
        );
        return allDecks;
      })
  } else {
    return fetch(`${URL}/discover/genre/${genre}`)
      .then(res => res.json())
      .then(data => {
        let allDecks: any[] = [];
        let duplicateCheck: any[] = [];
        data.forEach((match: any) =>
          match.myDecks.forEach((deck: any) => {
            if (!duplicateCheck.includes(deck.OLID)) {
              deck.username = match.username;
              allDecks.push(deck);
              duplicateCheck.push(deck.OLID);
            }
          })
        )
        return allDecks;
      })
  }
}

export const getSavedDecksByEmailService = (email: string): Promise<any> => {
  console.log(email)
  return fetch(`${URL}/savedDecks/${email}`)
    .then(res => res.json())
}