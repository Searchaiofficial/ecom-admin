import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

function MapDetails() {
  const [mapData, setMapData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/mapPlaces`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMapData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (mapId) => {
    fetch(`${BASE_URL}/api/mapPlaces/${mapId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
      })
      .catch((error) => console.error("Error deleting data:", error));
  };
  return (
    <div className="my-10 mx-4 border-t border-red-400 pt-6">
      <div className="text-center mb-6">
        <h1 className="font-bold ">Map Details</h1>
        <span
          className="text-red-400  mt-1 hover:cursor-pointer"
          onClick={() => navigate("/homePage/create-map-section")}
        >
          Create New
        </span>
      </div>
      {mapData &&
        mapData.map((map, index) => (
          <div className="grid grid-cols-4 gap-4 my-4 border p-3" key={index}>
            <div className="flex gap-4 items-center">
              <img className="rounded-full aspect-square w-[50px]" src={map.profileImg} width={40} height={40}/>
              <div className="flex flex-col ">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Name:
                </label>
                <p className="mt-1 text-sm leading-5 text-gray-900">
                  {map.name}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Latitude:
              </label>
              <p className="mt-1 text-sm leading-5 text-gray-900">
                {map.geo_location.latitude}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Longitude:
              </label>
              <p className="mt-1 text-sm leading-5 text-gray-900">
                {map.geo_location.longitude}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Address:
              </label>
              <p className="mt-1 text-sm leading-5 text-gray-900">
                {map.address}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Phone:
              </label>
              <p className="mt-1 text-sm leading-5 text-gray-900">
                {map.phone}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Thumbnail:
              </label>
              <img
                src={map.thumbnail ? map.thumbnail : map.images[0]}
                alt="Thumbnail"
                className="mt-1 w-full h-32 object-cover"
              />
            </div>
            <div colSpan="2">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Images:
              </label>
              <div className="flex flex-wrap mt-1">
                {map.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-1/4 h-24 object-cover mr-2 mb-2"
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 w-[60px]"
              onClick={() => handleDelete(map._id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default MapDetails;
