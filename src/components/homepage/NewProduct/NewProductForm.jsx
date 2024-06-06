import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminNavbar from "../../AdminNavbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import axios from "axios";

function NewProductForm() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [mode, setMode] = useState("room");
  const [offerTypes, setOffertypes] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const [loading, setloading] = useState(false)

  const fetchOfferTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getAllOffers`);
      setOffertypes(response.data);
    } catch (error) {
      console.log("FETCH OFFER ERROR:", error);
    }
  };

  const fetchAllDifferentRoomTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getAllDifferentRoomTypes`);
      setRoomTypes(response.data);
    } catch (error) {
      console.log("FETCH ROOM TYPE ERROR:", error);
    }
  };

  useEffect(() => {
    fetchOfferTypes();
    fetchAllDifferentRoomTypes();
  }, []);

  const onSubmit = async (data) => {
    setloading(true)
    const formData = new FormData();

    try {
      formData.append("type", mode);
      if (mode === "room") {
        const fileInput = document.getElementById(`image`);
        const file = fileInput?.files[0];
        if (file) formData.append("image", file);
        formData.append("imgTitle", data.imgTitle);
        formData.append("offer", data.offer);
        formData.append("roomType", data.roomType);
        formData.append("description", data.Description);
        formData.append("mainHeading", data.mainHeading);
      } else {
        for (let i = 0; i < 5; i++) {
          const fileInput = document.getElementById(`image-${i}`);
          const file = fileInput?.files[0];
          if (file) formData.append(`image-${i}`, file);
          formData.append(`heading-${i}`, data[`heading-${i}`]);
          formData.append(`offer-${i}`, data[`offer-${i}`]);
        }
      }

      const response = await fetch(`${BASE_URL}/api/createnewProductSection`, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      window.alert(res.message);
      navigate("/homePage");
      setloading(false)
    } catch (error) {
      console.log("error saving image section", error);
      setloading(false)
    }
  };

  return (
    <>
      <AdminNavbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10"
      >
        <div className="mt-6">
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                value="room"
                checked={mode === "room"}
                onChange={() => setMode("room")}
              />
              <span className="ml-2">Room</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio"
                value="offer"
                checked={mode === "offer"}
                onChange={() => setMode("offer")}
              />
              <span className="ml-2">Offer</span>
            </label>
          </div>

          {mode === "room" ? (
            <>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image Source
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                  <input
                    type="file"
                    {...register("image", {
                      required: "Image is required",
                    })}
                    id="image"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>

              <label
                htmlFor="imgTitle"
                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
              >
                Image Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                  <input
                    type="text"
                    {...register("imgTitle", {
                      required: "Image title is required",
                    })}
                    id="imgTitle"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <label
                htmlFor="mainHeading"
                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
              >
                Main Heading
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                  <input
                    type="text"
                    {...register("mainHeading", {
                      required: "heading is required",
                    })}
                    id="mainHeading"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                  <input
                    type="text"
                    {...register("Description", {
                      required: "description is required",
                    })}
                    id="Description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>



              <div className="flex items-center gap-20 mt-2">
                <label className="text-gray-700">Offer Type:</label>
                <select
                  {...register("offer", {
                    required: "Offer is required",
                  })}
                  className="py-1 px-2 rounded-md bg-gray-100 min-w-[213px]"
                >
                  <option key={0} value="">
                    -----
                  </option>
                  {offerTypes.map((offer) => (
                    <option key={offer._id} value={offer.type}>
                      {offer.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-20 mt-2">
                <label className="text-gray-700">Room Type:</label>
                <select
                  {...register("roomType", {
                    required: "Room type is required",
                  })}
                  className="py-1 px-2 rounded-md bg-gray-100 min-w-[213px]"
                >
                  <option key={0} value="">
                    -----
                  </option>
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>

              <label
                htmlFor="mainHeading"
                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
              >
                Main Heading
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                  <input
                    type="text"
                    {...register("mainHeading", {
                      required: "heading is required",
                    })}
                    id="mainHeading"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                  <input
                    type="text"
                    {...register("Description", {
                      required: "description is required",
                    })}
                    id="Description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>



              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <label
                    htmlFor={`heading-${index}`}
                    className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                  >
                    Heading {index + 1}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                      <input
                        type="text"
                        {...register(`heading-${index}`, {
                          required: `Heading ${index + 1} is required`,
                        })}
                        id={`heading-${index}`}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-20 mt-2">
                    <label className="text-gray-700">Offer Type:</label>
                    <select
                      {...register(`offer-${index}`, {
                        required: "Offer is required",
                      })}
                      className="py-1 px-2 rounded-md bg-gray-100 min-w-[213px]"
                    >
                      <option key={0} value="">
                        -----
                      </option>
                      {offerTypes.map((offer) => (
                        <option key={offer._id} value={offer.type}>
                          {offer.type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label
                    htmlFor={`image-${index}`}
                    className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                  >
                    Image {index + 1}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                      <input
                        type="file"
                        {...register(`image-${index}`, {
                          required: `Image ${index + 1} is required`,
                        })}
                        id={`image-${index}`}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
          >
            {
              loading ? "Creating Image ..." : "Create Image"
            }
          </button>
        </div>
      </form>
    </>
  );
}

export default NewProductForm;
