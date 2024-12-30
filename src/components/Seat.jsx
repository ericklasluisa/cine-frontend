/* eslint-disable react/prop-types */
const Seat = ({ id, status = "available", isSelected, isUserSelected, onClick }) => {
  const getClassName = () => {
    switch (status) {
      case "confirmed":
        return "text-red-600 pointer-events-none";
      case "occupied":
        return isUserSelected ? "text-blue-600 cursor-pointer" : "text-yellow-600 pointer-events-none";
      default:
        return isSelected
          ? "text-yellow-600 cursor-pointer"
          : "text-gray-600 hover:text-gray-400 cursor-pointer";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        className={`w-12 h-12 ${getClassName()}`}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={status === "available" || isUserSelected ? onClick : undefined}
      >
        <path d="M7 10V7a5 5 0 0110 0v3h1a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h1zm2-3a3 3 0 016 0v3H9V7zm-3 5v7h12v-7H6z" />
      </svg>
      <span className="text-sm mt-1">{id}</span>
    </div>
  );
};

export default Seat;
