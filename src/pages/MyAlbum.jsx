/* eslint-disable react/jsx-key */
import { useContext } from "react";
import Card from "../components/Cards"
import { AlbumContext } from "../context/AlbumContext";

const MyAlbum = () => {
  const { album } = useContext(AlbumContext);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {album.length === 0 && (<div><h1>No tienes láminas. Dirígete a la sección de Obtener Láminas</h1></div>)}
      {album.map(card => (
        <div>

        <Card/>
        </div>
      ))}
    </div>
  )
}

export default MyAlbum