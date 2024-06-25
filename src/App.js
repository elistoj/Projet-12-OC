import React from 'react';
import './App.css';
import Header from './components/header/header';
import VerticalNav from './components/VerticalNav/VerticalNav';
import Profile from './components/Profile/Profile';

const App = () => {
  const userId = 12;

  return (
    <>
      <Header />
      <VerticalNav />
      <Profile userId={userId} />
    </>
  );
};

export default App;