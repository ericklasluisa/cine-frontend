/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PeliculaCard from "../components/PeliculaCard";
import { api } from "../api";

function PeliculasPage({ setInfoPelicula }) {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    api.get("/peliculas").then((response) => {
      setPeliculas(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <Header />
      <div className="p-4 flex flex-wrap justify-center gap-10">
        {peliculas.map((pelicula) => (
          <PeliculaCard
            key={pelicula.id}
            id={pelicula.id}
            title={pelicula.title}
            imgUrl={pelicula.imgUrl}
            sala={pelicula.roomId}
            setInfoPelicula={setInfoPelicula}
          />
        ))}
      </div>
    </div>
  );
}

export default PeliculasPage;
