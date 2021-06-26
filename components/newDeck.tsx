import React, { useEffect, useState, Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router'
import SearchBar from './searchbar';
import { AuthContext } from '../contexts/AuthContext';
import { getUserService, newDeckService } from '../services/internalApi';
import ICard from '../interfaces/ICard'
import IDeck, { defaultDeck } from '../interfaces/IDeck'
import FormControlElement from '../interfaces/FormControlElement'
import Container from '../components/Container'
import Card from '../components/Card'
import { Carousel } from 'react-responsive-carousel'
import Dropdown from 'react-dropdown'
import { TextField } from '@material-ui/core'
import 'react-dropdown/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeaderButtons from './headerButtons';

type Props = {
  setClickedItem: Dispatch<SetStateAction<string>>,
}

const NewDeck = ({ setClickedItem }: Props) => {
  const context = useContext(AuthContext);
  if (!context) return null;
  const router = useRouter();
  const genreOption:Array<string> =[
    'Self-Growth', 'History'
  ]
  const email = context?.currentUser.email;
  let username = context.username;
  const [newDeck, setNewDeck] = useState<IDeck>(defaultDeck);

  const handleDeckChange = (e: React.ChangeEvent<FormControlElement>): void => {
    const { name, value } = e.target;
    setNewDeck({ ...newDeck, [name]: value, });
  }

  const handleGenreChange = (option: any) => {
    setNewDeck({
      ...newDeck,
      genre: option.value
    })
  }

  const handleCardChange = (e: any): void => {
    const { name, value } = e.target;
    const { id } = e.target.form;
    let cardArray = [...newDeck.cards] as any[]
    cardArray[Number(id)][name] = value
    setNewDeck({
      ...newDeck,
      cards: cardArray
    })
  }

  function handleRemoveClick(index: number): void {
    console.log(index)
    let cardArray = [...newDeck.cards]
    cardArray.splice(index, 1)
    setNewDeck({
      ...newDeck,
      cards: cardArray
    })
  }

  function handleAddClick(): void {
    setNewDeck({
      ...newDeck,
      cards: [...newDeck.cards, { question: '', answer: '' }]
    })
  }

  async function handleSubmit (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> {
    if (!username) {
      username = await getUserService(email)
    }
    const submitDeck = {
      ...newDeck,
      creator: username
    }
    e.preventDefault();
    newDeckService(email, newDeck)
    setNewDeck(defaultDeck);
    router.push('/create');
  }

  return (
    <div>
      <HeaderButtons/>
      <div className="page-container">
        <h2 className="header">New Deck</h2>
        <SearchBar setNewDeck={setNewDeck} newDeck={newDeck}/>
        <Dropdown
          className="formDropdown"
          options={genreOption}
          value={newDeck.genre}
          placeholder="Select a Genre"
          onChange={(option) => handleGenreChange(option)}
        />
        <label className="label">Description:</label>
        <input
          type="text"
          name="description"
          value={newDeck.description}
          onChange={handleDeckChange}
        ></input>
        <Carousel selectedItem={newDeck.cards.length - 1} showThumbs={false}>
          {newDeck.cards.map((card: ICard, index: number) => (
            <Card option="small" key={index}>
              Flashcard {index + 1}
              <a
                style={{ float: "right", cursor: "pointer" }}
                onClick={() => handleRemoveClick(index)}
              >
                <img style={{ width: "20px" }} src="/delete.png" />
              </a>
              <form id={index.toString()}>
                <TextField
                  className="textfield"
                  type="text"
                  name="question"
                  label="Question"
                  value={card.question}
                  onChange={handleCardChange}
                />
                <TextField
                  className="textfield"
                  type="text"
                  name="answer"
                  label="Answer"
                  value={card.answer}
                  onChange={handleCardChange}
                />
              </form>
            </Card>
          ))}
        </Carousel>
        <div className="center">
        <button
          className="saveButton"
          type="button"
          onClick={() => handleAddClick()}
        >
          Add Card
        </button>
        <div className="createDeckButton">
        <button
          className="saveButton"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          Save Deck
        </button>
        <button
          className="saveButton"
          type="button"
          onClick={() => setClickedItem("")}
        >
          Cancel
        </button>

        </div>
        </div>
      </div>
    </div>
  );
}



export default NewDeck;
