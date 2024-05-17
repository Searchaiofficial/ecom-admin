import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

const Banner = () => {
  const [galleryData, setGalleryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/getBannerSection`)
      .then((response) => response.json())
      .then((data) => setGalleryData(data))
      .catch((error) => console.error("Error fetching images data:", error));
  }, []);

  const handleDelete = (imgId) => {
    fetch(`${BASE_URL}/api/deleteBannerSection/${imgId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setGalleryData(data))
      .catch((error) => console.error("Error deleting data:", error));
  };
  return (
    <>
      <div className="mt-4 border-t border-red-400 py-4 mx-4">
        <div className="text-center mb-6">
          <h1 className="font-bold ">Banner Section</h1>
          <span
            className="text-red-400  mt-1 hover:cursor-pointer"
            onClick={() => navigate("/homePage/create-banner-section")}
          >
            Create New
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryData &&
            galleryData.map((item) => (
              <div
                key={item._id}
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="relative">
                  <div className="absolute top-10 z-10 p-4 text-black">
                    <h1 className="mb-2 mt-1 text-2xl">{item.room.roomType}</h1>
                    <p className="mb-2 mt-1 text-sm">{item.text}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
