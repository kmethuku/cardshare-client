import React, { useEffect, useState, Dispatch, SetStateAction, useContext } from 'react';
import Searchbar from './searchbar';
import { AuthContext } from '../contexts/AuthContext';
import { newDeckService } from '../services/internalApi';
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
import css from '../styles/important.module.css'

type Props = {
  setClickedItem: Dispatch<SetStateAction<string>>,
}

const NewDeck = ({ setClickedItem }: Props) => {
  const context = useContext(AuthContext)
  if (!context) return null;

  const genreOption:Array<string> =[
    'Self-Growth', 'History'
  ]
  const defaultOption = genreOption[0];

  const email = context?.currentUser.email;
  const username = context.username;
  const [newDeck, setNewDeck] = useState<IDeck>(defaultDeck);

  const handleDeckChange = (e: React.ChangeEvent<FormControlElement>): void => {
    const { name, value } = e.target;
    setNewDeck({ ...newDeck, [name]: value, })
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
  console.log(newDeck.cards)
  async function handleSubmit (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> {
    e.preventDefault();
    newDeckService(email, newDeck)
    setNewDeck(defaultDeck)
    setClickedItem('');
  }

  return (
    <div>
        <Searchbar setNewDeck={setNewDeck} newDeck={newDeck} />
      <Container>
        <Card option="strong">
          <h1>New Deck</h1>
          <TextField
            className="textfield"
            type="text"
            label="Title"
            name="title"
            value={newDeck.title}
            onChange={handleDeckChange}
            required
            disabled
          />
          <Dropdown
            className="formDropdown"
            options={genreOption}
            value={newDeck.genre}
            placeholder="Select a Genre"
            onChange={(option) => handleGenreChange(option)}
          />
          <TextField
            className="textfield"
            type="text"
            label="Description"
            name="description"
            value={newDeck.description}
            onChange={handleDeckChange}
          />
          <Carousel selectedItem={newDeck.cards.length-1} showThumbs={false}>
            {newDeck.cards.map((card: ICard, index: number) => (
              <Card option="small" key={index}>
                Flashcard {index +1}
                <a onClick={() => handleRemoveClick(index)}>
                  <img
                    style={{width: '20px', float: 'right'}}
                    src="/delete.png"

                /></a>
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
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleAddClick()}>
                Add Card
              </button>
              <br />
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setClickedItem("")}
              >
                Cancel
              </button>
        </Card>
      </Container>
    </div>
  );
}



export default NewDeck;
