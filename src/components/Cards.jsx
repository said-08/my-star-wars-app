/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AlbumContext } from "../context/AlbumContext";

/* eslint-disable react/prop-types */
const Card = ({ locked, name, category, idCard, section, inPage, onCardAction }) => {
  const { addToAlbum, album } = useContext(AlbumContext);

  const handleAddToAlbum = () => {
    const card = {
      id: idCard,
      name: name,
      category: category,
      section: section
    };
    addToAlbum(card);

    if (onCardAction) {
      onCardAction(idCard);
    }
  };
  
  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg ${category === "Especial" ? "bg-[#efb810] transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-1 hover:-translate-y-1" : "bg-blue-500"}
     ${locked && "opacity-30 bg-gray-500"} `}>
      <div className="px-6 py-4">
        <div className="w-full flex justify-center bg-slate-600 rounded">
          <p className="text-gray-50 text-sm">Lamina # {idCard} de la sección: <span className="text-lg font-semibold">{section}</span></p>
        </div>
        <p className="text-gray-900 my-4 text-2xl font-extrabold text-center">{name}</p>
        <p className="text-gray-700 text-base flex gap-1"><span className="font-bold underline">Categoría:</span > <div className={`${category === "Especial" ? "bg-[#d3a334]" :  'bg-blue-900'} text-center text-yellow-50 w-[23%] rounded`}>{category}</div></p>
        {!inPage &&
          <button
            onClick={handleAddToAlbum}
            className="mt-2 bg-green-500 text-white p-2 rounded"
          >
            {album.some(item => item.id === idCard) ? 'Descartar' : 'Agregar al álbum'}
          </button>
        }
      </div>
    </div>
  );
};

export default Card;