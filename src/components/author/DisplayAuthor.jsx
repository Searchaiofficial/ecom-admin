import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
import axios from "axios";

const AuthorDisplay = () => {
  const [authorData, setAuthorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/getAuthors`)
      .then((response) => response.json())
      .then((data) => setAuthorData(data))
      .catch((error) => console.error("Error fetching author data:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/deleteAuthor/${id}`);
      window.location.reload();
    } catch (error) {
      console.log("Error deleteing author", error);
    }
  };

  return (
    <div className="mt-4 border-t border-red-400 py-4 mx-4">
      <div className="text-center mb-6">
        <h1 className="font-bold ">Create Author</h1>
        <span
          className="text-red-400  mt-1 hover:cursor-pointer"
          onClick={() => navigate("/create-author")}
        >
          Create Author
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {authorData &&
          authorData.map((item) => (
            <div
              key={item._id}
              className="p-4 relative border border-gray-200 rounded-md"
            >
              <div className="cursor-pointer w-full">
                <div className="flex row gap-4 items-center w-full">
                  <img src={item.image} width={60} height={60} alt="image" />
                  <div className="flex flex-col">
                    <h1 className="text-black text-lg font-bold ">
                      {item.name}
                    </h1>
                    <h1 className="text-black ">{item.email}</h1>
                  </div>
                </div>

                <div className={`bg-zinc-200 mt-2 p-8`}>
                  <p className="text-gray-900 mb-1">
                    Description : {item.description}
                  </p>
                  <p className="text-gray-900 mb-1">Rating : {item.rating}</p>
                  <p className="text-gray-900 mb-1">
                    Experience : {item?.experience}
                  </p>
                  {
                    item.awards.length > 0 && (
                      <p className="text-gray-900 mb-1">
                        Awards : {item.awards.map((award) => award).join(", ")}
                      </p>
                    )
                  }
                  <p className="text-gray-900 mb-1">link : <a href={item.link} target="/blank" className="underline text-blue-400">click</a></p>
                </div>
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

export default AuthorDisplay;
