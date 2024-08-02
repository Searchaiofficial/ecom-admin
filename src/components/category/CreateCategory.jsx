import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../config";
import { useState } from "react";

function CreateCategory() {
  // form related
  const options = [
    { label: "No", value: "no" },
    { label: "Yes", value: "yes" },
  ];
  const categoryType = ["Homedecor", "Walldecor", "Flooring"];
  const { register, handleSubmit, getValues, reset, control } = useForm();
  const [colors, setColors] = useState([{ name: "", hexCode: "" }]);
  const [services, SetServices] = useState([{ name: "", cost: "" }]);
  const [ratingTypes, SetRatingTypes] = useState([{ name: "", image: null }]);
  const [showCalculator, setShowCalculator] = useState(false);

  const addColorInput = () => {
    setColors([...colors, { name: "", hexCode: "" }]);
  };

  const addServiceInput = () => [
    SetServices([...services, { name: "", cost: "" }]),
  ];

  const addRatingTypeInput = () => {
    if (ratingTypes.length < 5) {
      SetRatingTypes([...ratingTypes, { name: "", image: null }]);
    }
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const handleServiceChange = (index, field, value) => {
    const newService = [...services];
    newService[index][field] = value;
    SetServices(newService);
  };

  const handleRatingTypeChange = (index, field, value) => {
    const newRatingType = [...ratingTypes];
    newRatingType[index][field] = value;
    SetRatingTypes(newRatingType);
  };

  // const handleFileChange = (index, file) => {
  //   const newRatingTypes = [...ratingTypes];
  //   newRatingTypes[index].image = file;
  //   SetRatingTypes(newRatingTypes);
  // };

  const handleFileChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      updateRatingTypeImage(index, base64String);
    };
    reader.readAsDataURL(file);
  };

  const updateRatingTypeImage = (index, base64String) => {
    SetRatingTypes((prev) => {
      const newRatingTypes = [...prev];
      newRatingTypes[index].image = base64String;
      return newRatingTypes;
    });
  };

  console.log(colors);
  console.log(services);
  console.log(ratingTypes);

  const {
    fields: subCategories,
    append: appendSubCategory,
    remove: removeSubCategory,
  } = useFieldArray({
    control,
    name: "subCategories",
  });

  const {
    fields: maintenanceDetails,
    append: appendMaintenanceDetails,
    remove: removeMaintenanceDetails,
  } = useFieldArray({
    control,
    name: "maintenanceDetails",
  });

  const {
    fields: installationDetails,
    append: appendInstallationDetails,
    remove: removeInstallationDetails,
  } = useFieldArray({
    control,
    name: "installationDetails",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        const formData = new FormData();

        const subCategoryData = getValues("subCategories");
        subCategoryData.forEach((subCategory, index) => {
          formData.append(`subcategories[${index}][name]`, subCategory?.name);
          formData.append(
            `subcategories[${index}][description]`,
            subCategory?.description
          );
          formData.append(
            `subcategories[${index}][metadataTitle]`,
            subCategory?.metadataTitle
          );
        });

        const maintenanceDetailsData = getValues("maintenanceDetails");
        maintenanceDetailsData.forEach((point, index) => {
          formData.append(
            `maintenanceDetails[${index}][heading]`,
            point.heading
          );
          formData.append(
            `maintenanceDetails[${index}][description]`,
            point.description
          );
        });

        const installationDetailsData = getValues("installationDetails");
        installationDetailsData.forEach((point, index) => {
          formData.append(
            `installationDetails[${index}][heading]`,
            point.heading
          );
          formData.append(
            `installationDetails[${index}][description]`,
            point.description
          );
        });

        formData.append("name", data.name);
        formData.append(`showCalculator`, showCalculator);

        const metadataTitle = document.getElementById("metadataTitle");
        formData.append("metadataTitle", metadataTitle?.value);

        const fileInput = document.getElementById("image");
        const file = fileInput?.files[0];
        formData.append("image", file);

        // const maintenanceDetails =
        //   document.getElementById("maintenanceDetails");
        // const maintenanceDetailsFile = maintenanceDetails?.files[0];
        // formData.append("maintenanceDetails", maintenanceDetailsFile);

        // const certification = document.getElementById("certification");
        // const certificationFile = certification?.files[0];
        // formData.append("certification", certificationFile);

        colors.forEach((color, index) => {
          formData.append(`availableColors[${index}][name]`, color.name);
          formData.append(`availableColors[${index}][hexCode]`, color.hexCode);
        });

        services.forEach((service, index) => {
          formData.append(`availableServices[${index}][name]`, service.name);
          formData.append(`availableServices[${index}][cost]`, service.cost);
        });

        ratingTypes.forEach((ratingType, index) => {
          formData.append(
            `availableRatingTypes[${index}][name]`,
            ratingType.name
          );
          // formData.append(`availableRatingTypes[${index}][rating]`, ratingType.rating);
          formData.append(
            `availableRatingTypes[${index}][image]`,
            ratingType.image
          );
        });

        // ratingTypes.forEach((_, i) => {
        //   const ratingIconImg = document.getElementById(
        //     `RatingTypeIcon${i + 1}`
        //   );
        //   const ratingIconFile = ratingIconImg?.files[0];
        //   formData.append(`availableRatingTypes[${i}][ratingTypeIcon]`, ratingIconFile);
        // });

        subCategoryData.forEach((_, i) => {
          const subCatImage = document.getElementById(
            `subCategoriesImage${i + 1}`
          );
          const subCatFile = subCatImage?.files[0];
          formData.append("subCategoriesImage", subCatFile);
        });

        formData.append("type", data.type);
        formData.append("description", data.description);

        if (
          data.firstGrid.title ||
          data.firstGrid.link ||
          data.firstGrid.description ||
          firstImage
        ) {
          formData.append("firstGrid[title]", data.firstGrid.title);
          formData.append("firstGrid[link]", data.firstGrid.link);
          formData.append("firstGrid[description]", data.firstGrid.description);
          formData.append("firstImage", firstImage);
        }

        if (
          data.secondGrid.title ||
          data.secondGrid.link ||
          data.secondGrid.description ||
          secondImage
        ) {
          formData.append("secondGrid[title]", data.secondGrid.title);
          formData.append(
            "secondGrid[description]",
            data.secondGrid.description
          );
          formData.append("secondGrid[link]", data.secondGrid.link);
          formData.append("secondImage", secondImage);
        }

        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        try {
          const response = await fetch(`${BASE_URL}/api/createCategory`, {
            method: "POST",
            body: formData,
          });
          const responseData = await response.json();
          window.alert(responseData.message);
          // navigate("/admin");
          setLoading(false);
        } catch (error) {
          console.error("Error uploading images:", error);
          setLoading(false);
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
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category Metadata Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("metadataTitle")}
                    id="metadataTitle"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 ">
              <label>Show Calculator</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="no"
                  name="no"
                  value={false}
                  checked={!showCalculator}
                  onChange={() => setShowCalculator(false)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="no" className="ml-2 text-gray-700">
                  No
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="yes"
                  name="yes"
                  value={true}
                  checked={showCalculator}
                  onChange={() => setShowCalculator(true)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="yes" className="ml-2 text-gray-700">
                  Yes
                </label>
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
            {/* <div className="sm:col-span-2">
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
            </div> */}

            {/* <div className="sm:col-span-2">
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
            </div> */}
          </div>
          <div className="mt-10">
            <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
              Maintenance Details
            </label>
            {maintenanceDetails.map((point, index) => (
              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-500 pb-2 "
                key={point.id}
              >
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`maintenanceDetails[${index}].heading`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Heading {index + 1}*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(`maintenanceDetails[${index}].heading`, {
                          required: "maintenanceDetails is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`maintenanceDetails[${index}].description`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description {index + 1}*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(
                          `maintenanceDetails[${index}].description`,
                          {
                            required: "maintenanceDetails is required",
                          }
                        )}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="bg-red-600  w-20 my-2 px-2 rounded-md"
                  type="button"
                  onClick={() => removeMaintenanceDetails(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="bg-blue-600 h-[2rem] text-white w-[8rem] mt-2 rounded-md"
              type="button"
              onClick={() => appendMaintenanceDetails({})}
            >
              Add Point
            </button>
          </div>
          <div className="mt-10">
            <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
              Installation Details
            </label>
            {installationDetails.map((point, index) => (
              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-500 pb-2 "
                key={point.id}
              >
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`installationDetails[${index}].heading`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Heading {index + 1}*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(`installationDetails[${index}].heading`, {
                          required: "installationDetails is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`installationDetails[${index}].description`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description {index + 1}*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(
                          `installationDetails[${index}].description`,
                          {
                            required: "installationDetails is required",
                          }
                        )}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="bg-red-600  w-20 my-2 px-2 rounded-md"
                  type="button"
                  onClick={() => removeInstallationDetails(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="bg-blue-600 h-[2rem] text-white w-[8rem] mt-2 rounded-md"
              type="button"
              onClick={() => appendInstallationDetails({})}
            >
              Add Point
            </button>
          </div>
          <div>
            <p className="block text-sm font-medium leading-6 text-gray-900 font-bold mt-10 mb-5">
              Category Services
            </p>

            {/* Dynamic rendering of color inputs */}
            <div className="flex flex-wrap gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <p className="text-sm font-semibold">Service {index + 1}</p>
                  <input
                    type="text"
                    placeholder="Enter Service name"
                    className="p-2 border"
                    value={service.name}
                    onChange={(e) =>
                      handleServiceChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter Service cost"
                    className="p-2 border"
                    value={service.cost}
                    onChange={(e) =>
                      handleServiceChange(index, "cost", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Button to add another color input */}
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg mt-5"
              onClick={addServiceInput}
            >
              Add Another Service
            </button>
          </div>
          <div>
            <p className="block text-sm font-medium leading-6 text-gray-900 font-bold mt-10 mb-5">
              Category Colors
            </p>

            {/* Dynamic rendering of color inputs */}
            <div className="flex flex-wrap gap-4">
              {colors.map((color, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <p className="text-sm font-semibold">Color {index + 1}</p>
                  <input
                    type="text"
                    placeholder="Enter color name"
                    className="p-2 border"
                    value={color.name}
                    onChange={(e) =>
                      handleColorChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter hex code"
                    className="p-2 border"
                    value={color.hexCode}
                    onChange={(e) =>
                      handleColorChange(index, "hexCode", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Button to add another color input */}
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg mt-5"
              onClick={addColorInput}
            >
              Add Another Color
            </button>
          </div>

          <div>
            <p className="block text-sm font-medium leading-6 text-gray-900 font-bold mt-10 mb-5">
              Category Rating Type
            </p>

            {/* Dynamic rendering of color inputs */}
            <div className="flex flex-wrap gap-4">
              {ratingTypes.map((ratingType, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <p className="text-sm font-semibold">
                    Rating Type {index + 1}
                  </p>
                  <input
                    type="text"
                    placeholder="Enter color name"
                    className="p-2 border"
                    value={ratingType.name}
                    onChange={(e) =>
                      handleRatingTypeChange(index, "name", e.target.value)
                    }
                  />
                  {/* <input
                    type="number"
                    placeholder="Enter hex code"
                    className="p-2 border"
                    value={ratingType.rating}
                    onChange={(e) =>
                      handleRatingTypeChange(index, "rating", e.target.value)
                    }
                  /> */}
                  {/* <input
                    type="file"
                    {...register(`RatingTypeIcon${index + 1}`, {
                      required: "Rating type icon is required",
                    })}
                    id={`RatingTypeIcon${index + 1}`}
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  /> */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              ))}
            </div>

            {/* Button to add another color input */}
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg mt-5"
              onClick={addRatingTypeInput}
            >
              Add Another Rating Type
            </button>
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
                  <label
                    htmlFor={`subCategories[${index}].description`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subcategory {index + 1} Description*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        id={`subCategories[${index}].description`}
                        type="text"
                        {...register(`subCategories[${index}].description`, {
                          required: "Description is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`subCategories[${index}].metadataTitle`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subcategory {index + 1} Metadata Title*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        id={`subCategories[${index}].metadataTitle`}
                        type="text"
                        {...register(`subCategories[${index}].metadataTitle`, {
                          required: "Metadata Title is required",
                        })}
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  {/* <div className="sm:col-span-2"> */}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Subcategory Image {index + 1}*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="file"
                        {...register(`subCategoriesImage${index + 1}`, {
                          required: "Sub Heading is required",
                        })}
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
              className="bg-blue-600 h-[2rem] text-white w-[8rem] mt-2 rounded-md"
              type="button"
              onClick={() => appendSubCategory({})}
            >
              Add Subcategory
            </button>
          </div>

          <h1 className="text-lg font-bold leading-7 text-gray-900  mt-12">
            First Grid
          </h1>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 ">
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    {...register(`firstGrid.title`)}
                    type="text"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    {...register(`firstGrid.description`)}
                    type="text"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Link
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    {...register(`firstGrid.link`)}
                    type="text"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    onChange={(e) => handleImageUpload(e, setFirstImage)}
                    type="file"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-lg font-bold leading-7 text-gray-900  mt-12">
            Second Grid
          </h1>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 ">
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    {...register(`secondGrid.title`)}
                    type="text"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    {...register(`secondGrid.description`)}
                    type="text"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Link
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    {...register(`secondGrid.link`)}
                    type="text"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    onChange={(e) => handleImageUpload(e, setSecondImage)}
                    type="file"
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
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
          {loading ? "Creating Category..." : "Create Category"}
        </Button>
      </div>
    </form>
  );
}

export default CreateCategory;
