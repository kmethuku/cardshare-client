import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

function HeaderButtons() {
  const { signOut } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignOut(e) {
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
