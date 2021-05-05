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
    if (!context) return null;
    const { currentUser, email } = context;
    const router = useRouter();
    const {id} = router.query;
    const [deck, setDeck] = useState<IDeck | null>(null)
    const[cardText, setCardText] = useState<any>(deck?.cards[0]?.question);
    const[card, setCard] =useState<any>(deck?.cards[0]);
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        const sendEmail = email || currentUser.email;
        console.log(sendEmail)
        getSavedDeckByIdService(sendEmail, id)
        .then(data => setDeck(data))
    }, [router])


  return(
  <Container>
    <div>{deck?.title}</div>
    <div className="flashCardWrapper">
        <button className="flashCardButton" type="button">Previous</button>
        <div className="flashCardBody">
        {deck?.title}
        </div>
        <button className="flashCardButton" type="button">Next</button>
    </div>
  </Container>
  )
}

export default Deck;
