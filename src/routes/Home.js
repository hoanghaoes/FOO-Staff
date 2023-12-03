// src/components/HomeScreen.js
import React from 'react';
import './Home.css';

const HomeScreen = () => {
 return (
    <div className="home-screen">
      <div className="icon-container">
        <div className="icon"></div>
      </div>
      <h1 className="title">Welcome to Our App</h1>
      <p className="description">Explore, discover, and share.</p>
    </div>
 );
};

export default HomeScreen;