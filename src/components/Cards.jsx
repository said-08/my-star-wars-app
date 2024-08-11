/* eslint-disable react/prop-types */
const Card = ({ title, description, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-1 hover:-translate-y-1">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;