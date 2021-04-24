import HeaderButtons from '../components/headerButtons';
import { useAuth } from '../contexts/AuthContext';

function Study() {
  const { currentUser } = useAuth();

  if (currentUser)
  return (
    <div>
      <HeaderButtons></HeaderButtons>
    </div>
  )
  else return <h1>Access Unauthorized</h1>
}

export default Study;
