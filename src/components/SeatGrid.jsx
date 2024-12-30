/* eslint-disable react/prop-types */
import Seat from "./Seat";
const SeatGrid = ({
  filas,
  columnas,
  asientos,
  asientosSeleccionados,
  onSeatClick,
}) => {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))`,
      }}
    >
      {asientos.map((asiento) => (
        <Seat
          key={asiento.id}
          id={asiento.id}
          status={asiento.status}
          isSelected={asientosSeleccionados.includes(asiento.id)}
          isUserSelected={asientosSeleccionados.includes(asiento.id)}
          onClick={() => onSeatClick(asiento.id)}
        />
      ))}
    </div>
  );
};

export default SeatGrid;
