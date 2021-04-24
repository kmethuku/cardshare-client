import { useState } from 'react';

function Navbar({ setSelectedBook, setNewDeck, newDeck }) {
  const [results, setResults] = useState('');
  const [input, setInput] = useState('');
  const searchURL = 'http://openlibrary.org/search.json?title=';

  function handleChange(e) {
    setInput(e.target.value);
    let query = input.split(' ').join('+');
    fetch(searchURL + query).then(data => data.json()).then(res => setResults(res.docs));
  }

  function handleClick(e) {
    if (setNewDeck) {
      setNewDeck({
        ...newDeck,
        title: e.target.title,
        src: e.target.src
      });
      setInput(e.target.title);
    }
    else {
      setSelectedBook({
        title: e.target.title,
        src: e.target.src
      });
      setInput('');
    }
    setResults('');
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} placeholder="Search by title"/>
      {results.length > 0 && results.map(result => {
        return (
          (result.cover_i ?
            <div key={result.key}>
              <img src={`https://covers.openlibrary.org/b/id/${result.cover_i}-S.jpg`} title={result.title} onClick={handleClick}/>
            </div>:
            <div height="58px" width="32px" title={result.title} key={result.key} onClick={handleClick}>{result.title.length > 50 ? result.title.substring(0, 50) + '...' : result.title}</div>)
          )
      })}
    </div>
  )
}

export default Navbar;
