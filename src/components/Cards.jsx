import { useContext } from "react";
import { AlbumContext } from "../context/AlbumContext";

/* eslint-disable react/prop-types */
const Card = ({ name, category, idCard }) => {
  const { addToAlbum, album } = useContext(AlbumContext);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-1 hover:-translate-y-1">
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">Lamina # {idCard}</p>
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">Categoría: {category}</p>
        <p className="text-gray-700 text-base">Sección: Seccion</p>
        <button
          onClick={() => addToAlbum(idCard)}
          className="mt-2 bg-green-500 text-white p-2 rounded"
        >
          {album.includes(idCard) ? 'Descartar' : 'Agregar al álbum'}
        </button>
      </div>
    </div>
  );
};

export default Card;