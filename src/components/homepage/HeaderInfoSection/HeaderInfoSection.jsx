import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

const HeaderInfoSection = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/getHeaderInfoSection`)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (headerId) => {
    fetch(`${BASE_URL}/api/deleteHeaderInfoSection/${headerId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div className="border-t border-red-400 mt-5 py-6 mx-4">
      <div className="text-center">
        <h1 className="font-bold">Header Info Section</h1>
        <span
          className="text-blue-400 mb-6 mt-1 hover:cursor-pointer"
          onClick={() => navigate("/homePage/create-header-info-section")}
        >
          Create New
        </span>
      </div>
      <div className=" flex flex-wrap gap-x-6">
        {apiData &&
          apiData.map((item) => (
            <div key={item._id} style={{ marginBottom: "30px" }} className="w-full max-w-xs border-2 p-2">
              <h2 className="text-orange-500 text-xl my-2 font-bold">
                {item.title}
              </h2>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <p>
                <strong>Link:</strong> {item.link}
              </p>
              <img
                src={item.icon}
                className="w-20 h-20 object-cover rounded-full mt-2"
              />
              <button
                type="button"
                className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
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

export default HeaderInfoSection;
