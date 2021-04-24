import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
      <Link href="/discover">
        <button type="button">Discover</button>
      </Link>
      <Link href="/create">
        <button type="button">Create</button>
      </Link>
      <Link href="/study">
        <button type="button">Study</button>
      </Link>
      <button type="button" onClick={handleSignOut}>Sign Out</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default HeaderButtons;
