/* eslint-disable react/prop-types */
import cerrado from "../assets/starwarsSobre.png"
import abierto from "../assets/starwarsSobre2.png"

const Envelope = ({ id, onClick, disabled, isOpen }) => {

  const handleClick = () => {
    if (!disabled && !isOpen) {
      onClick(id);
    }
  };

  return (
    <div
      className={`relative w-56 h-56 perspective-1000 cursor-pointer ${disabled ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <img
        src={isOpen ? abierto : cerrado}
        alt={`Pack ${id}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center text-xl justify-center text-yellow-200 font-bold">
        {isOpen ? "Abierto" : `Lamina # ${id}`}
      </div>
    </div>
  );
};

export default Envelope
