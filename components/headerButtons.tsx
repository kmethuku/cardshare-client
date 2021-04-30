import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

function HeaderButtons() {
  const context = useAuth();
  if (!context) return null;
  const { signOut } = context;
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> => {
    e.preventDefault();
    try {
      setError('');
      await signOut();
      router.push('/');
    } catch (err) {
      setError('Signout Failed.');
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between mx-2 my-2">
        <h3>Cardshare</h3>
        <Button type="button" onClick={handleSignOut}>Sign Out</Button>
      </div>
      <ul className="nav nav-tabs d-flex justify-content-between text-center">
        <li className="nav-item w-25">
          <Link href="/discover">
          <a className="nav-link">Discover</a>
          </Link>
        </li>
        <li className="nav-item w-25">
          <Link href="/create">
          <a className="nav-link">Create</a>
          </Link>
        </li>
        <li className="nav-item w-25">
          <Link href="/study">
          <a className="nav-link">Study</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default HeaderButtons;
