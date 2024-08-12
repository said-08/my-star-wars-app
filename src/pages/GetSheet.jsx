import { useContext, useState, useEffect } from 'react';
import { AlbumContext } from '../context/AlbumContext';
import Card from '../components/Cards';
import Envelope from '../components/Envelope';

const GetSheet = () => {
  const { packs, timer, handlePackClick } = useContext(AlbumContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [packs]);

  const fetchAllPages = async (type) => {
    let allCards = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await fetch(`https://swapi.dev/api/${type}/?page=${page}`);
      const data = await response.json();
      allCards = allCards.concat(
        data.results.map(item => ({
          id: item.url.split('/').filter(Boolean).pop(),
          name: type === 'films' ? item.title : item.name,
          section: type === 'people' ? 'Personaje' : type === 'starships' ? 'Naves' : 'Peliculas',
          category: defineCategory(item.url.split('/').filter(Boolean).pop(), type)
        }))
      );
      hasMorePages = !!data.next;
      page++;
    }
    return allCards;
  };

  const fetchAndStoreAllCards = async () => {
    const peopleCards = await fetchAllPages('people');
    const starshipCards = await fetchAllPages('starships');
    const filmCards = await fetchAllPages('films');

    const allCards = [...peopleCards, ...starshipCards, ...filmCards];
    localStorage.setItem('allCards', JSON.stringify(allCards));
  };

  const defineCategory = (id, section) => {
    if (section === "people" && id <= 20 || section === "starships" && id <= 17 || section === "films") {
      return 'Especial';
    } else {
      return 'Regular';
    }
  };

  useEffect(() => {
    fetchAndStoreAllCards();
  }, []);

  // Generates a random configuration of cards
  const generateRandomCards = () => {
    const allCards = JSON.parse(localStorage.getItem('allCards')) || [];
    
    // Define the two configurations
    const configurations = [
      { films: 1, people: 3, starships: 1 },
      { films: 0, people: 3, starships: 2 }
    ];
    
    // Pick a random configuration
    const config = configurations[Math.floor(Math.random() * configurations.length)];
    
    const getCards = (type, count) => {
      const filteredCards = allCards.filter(card => card.section === type);
      return filteredCards.sort(() => 0.5 - Math.random()).slice(0, count);
    };
    
    // Generate cards based on the selected configuration
    const randomCards = [
      ...getCards('Peliculas', config.films),
      ...getCards('Personaje', config.people),
      ...getCards('Naves', config.starships)
    ];
    
    return randomCards;
  };

  const openPack = async (packId) => {
    if (packs.find(pack => pack.id === packId && !pack.locked && !pack.opened)) {
      setLoading(true);

      const newCards = generateRandomCards();
      console.log("DATA", newCards);
      setCards(prevCards => [...prevCards, ...newCards]);
      localStorage.setItem('openedCards', JSON.stringify(newCards));
      handlePackClick(packId);
      setLoading(false);
    }
  };

  const handleCardAction = (cardId) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    localStorage.setItem('openedCards', JSON.stringify(updatedCards));
  };

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
            {cards.map((card, i) => (
              <Card key={i} onCardAction={handleCardAction} idCard={card.id} category={card.category} name={card.name} section={card.section} />
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default GetSheet;
