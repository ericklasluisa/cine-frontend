import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function PeliculaCard({ id, title, imgUrl, sala, setInfoPelicula }) {
  const navigate = useNavigate();

  const handleClick = () => {
    setInfoPelicula({ id, title, sala });
    navigate("/reserva");
  };

  return (
    <div
      className="bg-gray-700 text-white p-4 rounded-lg cursor-pointer hover:bg-gray-600 w-64 h-64"
      onClick={handleClick}
    >
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-32 object-cover rounded-md"
      />
      <h2 className="mt-2 text-xl font-bold">{title}</h2>
      <p className="mt-1">Sala: {sala}</p>
    </div>
  );
}

PeliculaCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  sala: PropTypes.number.isRequired,
  setInfoPelicula: PropTypes.func.isRequired,
};

export default PeliculaCard;
