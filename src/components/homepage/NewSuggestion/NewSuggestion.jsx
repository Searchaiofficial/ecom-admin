import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

const NewSuggestion = () => {
  const [suggestionData, setSuggestionData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/fetchAllSuggestions`)
      .then((response) => response.json())
      .then((data) => setSuggestionData(data))
      .catch((error) => console.error("Error fetching images data:", error));
  }, []);

  const handleDelete = (suggestionId) => {
    fetch(`${BASE_URL}/api/deleteSuggestion/${suggestionId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setSuggestionData(data))
      .catch((error) => console.error("Error deleting data:", error))
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <div className="mt-4 border-t border-red-400 py-4 mx-4">
      <div className="text-center mb-6">
        <h1 className="font-bold ">New Suggestion</h1>
        <span
          className="text-red-400  mt-1 hover:cursor-pointer"
          onClick={() =>
            navigate("/update-home-page/create-new-suggestion-section")
          }
        >
          Create New
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {suggestionData &&
          suggestionData.map((item) => (
            <div
              key={item._id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <div className="cursor-pointer ">
                <Link href={`/suggestion/${item._id}`}>
                  <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
                    <img
                      src={item.suggestionCardImage}
                      alt="NA"
                      height={600}
                      width={600}
                      className={"aspect-square w-full object-cover "}
                    />
                  </div>

                  <div className={`bg-zinc-200 p-8 h-[220px] overflow-hidden`}>
                    <div className="text-lg font-semibold hover:underline  text-ellipsis mb-1">
                      {item.heading}
                    </div>
                    <div className={`text-sm overflow-hidden text-ellipsis `}>
                      {item.shortSummary}
                    </div>
                  </div>
                </Link>
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

export default NewSuggestion;
