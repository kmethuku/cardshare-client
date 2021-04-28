import { useState } from 'react';
import { Form } from 'react-bootstrap';

function Navbar({ setSelectedBook, setNewDeck, newDeck }) {
  const [results, setResults] = useState('');
  const [input, setInput] = useState('');
  const searchURL = 'http://openlibrary.org/search.json?title=';

  function handleChange(e) {
    setInput(e.target.value);
    if (input === '') setResults('');
    else {
      let query = input.split(' ').join('+');
      fetch(searchURL + query).then(data => data.json()).then(res => setResults(res.docs));
    }
  }

  function handleClick(e) {
    let shortOLID = e.target.id.substring(7);
    if (setNewDeck) {
      setNewDeck({
        ...newDeck,
        title: e.target.title,
        src: e.target.src ? e.target.src : undefined,
        OLID: shortOLID
      });
      setInput(e.target.title);
    }
    else {
      setSelectedBook({
        title: e.target.title,
        src: e.target.src ? e.target.src : undefined,
        OLID: shortOLID
      });
      setInput('');
    }
    setResults('');
  }

  //This navbar is the main reason why the css is not responsive
  //I had to change the components underneath it on the screen to position absolute
  //in order to prevent them from shifting down when the results dropped down
  //under the navbar
  return (
    <div>
      <Form.Control style={{ maxWidth:"400px" }} className="mt-2 position-relative" type="text" value={input} onChange={handleChange} placeholder="What book are you looking for?"/>
      <div className="position-relative" style={{ backgroundColor: "white", maxWidth:"400px", maxHeight:"400px", overflowY: "scroll",
      scrollBehavior: "smooth", border: "1px solid rgba(0,0,0,.125)", borderRadius: ".25rem"}}>
        {input !== '' && <div className="d-flex flex-column align-items-center
          justify-content-center mx-2 mt-2">
          {results.length > 0 && results.map(result => {
            return (
              (result.cover_i ?
                <div className="my-2 mx-2" key={result.key}>
                  <img src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`} width="150px" height="auto" title={result.title} id={result.key} onClick={handleClick}/>
                </div> :
                <div className="my-2 mx-2 text-center" style={{ height:"220px", width:"150px", fontSize:"20px",
                border: "1px solid rgba(0,0,0,.125)", borderRadius: ".25rem", padding: "2px" }} title={result.title} id={result.key} key={result.key} onClick={handleClick}>{result.title.length > 50 ? result.title.substring(0, 50) + '...' : result.title}</div>)
              )
          })}
        </div>}
      </div>
    </div>
  )
}

export default Navbar;
