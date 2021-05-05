import React, { useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { AuthContext, useAuth } from '../../../contexts/AuthContext';
import IDeck from '../../../interfaces/IDeck'
import ICard from '../../../interfaces/ICard';
import { useRouter } from 'next/router';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import{ getMyDeckByIdService } from '../../../services/internalApi'

function ViewDeck () {
    const context = useContext(AuthContext);
    if (!context || !context.currentUser.email) return null;
    const { currentUser, email } = context;
    const router = useRouter();
    const {id} = router.query;
    const [deck, setDeck] = useState<IDeck | null>(null)

    useEffect(() => {
      console.log(currentUser, email)
        const sendEmail = currentUser.email || email;
        if(sendEmail) {
          getMyDeckByIdService(sendEmail, id)
          .then(data => {
            setDeck(data);
          })
        }
    }, [router, currentUser])


  return(
    deck ? (
    <Container>
    <div className="deckViewInfo">
        <img className="bookCover" src={deck.src}/>
        <div className="deckViewInfoRight">
            <div className="deckViewInfoRightTitle">{deck?.title}</div>
            <div className="deckViewInfoRightDescription">{deck?.description}</div>
            <div className="deckViewInfoRightCreator">Created by:{` ${deck?.creator}`}</div>
        </div>
    </div>
  </Container>) : (<div>loading...</div>)
  )
}

export default ViewDeck;