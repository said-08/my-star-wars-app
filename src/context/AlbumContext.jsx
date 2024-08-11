import { createContext, useState, useEffect } from 'react';

export const AlbumContext = createContext();

// eslint-disable-next-line react/prop-types
export const AlbumProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);
  const [packs, setPacks] = useState([
    { id: 1, opened: false, locked: false, completed: false},
    { id: 2, opened: false, locked: false, completed: false},
    { id: 3, opened: false, locked: false, completed: false},
    { id: 4, opened: false, locked: false, completed: false},
  ]);
  const [album, setAlbum] = useState([]);

  const startTimer = () => {
    setTimer(60);
  };

  useEffect(() => {
    if (timer !== null) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      if (timer === 0) {
        clearInterval(interval);
        setTimer(null);
        setPacks(packs.map(pack => ({ ...pack, locked: false })));
      }
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handlePackClick = (packId) => {
    setPacks(packs.map(pack => {
      if (pack.id === packId) {
        return { ...pack, opened: true };
      }
      return { ...pack, locked: true };
    }));
    startTimer();
  };

  const addToAlbum = (cardId) => {
    if (!album.includes(cardId)) {
      setAlbum([...album, cardId]);
    }
  };

  return (
    <AlbumContext.Provider value={{ packs, timer, handlePackClick, addToAlbum, album }}>
      {children}
    </AlbumContext.Provider>
  );
};