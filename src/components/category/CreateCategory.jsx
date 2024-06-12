import { useForm, useFieldArray,  } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../config";

function CreateCategory() {
  // form related
  const categoryType = ["Homedecor", "Walldecor", "Flooring"]
  const { register, handleSubmit, getValues, reset, control } = useForm();

  const {
    fields: subCategories,
    append: appendSubCategory,
    remove: removeSubCategory,
  } = useFieldArray({
    control,
    name: "subCategories",
  });

  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData();

        const subCategoryData = getValues("subCategories");
        subCategoryData.forEach((subCategory, index) => {
          formData.append(`subcategories[${index}][name]`, subCategory?.name);
        });

        formData.append("name", data.name);

        const fileInput = document.getElementById(`image`);
        const file = fileInput?.files[0];
        formData.append(`image`, file);

        const maintenanceDetails = document.getElementById(`maintenanceDetails`);
        const maintenanceDetailsFile = maintenanceDetails?.files[0];
        formData.append(`maintenanceDetails`, maintenanceDetailsFile);
        console.log("maintenanceDetailsFile", maintenanceDetailsFile)

        const certification = document.getElementById(`certification`);
        const certificationFile = certification?.files[0];
        formData.append(`certification`, certificationFile);

        for(var i=0; i<subCategoryData.length; i++) {
          const fileInput = document.getElementById(`subCategoriesImage${i + 1}`);
          const file = fileInput?.files[0];
          formData.append(`subCategoriesImage`, file);
        }

        formData.append("type", data.type);
        formData.append("description", data.description);
        // --------- 💥 api call 💥 -------
        try {
          const response = await fetch(`${BASE_URL}/api/createCategory`, {
            method: 'POST',
            headers: {
            },
            body: formData,
        });
          const responseData = await response.json();
          window.alert(responseData.message);
          // navigate("/admin");
        } catch (error) {
          console.error("Error uploading images:", error);
        }

        // reset();
        // setSelectedColors([]);
        // setSelectedPurchaseMode([]);
      })}
    >
      {/* ➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡ ➡➡➡➡➡➡➡➡*/}

      <div className="space-y-12 bg-white p-6 md:p-12">
        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Create Category
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category Name*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("name", {
                      required: "title is required",
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Category Image*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("image", {
                      required: "description is required",
                    })}
                    id="image"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Category Type*
              </label>
              <div className="mt-2">
                <select
                  {...register("type", {
                    required: "type is required",
                  })}
                  id="type"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                >
                  {categoryType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              </div>
          </div>

          <div className="mt-10">
            <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
              Description
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                <textarea
                  {...register("description", {
                    required: "description is required",
                  })}
                  id="description"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="maintenanceDetails"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Maintenance Details*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("maintenanceDetails")}
                    id="maintenanceDetails"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="certification"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Certification Details*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("certification")}
                    id="certification"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
            Subcategory
            </label>
            {subCategories.map((subCategory, index) => (
              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-500 pb-2"
                key={subCategory.id}
              >
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`subCategories[${index}].name`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subcategory {index + 1} Name*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(`subCategories[${index}].name`, {
                          required: "Sub Heading is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Subcategory Image {index + 1}*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="file"
                        {...register(
                          `subCategoriesImage${index + 1}`,
                          {
                            required: "Sub Heading is required",
                          }
                        )}
                        id={`subCategoriesImage${index + 1}`}
                        // onChange={(e) =>
                        //   handleImageChange(e, "subCategoryImage1")
                        // }
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="bg-red-600  w-20 my-2 px-2 rounded-md"
                  type="button"
                  onClick={() => removeSubCategory(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="bg-blue-600 h-[2rem] w-[8rem] mt-2 rounded-md"
              type="button"
              onClick={() => appendSubCategory({})}
            >
              Add Subcategory
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
          Create Category
        </Button>
      </div>
    </form>
  );
}

export default CreateCategory;
