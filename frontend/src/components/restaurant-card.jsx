import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ resData }) => {
  const { name, rid } = resData;
  const navigate = useNavigate();

  const handle = () => {
    navigate(`/restaurant/${rid}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <button onClick={handle} className="w-full">
        <div className="relative">
          <img
            className="rounded-t-lg w-full h-[200px] object-cover"
            src={`/image/${rid}/1.jpg`}
            alt={`${name}`}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
        </div>
      </button>
    </div>
  );
};

export default RestaurantCard;
