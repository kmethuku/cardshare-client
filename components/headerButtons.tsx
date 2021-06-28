import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { NextRouter, useRouter } from 'next/router';
import { IAuthContext } from '../interfaces/IAuth';

const HeaderButtons = () => {
  const auth: IAuthContext | null = useContext(AuthContext);
  if (!auth) return null;
  const { signOut } = auth;
  const router: NextRouter = useRouter();

  const handleSignOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> => {
    try {
      await signOut();
      router.push('/');
    } catch (err) {
      alert('Signout Failed.');
    }
  }

  return (
      <ul className="navigation-bar">
        <li className="navigation-bar__list-item">
          <img src="/cardshare-logo-books-transparent.png" width="auto" height="50"/>
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
          <a><img src="/signout.png" width="auto" height="25"/></a>
        </li>
      </ul>
  );
}

export default HeaderButtons;
