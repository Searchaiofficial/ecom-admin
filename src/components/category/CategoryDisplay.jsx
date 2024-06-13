import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";

const CategoryDisplay = () => {
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${BASE_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategoryData(data))
      .catch((error) => console.error("Error fetching images data:", error));
  }, []);

  const handleDelete = (name) => {
    fetch(`${BASE_URL}/api/deleteCategory/${name}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setCategoryData(data))
      .catch((error) => console.error("Error deleting data:", error));

    window.location.reload();
  };

  const handleUpdate = (name) => {
    navigate(`/category-update/:${name}`)
  }

  return (
    <div className="mt-4 border-t border-red-400 py-4 mx-4">
      <div className="text-center mb-6">
        <h1 className="font-bold ">Create Category</h1>
        <span
          className="text-red-400  mt-1 hover:cursor-pointer"
          onClick={() => navigate("/create-category")}
        >
          Create New
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryData &&
          categoryData.map((item) => (
            <div
              key={item._id}
              className="p-4 relative border border-gray-200 rounded-md"
            >
              <h1 className="absolute top-0 left-0 bg-red-600 text-white p-1">{item.type}</h1>
              <div className="cursor-pointer ">
                {/* <Link href={`/roomPageData/${item._id}`}> */}
                <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="NA"
                      height={600}
                      width={600}
                      className={"aspect-square w-full object-cover "}
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full text-center">
                      No Image
                    </div>
                  )}
                </div>

                <div className={`bg-zinc-200 p-8`}>
                  <h1 className="text-black text-lg font-bold mb-">
                    {item.name}
                  </h1>
                  <p className="text-gray-900 mb-1">
                    {item?.description}
                  </p>
                  <h1 className=" text-red-500 mb-1">
                    ({item.subcategories.length} Subcategories)
                  </h1>
                  <div className="mt-2">
                    {item.subcategories.map((subCategory, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex  items-center gap-2">
                          <img
                            src={subCategory.img}
                            alt="NA"
                            height={100}
                            width={100}
                            className={"aspect-square w-12 h-12 object-cover "}
                          />
                          <p className="text-gray-500 text-sm font-bold">
                            {subCategory.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* </Link> */}
              </div>
              <button
                type="button"
                className="text-white w-full mt-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                onClick={() => handleDelete(item.name)}
              >
                Delete
              </button>
              <button
                type="button"
                className="text-white w-full mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                onClick={() => handleUpdate(item.name)}
              >
                Update
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
