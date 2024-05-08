import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";

const RoomDisplay = () => {
  const [roomPageData, setRoomPageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/getAllRoommain`)
      .then((response) => response.json())
      .then((data) =>  setRoomPageData(data))
      .catch((error) => console.error("Error fetching images data:", error));
  }, []);

  const handleDelete = (roomPageID) => {
    fetch(`${BASE_URL}/api/deleteRoommain/${roomPageID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setRoomPageData(data))
      .catch((error) => console.error("Error deleting data:", error));
      
    window.location.reload();
  };

  return (
    <div className="mt-4 border-t border-red-400 py-4 mx-4">
      <div className="text-center mb-6">
        <h1 className="font-bold ">New Room Page</h1>
        <span
          className="text-red-400  mt-1 hover:cursor-pointer"
          onClick={() => navigate("/create-room-page")}
        >
          Create New
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {roomPageData &&
          roomPageData.map((item) => (
            <div
              key={item._id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <div className="cursor-pointer ">
                {/* <Link href={`/roomPageData/${item._id}`}> */}
                  <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
                    <img
                      src={item.img}
                      alt="NA"
                      height={600}
                      width={600}
                      className={"aspect-square w-full object-cover "}
                    />
                  </div>

                  <div className={`bg-zinc-200 p-8 h-[220px] overflow-hidden`}>
                    <h1 className="text-sm text-gray-500 mb-1">
                      Room Type : {item.roomType}
                    </h1>
                    <div className="text-lg font-semibold hover:underline  text-ellipsis mb-1">
                      {item.title}
                    </div>
                    <div className={`text-sm overflow-hidden text-ellipsis `}>
                      {item.description}
                    </div>
                  </div>
                {/* </Link> */}
              </div>
              <button
                type="button"
                className="text-white w-full mt-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomDisplay;
