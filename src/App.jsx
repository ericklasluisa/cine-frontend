import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeliculasPage from "./pages/peliculasPage";
import ReservaPage from "./pages/reservaPage";
import { useState } from "react";

function App() {
  const [infoPelicula, setInfoPelicula] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PeliculasPage setInfoPelicula={setInfoPelicula} />}
        />
        <Route
          path="/reserva"
          element={<ReservaPage infoPelicula={infoPelicula} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
