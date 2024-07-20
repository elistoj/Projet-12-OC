import React, { useState } from 'react';
import Header from './components/header/header';
import VerticalNav from './components/VerticalNav/VerticalNav';
import Profile from './Page/Profile';
import './App.css';  

const App = () => {
  const [userId, setUserId] = useState("18"); // Initial user id

  const handleUserChange = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <VerticalNav userId={userId} onUserChange={handleUserChange} />
        <Profile userId={userId} />
      </div>
    </>
  );
};

export default App;