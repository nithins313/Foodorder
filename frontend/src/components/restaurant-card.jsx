import React from "react";
import { useNavigate } from "react-router-dom";
const RestaurantCard = ({ resData }) => {
  const { name, rid } = resData;
  const navigate = useNavigate();

  const handle = () => {
    navigate(`/restaurant/${rid}`);
  };

  return (
    <div className="inline-block w-[250px] mx-2 my-1 items-center p-2 text-sm border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <button onClick={handle} className="w-full">
        <div className="relative mb-2">
          <img
            className="rounded-2xl w-full h-[200px] object-cover"
            src={`/image/${rid}/1.jpg`}
            alt="res-img"
          />
        </div>
        <h3 className="font-semibold text-lg truncate overflow-hidden whitespace-nowrap">
          {name}
        </h3>
      </button>
    </div>
  );
};
export default RestaurantCard;
