import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

export const useSocket = (movieId) => {
  const [socket, setSocket] = useState(null);
  const [asientos, setAsientos] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socketInstance = io(SERVER_URL);

    socketInstance.on("connect", () => {
      console.log("Conectado al servidor de WebSocket");
      setIsConnected(true);
      setError(null);
      if (movieId) {
        socketInstance.emit("obtenerAsientosPorPelicula", { movieId });
      }
    });

    socketInstance.on("asientos", (seats) => {
      setAsientos(seats || []); // Aseguramos que siempre sea un array
    });

    socketInstance.on("error", (error) => {
      console.error("Error del servidor:", error);
      setError(error.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off("connect");
      socketInstance.off("asientos");
      socketInstance.off("error");
      socketInstance.disconnect();
    };
  }, [movieId]);

  return {
    socket,
    asientos,
    isConnected,
    error,
  };
};
