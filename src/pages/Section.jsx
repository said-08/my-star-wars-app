import { useContext, useState, useEffect } from 'react';
import { AlbumContext } from '../context/AlbumContext';
import Card from '../components/Cards';
import Envelope from '../components/Envelope';

const GetSheet = () => {
  const { packs, timer, handlePackClick } = useContext(AlbumContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all pages for a specific type (e.g., 'people', 'starships', 'films')
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

  // Fetch all cards and store them in localStorage
  const fetchAndStoreAllCards = async () => {
    const peopleCards = await fetchAllPages('people');
    const starshipCards = await fetchAllPages('starships');
    const filmCards = await fetchAllPages('films');

    const allCards = [...peopleCards, ...starshipCards, ...filmCards];
    localStorage.setItem('allCards', JSON.stringify(allCards));
  };

  // Define the category based on certain rules
  const defineCategory = (id, section) => {
    if (section === "people" && id <= 20 || section === "starships" && id <= 17 || section === "films") {
      return 'Especial';
    } else {
      return 'Regular';
    }
  };

  useEffect(() => {
    // Fetch and store all cards when component mounts
    fetchAndStoreAllCards();
  }, []);

  // Generate 5 random cards from the stored data
  const generateRandomCards = () => {
    const allCards = JSON.parse(localStorage.getItem('allCards')) || [];
    const shuffled = allCards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const openPack = async (packId) => {
    if (packs.find(pack => pack.id === packId && !pack.locked && !pack.opened)) {
      setLoading(true);

      const newCards = generateRandomCards();
      console.log("hola",newCards)
      setCards(prevCards => [...prevCards, ...newCards]);
      localStorage.setItem('openedCards', JSON.stringify(newCards));
      handlePackClick(packId);
      setLoading(false);
    }
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
              <Card key={i} index={i} idCard={card.id} category={card.category} name={card.name} section={card.section} />
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default GetSheet;
