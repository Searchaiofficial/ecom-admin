import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../config";
import { useState } from "react";

function CreateAuthor() {
  // form related
  const { register, handleSubmit, getValues, reset, control } = useForm();
  const [awards, SetAwards] = useState([{ name: "" }]);

  const addAwardInput = () => [SetAwards([...awards, { name: "" }])];

  const handleAwardChange = (index, field, value) => {
    const newService = [...awards];
    newService[index][field] = value;
    SetAwards(newService);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        const allAwards = [];

        awards.forEach((award) => {
          allAwards.push(award.name);
        });

        try {
          const response = await axios.post(`${BASE_URL}/api/createAuthor`, {
            // name: data.name,
            email: data.email,
            rating: data.rating,
            experience: data.experience,
            description: data.description,
            link: data.link,
            awards: allAwards,
          });
          const responseData = await response.data;
          window.alert(responseData.message);
          setLoading(false);
          // navigate("/admin");
        } catch (error) {
          console.error(error.message);
          window.alert(error.message);
          setLoading(false);
        }
      })}
    >
      {/* ➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡ ➡➡➡➡➡➡➡➡*/}

      <div className="space-y-12 bg-white p-6 md:p-12">
        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Create Author
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Author Name*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("name", {
                      required: "name is required",
                    })}
                    id="name"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div> */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="email"
                    {...register("email", {
                      required: "title is required",
                    })}
                    id="email"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("description", {
                      required: "title is required",
                    })}
                    id="description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("image", {
                      required: "image is required",
                    })}
                    id="image"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div> */}

            <div className="sm:col-span-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Rating*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="number"
                    {...register("rating", {
                      required: "rating is required",
                    })}
                    id="rating"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="experience"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Experience (in Year)*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="number"
                    {...register("experience", {
                      required: "experience is required",
                    })}
                    id="experience"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="link"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Link*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("link", {
                      required: "rating is required",
                    })}
                    id="link"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="block text-sm font-medium leading-6 text-gray-900 font-bold mt-10 mb-5">
              Awards
            </p>

            {/* Dynamic rendering of color inputs */}
            <div className="flex flex-wrap gap-4">
              {awards.map((service, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <p className="text-sm font-semibold">Award {index + 1}</p>
                  <input
                    type="text"
                    placeholder="Award name"
                    className="p-2 border"
                    value={service.name}
                    onChange={(e) =>
                      handleAwardChange(index, "name", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Button to add another color input */}
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg mt-5"
              onClick={addAwardInput}
            >
              Add Another
            </button>
          </div>
        </div>
      </div>

      <div className="mb-24 flex items-center justify-center md:justify-end gap-x-6 mr-10">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>

        <Button
          type="submit"
          className="rounded-md shadow-2xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          {loading ? "Creating Author..." : "Create Author"}
        </Button>
      </div>
    </form>
  );
}

export default CreateAuthor;
