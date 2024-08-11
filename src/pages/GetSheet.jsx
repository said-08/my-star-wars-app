import { useContext, useState } from 'react';
import { AlbumContext } from '../context/AlbumContext';

const GetSheet = () => {
  const { packs, timer, handlePackClick, addToAlbum, album } = useContext(AlbumContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const openPack = async (packId) => {
    if (packs.find(pack => pack.id === packId && !pack.locked && !pack.opened)) {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      console.log(data.results,"Perara")
      setCards(data.results);
      handlePackClick(packId);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Sobres Disponibles</h2>
      <div className="grid grid-cols-2 gap-4">
        {packs.map(pack => (
          <button
            key={pack.id}
            onClick={() => openPack(pack.id)}
            disabled={pack.locked || pack.opened}
            className={`p-4 rounded-lg ${pack.locked ? 'bg-gray-400' : 'bg-blue-500'}`}
          >
            {pack.opened ? 'Abierto' : `Sobre ${pack.id}`}
          </button>
        ))}
      </div>
      {timer && <p className="mt-4">Los sobres restantes estarán disponibles en: {timer} segundos</p>}

      <div className="mt-8">
        <h3 className="text-xl mb-4">Láminas Obtenidas</h3>
        {loading ? <p>Cargando láminas...</p> :
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card,i) => {
              const idFixed = card.url.split('/').filter(Boolean).pop();
              return(
              <div key={i} className="border p-4 rounded-lg">
                <p>Lámina #{idFixed}</p>
                <button
                  onClick={() => addToAlbum(card.id)}
                  className="mt-2 bg-green-500 text-white p-2 rounded"
                >
                  {album.includes(card.id) ? 'Descartar' : 'Agregar al álbum'}
                </button>
              </div>
            )})}
          </div>
        }
      </div>
    </div>
  );
}

export default GetSheet