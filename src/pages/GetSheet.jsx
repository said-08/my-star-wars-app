/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext, useState, useEffect } from 'react';
import { AlbumContext } from '../context/AlbumContext';
import Card from '../components/Cards';
import Envelope from '../components/Envelope';

const GetSheet = () => {
  const { packs, timer, handlePackClick } = useContext(AlbumContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processedCards, setProcessedCards] = useState([]);

  useEffect(() => {
    const allPacksReady = packs.every(pack => !pack.opened);
    if (allPacksReady) {
      localStorage.removeItem('openedCards');
    } else {
      const storedCards = JSON.parse(localStorage.getItem('openedCards'));
      if (storedCards) {
        setCards(storedCards);
      }
    }
  }, [packs])

  const getRandomConfiguration = () => {
    const configurations = [
      { films: 1, people: 3, starships: 1 },
      { films: 0, people: 3, starships: 2 }
    ];
    return configurations[Math.floor(Math.random() * configurations.length)];
  };

  const defineCategory = (id, section) => {
    if (section === "people" && id <= 20 || section === "starships" && id <= 17 || section === "films") {
      return 'Especial'
    } else {
      return 'Regular'
    }
  }

  const fetchResources = async (type, count) => {
    const response = await fetch(`https://swapi.dev/api/${type}/`);
    const data = await response.json();
    return data.results.slice(0, count).map(item => ({
      id: item.url.split('/').filter(Boolean).pop(),
      name: type === 'films' ? item.title : item.name,
      section: type === 'people' ? 'Personaje' : type === 'starships' ? 'Naves' : 'Peliculas',
      category: defineCategory(item.url.split('/').filter(Boolean).pop(), type)
    }));
  };

  const openPack = async (packId) => {
    if (packs.find(pack => pack.id === packId && !pack.locked && !pack.opened)) {
      setLoading(true);
      const configuration = getRandomConfiguration();
      const newCards = [];

      if (configuration.films > 0) {
        const filmCards = await fetchResources('films', configuration.films);
        newCards.push(...filmCards);
      }

      const peopleCards = await fetchResources('people', configuration.people);
      const starshipCards = await fetchResources('starships', configuration.starships);

      newCards.push(...peopleCards, ...starshipCards);

      setCards(prevCards => [...prevCards, ...newCards]);
      console.log("CARTAS", newCards)
      localStorage.setItem('openedCards', JSON.stringify(newCards))
      handlePackClick(packId);
      setLoading(false);
    }
  };

  // const handleCardAction = (cardId) => {
  //   const updatedProcessedCards = [...processedCards, cardId];
  //   setProcessedCards(updatedProcessedCards);

  //   if (updatedProcessedCards.length === cards.length) {
  //     markPackCompleted();
  //     localStorage.removeItem('openedCards');
  //     setCards([]);
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold underline pt-3 text-center mb-6">Sobres Disponibles</h2>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {packs.map(pack => (
          <Envelope
          key={pack.id}
          id={pack.id}
          onClick={openPack}
          disabled={pack.locked || pack.opened}
          isOpen={pack.opened}
        />
        ))}
      </div>
      {timer && <p className="mt-4">Los sobres restantes estarán disponibles en: {timer} segundos</p>}

      <div className="mt-8">
        <h3 className="text-3xl font-bold underline mb-4">Láminas Obtenidas</h3>
        {loading ? <p>Cargando láminas...</p> :
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card,i) => (
              <Card index={i} idCard={card.id} category={"Especial"} name={card.name} section={card.section} />
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default GetSheet;
