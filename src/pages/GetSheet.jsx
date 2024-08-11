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

  const openPack = async (packId) => {
    if (packs.find(pack => pack.id === packId && !pack.locked && !pack.opened)) {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      const newCards = data.results.map(card => {
        const idFixed = card.url.split('/').filter(Boolean).pop();
        return { id: idFixed, name: card.name };
      });

      const updatedCards = [...cards, ...newCards];
      setCards(updatedCards);
      localStorage.setItem('openedCards', JSON.stringify(updatedCards))
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
      <h2 className="text-2xl mb-4">Sobres Disponibles</h2>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {packs.map(pack => (
          <Envelope
          key={pack.id}
          id={pack.id}
          onClick={openPack}
          disabled={pack.locked || pack.opened}
          isOpen={pack.opened}
        />
          // <button
            // key={pack.id}
            // onClick={() => openPack(pack.id)}
            // disabled={pack.locked || pack.opened}
            // className={`p-4 rounded-lg ${pack.locked ? 'bg-gray-400' : 'bg-blue-500'}`}
          // >
          //{pack.opened ? 'Abierto' : `Sobre ${pack.id}`} 
          //</button> 
        ))}
      </div>
      {timer && <p className="mt-4">Los sobres restantes estarán disponibles en: {timer} segundos</p>}

      <div className="mt-8">
        <h3 className="text-xl mb-4">Láminas Obtenidas</h3>
        {loading ? <p>Cargando láminas...</p> :
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card,i) => (
              <Card idCard={card.id} category={"Espcial"} name={card.name} />
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default GetSheet;
