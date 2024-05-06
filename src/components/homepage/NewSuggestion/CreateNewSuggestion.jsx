import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../../config";

function CreateNewSuggestion() {
  // form related
  const { register, handleSubmit, getValues, reset, control } = useForm();
  const {
    fields: factors,
    append: appendFactors,
    remove: removeFactors,
  } = useFieldArray({
    control,
    name: "factors",
  });

  const {
    fields: subHeadings,
    append: appendSubHeading,
    remove: removeSubHeading,
  } = useFieldArray({
    control,
    name: "subHeadings",
  });

  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setImages((prevImages) => ({
        ...prevImages,
        [fieldName]: file,
      }));
    }
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/categories`);
        const data = await response.json();
        const categories = data.map((item) => item.name);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData();
        console.log("Form-Data:", data);
        const subHeadingData = getValues("subHeadings");
        const factorsData = getValues("factors");
        console.log("SubHeading-Data:", subHeadingData);
        console.log("factorData:", factorsData);

        subHeadingData.forEach((subHeading, index) => {
          formData.append(`subHeading[${index}][title]`, subHeading?.title);
          formData.append(
            `subHeading[${index}][description]`,
            subHeading?.description
          );
        });

        factorsData.forEach((factor, index) => {
          formData.append(`factors[items][${index}][label]`, factor?.label);
        });

        formData.append(`factors[title]`, data.factors.title);

        for (let i = 1; i <= subHeadings.length; i++) {
          const fileInput1 = document.getElementById(`subHeadings${i}Image1`);
          const fileInput2 = document.getElementById(`subHeadings${i}Image2`);
          const file1 = fileInput1?.files[0];
          const file2 = fileInput2?.files[0];
          if (file1) {
            formData.append(`subHeadingImage1`, file1);
          }
          if (file2) {
            formData.append(`subHeadingImage2`, file2);
          }
        }

        for(let i = 1; i <= factors.length; i++) {
          const fileInput = document.getElementById(`factors${i}Image`);
          const file = fileInput?.files[0];
          if(file) {
            formData.append(`factorsImage`, file);
          }
        }

        console.log(images.differentMaterialsItem1);
        formData.append(
          "differentMaterialsItem1",
          images.differentMaterialsItem1
        );
        formData.append(
          "differentMaterialsItem2",
          images.differentMaterialsItem2
        );
        formData.append(
          "differentMaterialsWaysToImproveItem1",
          images.differentMaterialsWaysToImproveItem1
        );
        formData.append(
          "differentMaterialsWaysToImproveItem2",
          images.differentMaterialsWaysToImproveItem2
        );
        formData.append("mainImage", images.mainImage);
        formData.append("suggestionCardImage", images.suggestionCardImage);
        formData.append("category", selectedCategory);
        formData.append("heading", data.heading);
        formData.append("summary", data.summary);
        formData.append("shortSummary", data.shortSummary);
        formData.append(
          "differentMaterials[title]",
          data.differentMaterials.title
        );
        formData.append(
          "differentMaterials[items][0][label]",
          data.differentMaterials.items[0].label
        );

        formData.append(
          "differentMaterials[items][1][label]",
          data.differentMaterials.items[1].label
        );

        formData.append(
          "differentMaterials[chooseDifferentMaterial][title]",
          data.differentMaterials.chooseDifferentMaterial.title
        );
        formData.append(
          "differentMaterials[waysToImprove][title]",
          data.differentMaterials.waysToImprove.title
        );
        formData.append(
          "differentMaterials[waysToImprove][description]",
          data.differentMaterials.waysToImprove.description
        );
        formData.append(
          "differentMaterials[waysToImprove][items][0][label]",
          data.differentMaterials.waysToImprove.items[0].label
        );
        formData.append(
          "differentMaterials[waysToImprove][items][1][label]",
          data.differentMaterials.waysToImprove.items[1].label
        );

        formData.append(
          "differentMaterials[chooseDifferentMaterial][description]",
          data.differentMaterials.chooseDifferentMaterial.description
        );
        formData.append(
          "differentMaterials[chooseDifferentMaterial][material][name]",
          data.differentMaterials.chooseDifferentMaterial.material.name
        );
        formData.append(
          "differentMaterials[chooseDifferentMaterial][material][guaranteePeriod]",
          data.differentMaterials.chooseDifferentMaterial.material
            .guaranteePeriod
        );
        formData.append(
          "differentMaterials[chooseDifferentMaterial][material][recyclingFee]",
          data.differentMaterials.chooseDifferentMaterial.material.recyclingFee
        );
        formData.append(
          "differentMaterials[chooseDifferentMaterial][material][trialSchema]",
          data.differentMaterials.chooseDifferentMaterial.material.trialSchema
        );


        // --------- 💥 api call 💥 -------
        try {
          const response = await fetch(
            `http://localhost:4000/api/createSuggestion`,
            {
              method: "POST",
              body: formData,
            }
          );
          const responseData = await response.json();
          window.alert(responseData.message);
          // navigate("/admin");
        } catch (error) {
          console.error("Error uploading images:", error);
        }

        reset();
      })}
    >
      {/* ➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡ ➡➡➡➡➡➡➡➡*/}

      <div className="space-y-12 bg-white p-6 md:p-12">
        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Add New Suggestion
          </h2>

          <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
            General Information:
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Heading*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("heading", {
                      required: "heading is required",
                    })}
                    id="heading"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Suggestion Short Summary*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("shortSummary", {
                      required: "Short Summary is required",
                    })}
                    id="shortSummary"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Suggestion Summary*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("summary", {
                      required: "Summary is required",
                    })}
                    id="Summary"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Select Category*
              </label>
              <select
                id="category"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">-- Select Category --</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Main Image*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("mainImage", {
                      required: "Sub Heading is required",
                    })}
                    id="mainImage"
                    onChange={(e) => handleImageChange(e, "mainImage")}
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Card Image*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("suggestionCardImage", {
                      required: "Sub Heading is required",
                    })}
                    id="suggestionCardImage"
                    onChange={(e) =>
                      handleImageChange(e, "suggestionCardImage")
                    }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  border-b-2">
            <div className="sm:col-span-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Factor title*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("factors.title", {
                      required: "Sub Heading is required",
                    })}
                    id="factors.title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {factors.map((factor, index) => (
              <div className="sm:col-span-2" key={factor.id}>
                <div>
                  <label
                    htmlFor={`factors[${index}].label`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Factor {index + 1} Label*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(`factors[${index}].label`, {
                          required: "Sub Heading is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        {...register(`factors${index + 1}Image`, {
                          required: "Sub Heading is required",
                        })}
                        id={`factors${index + 1}Image`}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="bg-red-600  w-20 my-2 px-2 rounded-md"
                  type="button"
                  onClick={() => removeFactors(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="bg-blue-600 h-[2rem] w-[8rem] mt-2 rounded-md "
              type="button"
              onClick={() => appendFactors({})}
            >
              Add Factors
            </button>
          </div>

          <div className="my-10">
            <label className="block text-2xl font-medium leading-5 text-gray-700 mt-4">
              SubHeadings
            </label>
            {subHeadings.map((subHeading, index) => (
              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  border-gray-500 pb-2"
                key={subHeading.id}
              >
                <div className="sm:col-span-3">
                  <label 
                    htmlFor={`subHeadings[${index}].title`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    SubHeading {index + 1} Title*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <textarea
                        type="text"
                        {...register(`subHeadings[${index}].title`, {
                          required: "Sub Heading is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    SubHeading Description*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <textarea
                        type="text"
                        {...register(`subHeadings[${index}].description`, {
                          required: "Sub Heading is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    SubHeading Image 1*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="file"
                        {...register(
                          `subHeadings${index + 1}Image1`,
                          {
                            required: "Sub Heading is required",
                          }
                        )}
                        id={`subHeadings${index + 1}Image1`}
                        onChange={(e) =>
                          handleImageChange(e, "subHeadingImage1")
                        }
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    SubHeading Image 2*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="file"
                        {...register(
                          `subHeadings${index + 1}Image2`,
                          {
                            required: "Sub Heading is required",
                          }
                        )}
                        id={`subHeadings${index + 1}Image2`}
                        // onChange={(e) =>
                        //   handleImageChange(e, "subHeadingImage2")
                        // }
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="bg-red-600  w-20 my-2 px-2 rounded-md"
                  type="button"
                  onClick={() => removeSubHeading(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="bg-blue-600 h-[2rem] w-[8rem] mt-2 rounded-md"
              type="button"
              onClick={() => appendSubHeading({})}
            >
              Add SubHeading
            </button>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Suggestion Different Material Title*
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                <input
                  type="text"
                  {...register("differentMaterials.title", {
                    required: "Sub Heading is required",
                  })}
                  id="differentMaterials.title"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Different Material Item1*
              </label>
              <div className="mt-2">
                <div className="flex flex-col rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("differentMaterials.items[0].label", {
                      required: "Sub Heading is required",
                    })}
                    placeholder="Label 1"
                    id="differentMaterials.items[0].label"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <input
                    type="file"
                    {...register("differentMaterials.items[0].image", {
                      required: "Sub Heading is required",
                    })}
                    id="differentMaterials.items[0].image"
                    onChange={(e) =>
                      handleImageChange(e, "differentMaterialsItem1")
                    }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Different Material Item1*
              </label>
              <div className="mt-2">
                <div className="flex flex-col rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("differentMaterials.items[1].label", {
                      required: "Sub Heading is required",
                    })}
                    id="differentMaterials.items[1].label"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <input
                    type="file"
                    {...register("differentMaterials.items[1].image", {
                      required: "Sub Heading is required",
                    })}
                    id="differentMaterials.items[1].image"
                    onChange={(e) =>
                      handleImageChange(e, "differentMaterialsItem2")
                    }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion choose Different Material title*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.chooseDifferentMaterial.title",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.chooseDifferentMaterial.title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion choose Different Material Description2*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.chooseDifferentMaterial.description",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.chooseDifferentMaterial.description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Choose Different Material Name*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.chooseDifferentMaterial.material.name",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.chooseDifferentMaterial.material.name"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Choose Different Material guaranteePeriod*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.chooseDifferentMaterial.material.guaranteePeriod",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.chooseDifferentMaterial.material.guaranteePeriod"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Choose Different Material Recycling Fee*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.chooseDifferentMaterial.material.recyclingFee",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.chooseDifferentMaterial.material.recyclingFee"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Choose Different Material trial Period*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.chooseDifferentMaterial.material.trialSchema",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.chooseDifferentMaterial.material.trialSchema"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-xl mt-10">Ways to Improve</h1>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                WaysToImprove title*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("differentMaterials.waysToImprove.title", {
                      required: "Sub Heading is required",
                    })}
                    id="differentMaterials.waysToImprove.title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                WaysToImprove description*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.waysToImprove.description",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.waysToImprove.description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Different Material waysToImprove item1 label*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.waysToImprove.items[0].label",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.waysToImprove.items[0].label"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <input
                    type="file"
                    {...register(
                      "differentMaterials.waysToImprove.items[0].image",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.waysToImprove.items[0].image"
                    onChange={(e) =>
                      handleImageChange(
                        e,
                        "differentMaterialsWaysToImproveItem1"
                      )
                    }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Different Material waysToImprove item2 label
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(
                      "differentMaterials.waysToImprove.items[1].label",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.waysToImprove.items[1].label"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <input
                    type="file"
                    {...register(
                      "differentMaterials.waysToImprove.items[1].image",
                      {
                        required: "Sub Heading is required",
                      }
                    )}
                    id="differentMaterials.waysToImprove.items[1].image"
                    onChange={(e) =>
                      handleImageChange(
                        e,
                        "differentMaterialsWaysToImproveItem2"
                      )
                    }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
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
          Create Suggestion
        </Button>
      </div>
    </form>
  );
}

export default CreateNewSuggestion;
