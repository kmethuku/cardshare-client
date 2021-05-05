import React, { useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { AuthContext, useAuth } from '../../contexts/AuthContext';
import IDeck from '../../interfaces/IDeck'
import ICard from '../../interfaces/ICard';
import { useRouter } from 'next/router';
import Container from '../../components/Container';
import Card from '../../components/Card';
import{ getSavedDeckByIdService } from '../../services/internalApi'

function Deck () {
    const context = useContext(AuthContext);
    if (!context || !context.currentUser.email) return null;
    const { currentUser, email } = context;
    const router = useRouter();
    const {id} = router.query;
    const [deck, setDeck] = useState<IDeck | null>(null)
    const [cardText, setCardText] = useState<any>(deck?.cards[0]?.question);
    const [textType, setTextType] = useState<string>("Question:")
    const[card, setCard] =useState<any>(deck?.cards[0]);
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
      console.log(currentUser, email)
        const sendEmail = currentUser.email || email;
        if(sendEmail) {
          getSavedDeckByIdService(sendEmail, id)
          .then(data => {
            setDeck(data);
            setCardText(data.cards[0].question)
            setCard(data.cards[0]);
          })
        }
    }, [router, currentUser])

  const handleMove = (inc:number) : void => {
    setCard(deck?.cards[index+inc]);
    setCardText(deck?.cards[index+inc].question)
    setTextType("Question:");
    setIndex(index+inc);
  }

  const toggleText = (card:any) : void => {
    if (cardText === card.question) {
      setCardText(card.answer);
      setTextType("Answer:")
    } else {
      setCardText(card.question);
      setTextType("Question:")
    };
  }

  return(
    deck ? (
    <Container>
    <div>{deck?.title}</div>
    <div>Created by:{` ${deck?.creator}`}</div>
    <div className="flashCardWrapper">
        <button disabled={index===0}
          className="flashCardButton"
          onClick={()=>handleMove(-1)}
          type="button">Previous</button>
        <div className="flashCardBody"
          onClick={()=>toggleText(card)}>
          <div className="flashcardType">{textType}</div>
          <div className="flashcardContent">{cardText}</div>
        </div>
        <button
          disabled={index===deck?.cards?.length-1}
          onClick={()=>handleMove(1)}
          className="flashCardButton"
          type="button">Next</button>
    </div>
  </Container>) : (<div>loading...</div>)
  )
}

export default Deck;
