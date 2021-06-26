import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const HeaderButtons = () => {
  const context = useContext(AuthContext);
  if (!context) return null;
  const { signOut, currentUser } = context;
  let loggedIn: boolean;
  if (currentUser.email !== 'waiting...') {
    loggedIn = true;
  } else loggedIn = false;

  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> => {
    try {
      signOut();
      router.push('/');
    } catch (err) {
      alert('Signout Failed.');
    }
  }

  return (
      <ul className="navigation-bar">
        <li className="navigation-bar__list-item">
          <img src="/cardshare-logo-books-transparent.png" width="auto" height="50"></img>
        </li>
        <li className="navigation-bar__list-item">
          <Link href="/discover">
            Discover
          </Link>
        </li>
        <li className="navigation-bar__list-item">
          <Link href="/create">
            Create
          </Link>
        </li>
        <li className="navigation-bar__list-item">
          <Link href="/study">
            Study
          </Link>
        </li>
        <li className="navigation-bar__list-item" onClick={handleSignOut}>
          <a><img src="/signout.png" width="auto" height="25"></img></a>
        </li>
      </ul>
  );
}

export default HeaderButtons;
