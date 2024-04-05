import React from "react";
import { useForm, Controller } from "react-hook-form";
import AdminNavbar from "../../AdminNavbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

function TeamMemebersForm() {
  const { handleSubmit, control, register } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    try {
      // image
      const fileInput = document.getElementById(`image`);
      const file = fileInput?.files[0];
      formData.append(`image`, file);

      formData.append(`name`, data.name);
      formData.append(`icon`, data.icon);
      formData.append(`role`, data.role);
      formData.append(`linkedin`, data.linkedin);

      const response = await fetch(`${BASE_URL}/api/createProfileContent`, {
        method: "POST",
        headers: {},
        body: formData,
      });

      const res = await response.json();

      window.alert(res.message);
      navigate("/homePage");
    } catch (error) {
      console.log(error);
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
            htmlFor={`name`}
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Name
          </label>
          <Controller
            name={`name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
            )}
          />

          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
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
            htmlFor={`icon`}
            className="block text-sm font-medium leading-5 text-gray-700 mt-4"
          >
            Icon
          </label>
          <Controller
            name={`icon`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
            )}
          />

          <label
            htmlFor={`role`}
            className="block text-sm font-medium leading-5 text-gray-700 mt-4"
          >
            Role
          </label>
          <Controller
            name={`role`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
            )}
          />

          <label
            htmlFor={`linkedin`}
            className="block text-sm font-medium leading-5 text-gray-700 mt-4"
          >
            LinkedIn Profile
          </label>
          <Controller
            name={`linkedin`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
            )}
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
          >
            Create Team Member
          </button>
        </div>
      </form>
    </>
  );
}

export default TeamMemebersForm;
