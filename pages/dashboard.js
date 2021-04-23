import Discover from '../components/discover';
import Create from '../components/create';
import Study from '../components/study';
import { useState } from 'react';

function Dashboard() {
  const [view, setView] = useState(<Discover></Discover>);

  return (
    <div>
      <button type="button" onClick={() => setView(<Discover></Discover>)}>Discover</button>
      <button type="button" onClick={() => setView(<Create></Create>)}>Create</button>
      <button type="button" onClick={() => setView(<Study></Study>)}>Study</button>
      {view}
    </div>
  )
}

export default Dashboard;
