import React, { useState, Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { searchBookService } from '../services/externalApi'
import IBook from '../interfaces/IBook'
import FormControlElement from '../interfaces/FormControlElement'

type Props = {
  setSelectedBook?: Dispatch<SetStateAction<IBook>>,
  setNewDeck?: Dispatch<SetStateAction<any>>,
  newDeck?: any,
}

function Searchbar({ setSelectedBook, setNewDeck, newDeck }: Props): JSX.Element {
  const [results, setResults] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
    setInput(e.target.value)
    if (input === '') setResults([]);
    else {
      let query = (e.target.value).split(' ').join('+');
      let result = await searchBookService(query);
      setResults(result);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.target as HTMLImageElement;
    if (setNewDeck) {
      setNewDeck({
        ...newDeck,
        title: target.title,
        src: target.src,
        OLID: target.id,
        votes: 0,
      });
      setInput(target.title);
    }
    else if (setSelectedBook) {
      setSelectedBook({
        title: target.title,
        src: target.src,
        OLID: target.id
      });
      setInput('');
    }
    setResults([]);
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
          {results.length > 0 && results.map((book: any) => {
            return (
                <div className="my-2 mx-2" key={book.id}>
                  { book.volumeInfo.imageLinks ?
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    width="150px"
                    height="auto"
                    title={book.volumeInfo.title}
                    id={book.id}
                    onClick={handleClick}/>
                    :
                    <div>{book.title}</div>
                  }
                </div>
              )
          })}
          {/* {results.length==0 && <div>No Results Found</div>} */}
        </div>}
      </div>
    </div>
  )
}

export default Searchbar;
