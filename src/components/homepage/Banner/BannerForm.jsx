import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminNavbar from "../../AdminNavbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import axios from "axios";

const BannerForm = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState([]);


  const fetchAllDifferentRoomTypes = async () => {
    try {
      const responce = await axios.get(`${BASE_URL}/api/getAllDifferentRoomTypes`);
      setRoomTypes(responce.data);
    } catch (error) {
      console.log("FETCH ROOM TYPE ERROR :", error);
    }
  };


  useEffect(() => {
    fetchAllDifferentRoomTypes()
  }, []);



  const onSubmit = async (data) => {
    const formData = new FormData();

    try {
      // image
      // const fileInput = document.getElementById(`image`);
      // const file = fileInput?.files[0];
      // formData.append(`image`, file);
      // formData.append(`buttonText`, data.buttonText);
      // formData.append("link", data.link);
      // formData.append("imgTitle", data.imgTitle);

      formData.append("text", data.text);
      formData.append("roomType", data.roomType);
      formData.append("mainHeading", data.mainHeading)
      formData.append("description", data.description)

      const response = await fetch(`${BASE_URL}/api/createBannerSection`, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      window.alert(res.message);
      // navigate("/homePage");
    } catch (error) {
      console.log("error saving image section", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10"
      >
        {/* <div className="mt-6">
          <label
            htmlFor="image"
            className="block text-sm  leading-6 text-gray-900 font-bold"
          >
            Image Source
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
              <input
                type="file"
                {...register("image", {
                  required: "name is required",
                })}
                id="image"
                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                accept="image/*"
              />
            </div>
          </div>

          <label
            htmlFor={`imgTitle`}
            className="block text-sm font-medium leading-5 text-gray-700 mt-4"
          >
            Image heading
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
              <input
                type="text"
                {...register("imgTitle", {
                  required: "imgTitle is required",
                })}
                id="imgTitle"
                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <label
            htmlFor={`buttonText`}
            className="block text-sm font-medium leading-5 text-gray-700 mt-4"
          >
            Button Text
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
              <input
                type="text"
                {...register("buttonText", {
                  required: "buttonText is required",
                })}
                id="buttonText"
                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div> */}
        <label
          htmlFor={`mainHeading`}
          className="block text-sm font-medium leading-5 text-gray-700 mt-4"
        >
          Main Heading
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
            <input
              type="text"
              {...register("mainHeading", {
                required: "mainHeading is required",
              })}
              id="mainHeading"
              className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <label
          htmlFor={`description`}
          className="block text-sm font-medium leading-5 text-gray-700 mt-4"
        >
          Description
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
            <input
              type="text"
              {...register("description", {
                required: "description is required",
              })}
              id="description"
              className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <label
          htmlFor={`text`}
          className="block text-sm font-medium leading-5 text-gray-700 mt-4"
        >
          Text
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
            <input
              type="text"
              {...register("text", {
                required: "text is required",
              })}
              id="text"
              className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center gap-20 mt-2">
          <label className=" text-gray-700">Room Type:</label>
          <select
            {...register("roomType", {
              required: "roomType is required",
            })}
            className="py-1 px-2 rounded-md bg-gray-100 min-w-[213px]"
          >
            <option key={0} value="">
              -----
            </option>
            {roomTypes &&
              roomTypes.map((type) => (
                <option key={roomTypes._id} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
          >
            Create Image
          </button>
        </div>
      </form>
    </>
  );
};

export default BannerForm;
