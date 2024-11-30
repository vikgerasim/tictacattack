// player-context.js
import React, { createContext, useState, useContext } from 'react';

// Create PlayerContext
export const PlayerContext = createContext();

// Create a provider component
export const PlayerProvider = ({ children }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  return (
    <PlayerContext.Provider value={{ player1, setPlayer1, player2, setPlayer2 }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the PlayerContext
export const usePlayerContext = () => useContext(PlayerContext);
