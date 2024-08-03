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
      formData.append(`email`, data.email);

      const response = await fetch(`${BASE_URL}/api/createProfileContent`, {
        method: "POST",
        headers: {},
        body: formData,
      });

      const res = await response.json();

      window.alert(res.message);
      navigate("/update-home-page/team-memebers");
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
            Email
          </label>
          <Controller
            name={`email`}
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
