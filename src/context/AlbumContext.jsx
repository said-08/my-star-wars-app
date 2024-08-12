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
  const [allAvailableCards, setAllAvailableCards] = useState({});

  const startTimer = () => {
    setTimer(60);
  };

  const fetchAllAvailableCards = async (type) => {
    const urls = {
      people: 'https://swapi.dev/api/people/',
      starships: 'https://swapi.dev/api/starships/',
      films: 'https://swapi.dev/api/films/'
    };

    const response = await fetch(urls[type]);
    const data = await response.json();

    return data.results.map(item => ({
      id: item.url.split('/').filter(Boolean).pop(),
      name: type === 'films' ? item.title: item.name,
      section: type === 'people' ? 'Personaje' : type === 'starships' ? 'Naves' : 'Películas',
      category: 'Especial'
    }));
  };

  useEffect(() => {
    const loadAllCards = async () => {
      const peopleCards = await fetchAllAvailableCards('people');
      const starshipsCards = await fetchAllAvailableCards('starships');
      const filmsCards = await fetchAllAvailableCards('films');
      
      setAllAvailableCards({
        people: peopleCards,
        starships: starshipsCards,
        films: filmsCards
      });
    };

    loadAllCards();
  }, []);

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

  const addToAlbum = (card) => {
    if (!album.some(item => item.id === card.id)) {
      setAlbum([...album, card]);
    console.log("que hay", album)
    }
  };

  return (
    <AlbumContext.Provider value={{ packs, timer, handlePackClick, addToAlbum, album, fetchAllAvailableCards, allAvailableCards }}>
      {children}
    </AlbumContext.Provider>
  );
};