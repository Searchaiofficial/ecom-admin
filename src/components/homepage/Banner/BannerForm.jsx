import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminNavbar from "../../AdminNavbar";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import axios from "axios";

const BannerForm = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  // const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
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
      formData.append("roomId", data.roomId);
      formData.append("mainHeading", data.mainHeading);
      formData.append("description", data.description);

      const response = await fetch(`${BASE_URL}/api/createBannerSection`, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      window.alert(res.message);
      setLoading(false);
      // navigate("/homePage");
    } catch (error) {
      console.log("error saving image section", error);
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10"
      >
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
        <label
          htmlFor={`roomId`}
          className="block text-sm font-medium leading-5 text-gray-700 mt-4"
        >
          Room ID
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
            <input
              type="text"
              {...register("roomId", {
                required: "room is required",
              })}
              id="roomId"
              className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
          >
            {loading ? "Creating Image ..." : "Create Image"}
          </button>
        </div>
      </form>
    </>
  );
};

export default BannerForm;
