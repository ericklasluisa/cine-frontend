/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SeatGrid from "../components/SeatGrid";
import { useSocket } from "../hooks/useSocket";
import { api } from "../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const ReservaPage = ({ infoPelicula }) => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const movieId = infoPelicula.id;

  // const { id: movieId, title, sala } = location.state;
  const { socket, asientos, isConnected, error } = useSocket(movieId);
  const [asientosConfirmados, setAsientosConfirmados] = useState([]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [nombreSala, setNombreSala] = useState("");

  useEffect(() => {
    if (asientos && asientos.length > 0) {
      const confirmados = asientos
        .filter((asiento) => asiento.status === "confirmed")
        .map((asiento) => asiento.id);
      setAsientosConfirmados(confirmados);
    }
  }, [asientos]);

  useEffect(() => {
    const fetchSalaInfo = async () => {
      try {
        const response = await api.get(`/sala/${infoPelicula.sala}`);
        setRows(response.data.rows);
        setColumns(response.data.columns);
        setNombreSala(response.data.name);
      } catch (error) {
        console.error("Error al obtener información de la sala:", error);
      }
    };

    fetchSalaInfo();
  }, [infoPelicula.sala]);

  const handleSeatClick = (seatId) => {
    if (!socket || !isConnected) return;
    if (asientosConfirmados.includes(seatId)) return;

    setAsientosSeleccionados((prev) => {
      if (prev.includes(seatId)) {
        socket.emit("desbloquearAsiento", { seatId, movieId });
        return prev.filter((id) => id !== seatId);
      } else {
        socket.emit("seleccionarAsiento", { seatId, movieId });
        return [...prev, seatId];
      }
    });
  };

  const handleConfirmClick = () => {
    if (!socket || !isConnected) return;

    socket.emit("confirmarAsientos", {
      seatIds: asientosSeleccionados,
      movieId,
    });
    MySwal.fire({
      title: "Asientos confirmados",
      html: `Asientos seleccionados: ${asientosSeleccionados
        .map((id) => id)
        .join(", ")}`,
      icon: "success",
    }).then(() => {
      setAsientosSeleccionados([]);
      navigate("/");
    });
    setAsientosSeleccionados([]);
  };

  if (error) {
    return (
      <div className="bg-gray-800 min-h-screen text-white p-4">
        <Navbar />
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-gray-800 min-h-screen text-white p-4">
        <Navbar />
        <div>Conectando al servidor...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      <Navbar />
      <h1 className="text-2xl font-bold">Reserva de Asientos</h1>
      <div className="my-4 flex items-center justify-around w-full">
        <h2 className="text-xl font-bold mt-4">{infoPelicula.title}</h2>
        <p className="mt-1">Sala: {nombreSala}</p>
      </div>
      <div className="mt-4">
        <div className="bg-gray-700 text-center p-2 rounded-md mb-4">
          Pantalla
        </div>
        {rows > 0 && columns > 0 && (
          <SeatGrid
            movieId={movieId}
            filas={rows}
            columnas={columns}
            asientos={asientos}
            asientosConfirmados={asientosConfirmados}
            asientosSeleccionados={asientosSeleccionados}
            onSeatClick={handleSeatClick}
          />
        )}
        {asientosSeleccionados.length > 0 && (
          <div className="mt-4 flex items-center">
            <button
              className="bg-green-600 text-white p-2 rounded-md mr-4"
              onClick={handleConfirmClick}
            >
              Confirmar
            </button>
            <span>
              Asientos seleccionados:{" "}
              {asientosSeleccionados.map((id) => id).join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservaPage;
