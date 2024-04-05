import React from "react";
import { useForm } from "react-hook-form";
import AdminNavbar from "../../AdminNavbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

const BannerForm = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();

    try {
      // image
      const fileInput = document.getElementById(`image`);
      const file = fileInput?.files[0];
      formData.append(`image`, file);
      formData.append(`buttonText`, data.buttonText);
      formData.append("link", data.link);
      formData.append("imgTitle", data.imgTitle);

      const response = await fetch(`${BASE_URL}/api/createBannerSection`, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      window.alert(res.message);
      navigate("/homePage");
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
        <div className="mt-6">
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
        </div>

        <label
          htmlFor={`link`}
          className="block text-sm font-medium leading-5 text-gray-700 mt-4"
        >
          Button link
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
            <input
              type="text"
              {...register("link", {
                required: "link is required",
              })}
              id="link"
              className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
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
