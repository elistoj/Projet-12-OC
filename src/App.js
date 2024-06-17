import React from 'react';
import './App.css';
import HorizontalNav from './components/HorizontalNav/HorizontalNav';
import VerticalNav from './components/VerticalNav/VerticalNav';

const App = () => {
  return (
    <div className="App">
      <HorizontalNav />
      <VerticalNav />
      <header className="App-header">
      </header>
    </div>
  );
};

export default App;
