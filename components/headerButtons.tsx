import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const HeaderButtons = () => {
  const context = useContext(AuthContext);
  if (!context) return null;
  const { signOut, currentUser } = context;
  let loggedIn: boolean
  if (currentUser.email !== "waiting...") {
    loggedIn = true;
  } else loggedIn = false;

  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> => {
    try {
      setError('');
      await signOut();
      router.push('/');
    } catch (err) {
      setError("Signout Failed.");
    }
  }

  return (
    <>
    <nav className="nav">
      <Link href="/"><a><h3>Cardshare</h3></a></Link>
      <ul>
        <li>
          <Link href="/discover">
            <a>Discover</a>
          </Link>
        </li>
        <li>
          <Link href="/create">
            <a>My Decks</a>
          </Link>
        </li>
        <li>
          <Link href="/study">
            <a>Study</a>
          </Link>
        </li>
        <li>
          {loggedIn ? (
            <a
              onClick={handleSignOut}
            >Sign Out</a>
          ) : (
            <Link href='/'><a>Log In</a></Link>
          )}
        </li>
      </ul>
    </nav>
    <p>{error && error}</p>
    </>
  );
}

export default HeaderButtons;
