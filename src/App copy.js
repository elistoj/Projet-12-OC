import React, { useState } from 'react';
import Header from './components/header/header';
import VerticalNav from './components/VerticalNav/VerticalNav';
import Profile from './components/Profile/Profile';

const App = () => {
  const [userId, setUserId] = useState("18"); // Initial user id

  const handleUserChange = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <>
      <Header userId={userId} onUserChange={handleUserChange} />
      <VerticalNav />
      <Profile userId={userId} />
    </>
  );
};

export default App;
