import React, { useState } from "react";
import { BASE_URL } from "../../../config";

const UpdateProduct = ({ productId, toggleModal }) => {

  const demandType = [
    "Most Popular",
    "Most Rated",
    "Most Reviewed",
    "Most Viewed",
    "Lowest Price",
    "Special Price",
    "New Arrivals",
    "Ayatrio Member Favourite"
  ];

  const [showSuccess, setShowSuccess] = useState(false);
  const [demandTypeValue, setDemandTypeValue] = useState("");
  const handleDemandTypeChange = (e) => {
    const demandType = e.target.value;
    setDemandTypeValue(demandType);
  };

  const updateDemandType = () => {
    fetch(`${BASE_URL}/api/updateDemandType`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, demandtype: demandTypeValue }),
    })
      .then((response) => {
        response.json();
        setShowSuccess(true);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const [specialprice, setSpecialprice] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSpecialprice({ ...specialprice, [name]: value });
  };

  const updateSpecialPrice = () => {
    fetch(`${BASE_URL}/api/updateSpecialPrice`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, specialprice }),
    })
      .then((response) => {
        response.json();
        setShowSuccess(true);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="demandType"
                      className="mt-4 font-medium text-sm"
                    >
                      Demand Type :
                    </label>
                    <select
                      className="mt-4 bg-gray-200 text-gray-800 font-medium rounded-lg text-sm px-2 py-1"
                      name="demandType"
                      id="demandType"
                      onChange={handleDemandTypeChange}
                      value={demandTypeValue}
                    >
                      {demandType.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1"
                    onClick={updateDemandType}
                  >
                    Update Demand Type
                  </button>

                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="specialPrice"
                      className="mt-4 font-medium text-sm"
                    >
                      Special Price
                    </label>
                    <input
                      type="number"
                      className="mt-4 bg-gray-200 text-gray-800 font-medium rounded-lg text-sm px-2 py-1"
                      name="price"
                      id="specialPrice"
                      onChange={handleOnChange}
                    />

                    <label
                      htmlFor="startDate"
                      className="mt-4 font-medium text-sm"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="mt-4 bg-gray-200 text-gray-800 font-medium rounded-lg text-sm px-2 py-1"
                      name="startDate"
                      id="startDate"
                      onChange={handleOnChange}
                    />

                    

                    <button
                      type="button"
                      className="mt-4 ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1"
                      onClick={updateSpecialPrice}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center gap-16">
              <button
                type="button"
                onClick={() => {
                  setShowSuccess(false);
                  toggleModal();
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
              {showSuccess && (
                <p className="text-green-500">Data updated successfully</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
