import { AuthContext, useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getDeckByEmailService } from '../services/internalApi';
import IDeck from '../interfaces/IDeck';
import ListDecks from '../components/listDecks';
import Container from '../components/Container';
import { useRouter } from 'next/router';

function MyDecks() {

const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;
    const router = useRouter();
    const [myDecks, setMyDecks] = useState<IDeck[]>([]);

    useEffect(() => {
        const sendEmail = email||currentUser.email
        if (sendEmail) {
            getDeckByEmailService(sendEmail)
            .then((data) => {
                console.log(data)
                data && setMyDecks(data)
            });
        };
    },[currentUser, email, router]);

    const handleNewDeck = () => {
        router.push("/create")
    }

    return(
        <Container>
            <div className="pageTitle">My Decks</div>
            <button
            type="button"
            className="buttonNewDeck"
            onClick={handleNewDeck}> Create New Deck
            </button>
            <ListDecks decks={myDecks} setDecks={setMyDecks} type={"myDecks"}/>
        </Container>
    )

}

export default MyDecks;