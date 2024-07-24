// src/App.tsx

import React from 'react';
import './App.css';
import PqGrid from "./PqGrid";

const App: React.FC = () => {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
        <h1>pqGrid with React and TypeScript</h1>
      {/*</header>*/}
      <PqGrid />
    </div>
  );
}

export default App;
