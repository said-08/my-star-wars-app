import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Cards";

const Section = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const defineCategory = (id, section) => {
    if (section === "people" && id <= 20 || section === "starships" && id <= 17 || section === "films") {
      return 'Especial'
    } else {
      return 'Regular'
    }
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/${section}/?page=${page}`);
      const data = await response.json();
      const fetchedCards = data.results.map(item => ({
        id: item.url.split('/').filter(Boolean).pop(),
        name: item.name || item.title,
        section: section === 'people' ? 'Personaje' : section === 'starships' ? 'Naves' : 'Peliculas',
        category: defineCategory(item.url.split('/').filter(Boolean).pop(), section)
      }));
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [section, page]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">{section === 'people' ? 'Personajes' : section === 'starships' ? 'Naves' : 'Películas'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          cards.map(card => (
            <Card
              key={card.id}
              idCard={card.id}
              name={card.name}
              section={card.section}
              category={card.category}
              inPage={true}
              locked={true}
            />
          ))
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Siguiente
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => navigate(`/`)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Volver al Álbum
        </button>
      </div>
    </div>
  );
}

export default Section
