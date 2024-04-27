import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AdminNavbar from "../../AdminNavbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

function NewProductForm() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [mode, setMode] = useState("normal");

  const onSubmit = async (data) => {
    const formData = new FormData();

    try {
      formData.append("type", mode);
      if (mode === "normal") {
        const fileInput = document.getElementById(`image`);
        const file = fileInput?.files[0];
        formData.append(`image`, file);
        formData.append("imgTitle", data.imgTitle);
        formData.append("btnTitle", data.btnTitle);
      } else {
        for (let i = 0; i < 5; i++) {
          const fileInput = document.getElementById(`image-${i}`);
          const file = fileInput?.files[0];
          formData.append(`image`, file);
          formData.append(`heading${i}`, data[`heading-${i}`]);
          formData.append(`buttonText${i}`, data[`buttonText-${i}`]);
        }
      }
      const response = await fetch(`${BASE_URL}/api/createnewProductSection`, {
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
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                value="normal"
                checked={mode === "normal"}
                onChange={() => setMode("normal")}
              />
              <span className="ml-2">Normal</span>
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

          {mode === "normal" ? (
            <>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
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
                Image Title
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
                htmlFor={`btnTitle`}
                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
              >
                Button Text
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("btnTitle", {
                      required: "btnTitle is required",
                    })}
                    id="btnTitle"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <label
                    htmlFor={`heading-${index}`}
                    className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                  >
                    Heading {index + 1}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
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

                  <label
                    htmlFor={`buttonText-${index}`}
                    className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                  >
                    Button Text {index + 1}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(`buttonText-${index}`, {
                          required: `Button Text ${index + 1} is required`,
                        })}
                        id={`buttonText-${index}`}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <label
                    htmlFor={`image-${index}`}
                    className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                  >
                    Image {index + 1}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
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
            Create Image
          </button>
        </div>
      </form>
    </>
  );
}

export default NewProductForm;
