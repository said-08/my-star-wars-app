/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Card from "../components/Cards";
import { AlbumContext } from "../context/AlbumContext";
import { useNavigate } from "react-router-dom";

const MyAlbum = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const { album, fetchAllAvailableCards, allAvailableCards } = useContext(AlbumContext);
  const [selectedFilter, setSelectedFilter] = useState(''); // Default filter value
  const [filteredCards, setFilteredCards] = useState([]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const result = await response.json();
      setData(prevData => [...prevData, ...result.results]);
      setHasNextPage(result.next !== null);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchData(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFilter) {
        const cards = await fetchAllAvailableCards(selectedFilter);
        setFilteredCards(cards);
      }
    };
    fetchData();
  }, [selectedFilter, fetchAllAvailableCards]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filtrar por sección:</label>
        <select
          id="filter"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Selecciona una sección</option>
          <option value="people">Personajes</option>
          <option value="starships">Naves</option>
          <option value="films">Películas</option>
        </select>
      </div>

      <div className="mt-8 mb-8 relative gap-15 flex justify-center">
        <button
          onClick={() => navigate('/section/people')}
          className="bg-[#5f2160]  text-white p-2 rounded rounded-t-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-row gap-2 ">
            Ver Personajes
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </button>
        <button
          onClick={() => navigate('/section/starships')}
          className="bg-[#5f2160]  text-white p-2 rounded ml-2 rounded-t-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-row gap-2 ">
            Ver Naves
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
        </button>
        <button
          onClick={() => navigate('/section/films')}
          className="bg-[#5f2160]  text-white p-2 rounded ml-2 rounded-t-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-row gap-2 ">
            Ver Películas
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
            </svg>
          </div>
        </button>
        <div className="absolute bg-[#5f2160] h-[2px] w-full bottom-0"></div>
      </div>

      {/* Mostrar tarjetas filtradas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCards.length === 0 && selectedFilter && (
          <div><h1>No hay láminas en esta sección.</h1></div>
        )}
        {filteredCards.map(card => (
          <Card
            key={card.id}
            idCard={card.id}
            category={card.category}
            name={card.name}
            section={card.section}
          />
        ))}
      </div>

      
    </div>
  );
};

export default MyAlbum;
