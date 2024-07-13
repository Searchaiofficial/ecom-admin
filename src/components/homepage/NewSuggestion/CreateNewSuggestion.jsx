import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../../config";

function CreateNewSuggestion() {
  // form related
  const { register, handleSubmit, getValues, reset, control } = useForm();
  // const {
  //   fields: factors,
  //   append: appendFactors,
  //   remove: removeFactors,
  // } = useFieldArray({
  //   control,
  //   name: "factors",
  // });

  // const {
  //   fields: subHeadings,
  //   append: appendSubHeadidng,
  //   remove: removeSubHeading,
  // } = useFieldArray({
  //   control,
  //   name: "subHeadings",
  // });

  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [firstSlider, setFirstSlider] = useState({
    type: "",
    subType: "",
  });
  const [secondSlider, setSecondSlider] = useState({
    type: "",
    subType: "",
  });
  const [thirdSlider, setThirdSlider] = useState({
    type: "",
    subType: "",
  });
  const [forthSlider, setForthSlider] = useState({
    type: "",
    subType: "",
  });
  const [fifthSlider, setFifthSlider] = useState({
    type: "",
    subType: "",
  });

  const [allOfferData, setAllOfferData] = useState([]);
  const [allDemandData, setAllDemandData] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [rooms, setRooms] = useState([]);
  const [selectedRoomOption, setSelectedRoomOption] = useState([]);
  // const [selectedRoomData1, setSelectedRoomData1] = useState("");
  // const [selectedRoomData2, setSelectedRoomData2] = useState("");
  // const [selectedRoomData3, setSelectedRoomData3] = useState("");
  // const [selectedRoomData4, setSelectedRoomData4] = useState("");
  // const [optionRoomData, setOptionRoomData] = useState([]);

  const [firstSliderSubData, setFirstSliderSubData] = useState([]);
  const [secondSliderSubData, setSecondSliderSubData] = useState([]);
  const [thirdSliderSubData, setThirdSliderSubData] = useState([]);
  const [forthSliderSubData, setForthSliderSubData] = useState([]);
  const [fifthSliderSubData, setFifthSliderSubData] = useState([]);

  const sliderOption = ["Demand Type", "Offer", "Category"];

  const handleSliderChange = (e, number) => {
    const type = e.target.value;
    if (number === 1) {
      setFirstSlider({ ...firstSlider, type });
      handleTypeAndSubTypeChange(type, number);
    } else if (number === 2) {
      setSecondSlider({ ...secondSlider, type });
      handleTypeAndSubTypeChange(type, number);
    } else if (number === 3) {
      setThirdSlider({ ...thirdSlider, type });
      handleTypeAndSubTypeChange(type, number);
    } else if (number === 4) {
      setForthSlider({ ...forthSlider, type });
      handleTypeAndSubTypeChange(type, number);
    } else if (number === 5) {
      setFifthSlider({ ...fifthSlider, type });
      handleTypeAndSubTypeChange(type, number);
    }
  };

  const handleTypeAndSubTypeChange = (type, number) => {
    if (number === 1) {
      if (type === "Demand Type") {
        setFirstSliderSubData(allDemandData);
      } else if (type === "Offer") {
        setFirstSliderSubData(allOfferData);
      } else if (type === "Category") {
        setFirstSliderSubData(allCategoryData);
      }
    } else if (number === 2) {
      if (type === "Demand Type") {
        setSecondSliderSubData(allDemandData);
      } else if (type === "Offer") {
        setSecondSliderSubData(allOfferData);
      } else if (type === "Category") {
        setSecondSliderSubData(allCategoryData);
      }
    } else if (number === 3) {
      if (type === "Demand Type") {
        setThirdSliderSubData(allDemandData);
      } else if (type === "Offer") {
        setThirdSliderSubData(allOfferData);
      } else if (type === "Category") {
        setThirdSliderSubData(allCategoryData);
      }
    } else if (number === 4) {
      if (type === "Demand Type") {
        setForthSliderSubData(allDemandData);
      } else if (type === "Offer") {
        setForthSliderSubData(allOfferData);
      } else if (type === "Category") {
        setForthSliderSubData(allCategoryData);
      }
    } else if (number === 5) {
      if (type === "Demand Type") {
        setFifthSliderSubData(allDemandData);
      } else if (type === "Offer") {
        setFifthSliderSubData(allOfferData);
      } else if (type === "Category") {
        setFifthSliderSubData(allCategoryData);
      }
    }
  };

  const handleSubTypeChange = (e, number) => {
    const subType = e.target.value;
    if (number === 1) {
      setFirstSlider({ ...firstSlider, subType });
    } else if (number === 2) {
      setSecondSlider({ ...secondSlider, subType });
    } else if (number === 3) {
      setThirdSlider({ ...thirdSlider, subType });
    } else if (number === 4) {
      setForthSlider({ ...forthSlider, subType });
    } else if (number === 5) {
      setFifthSlider({ ...fifthSlider, subType });
    }
  };

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

  const fetchAllDemandData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getAllDemandTypes`);
      const responseData = await response.json();
      const data = responseData.map((demand) => demand.type);
      setAllDemandData(data);
    } catch (error) {
      console.error("Error fetching demand data:", error);
    }
  };

  const fetchAllOfferData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getAllOffers`);
      const responseData = await response.json();
      const data = responseData.map((offer) => offer.type);
      setAllOfferData(data);
    } catch (error) {
      console.error("Error fetching offer data:", error);
    }
  };

  const fetchAllCategoryData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`);
      const responseData = await response.json();
      const data = responseData.map((category) => category.name);
      setAllCategoryData(data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  // const handleRoomChange = (e) => {
  //   const room = e.target.value;
  //   setSelectedRoomOption(room);
  // };

  // const handleRoomDataChange = (e, number) => {
  //   const room = e.target.value;
  //   if (number === 1) {
  //     setSelectedRoomData1(room);
  //   } else if (number === 2) {
  //     setSelectedRoomData2(room);
  //   } else if (number === 3) {
  //     setSelectedRoomData3(room);
  //   } else if (number === 4) {
  //     setSelectedRoomData4(room);
  //   }
  // };

  const fetchAllRooms = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getAllDifferentRoomTypes`);
      const responseData = await response.json();
      setRooms(responseData);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const fetchRoomData = async (roomType) => {
    try {
      const response = await fetch(`${BASE_URL}/api/rooms/${roomType}`);
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      const selectRoomOptionData = responseData.map(
        (room) => `${room.roomType}-${room.productId}`
      );
      console.log("Select Room Data:", selectRoomOptionData);
      // setOptionRoomData(selectRoomOptionData);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

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

  useEffect(() => {
    if (rooms.length === 0) {
      fetchAllRooms();
    }

    if (selectedRoomOption) {
      fetchRoomData(selectedRoomOption);
    }

    if (allDemandData.length === 0) {
      fetchAllDemandData();
    }

    if (allOfferData.length === 0) {
      fetchAllOfferData();
    }

    if (allCategoryData.length === 0) {
      fetchAllCategoryData();
    }
    fetchCategories();
  }, [rooms, selectedRoomOption, allDemandData, allOfferData, allCategoryData]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        const formData = new FormData();
        console.log("Form-Data:", data);
        // const subHeadingData = getValues("subHeadings");
        // console.log("SubHeading-Data:", subHeadingData);
        // const factorsData = getValues("factors");
        // console.log("factorData:", factorsData);

        // subHeadingData.forEach((subHeading, index) => {
        //   formData.append(`subHeading[${index}][title]`, subHeading?.title);
        //   formData.append(`subHeading[${index}][room1]`, subHeading?.room1);
        //   formData.append(`subHeading[${index}][room2]`, subHeading?.room2);
        //   formData.append(
        //     `subHeading[${index}][description]`,
        //     subHeading?.description
        //   );
        // });

        // factorsData?.forEach((factor, index) => {
        //   formData.append(`factors[items][${index}][label]`, factor?.label);
        // });

        // formData.append(`factors[title]`, data.factors.title);

        // for (let i = 1; i <= subHeadings.length; i++) {
        //   const fileInput1 = document.getElementById(`subHeadings${i}Image1`);
        //   const fileInput2 = document.getElementById(`subHeadings${i}Image2`);
        //   const file1 = fileInput1?.files[0];
        //   const file2 = fileInput2?.files[0];
        //   if (file1) {
        //     formData.append(`subHeadingImage1`, file1);
        //   }
        //   if (file2) {
        //     formData.append(`subHeadingImage2`, file2);
        //   }
        // }

        // for (let i = 1; i <= factors.length; i++) {
        //   const fileInput = document.getElementById(`factors${i}Image`);
        //   const file = fileInput?.files[0];
        //   if (file) {
        //     formData.append(`factorsImage`, file);
        //   }
        // }

        formData.append("mainImage", data.mainImage);
        // formData.append("suggestionCardImage", images.suggestionCardImage);
        formData.append("category", selectedCategory);
        formData.append("heading", data.heading);
        formData.append("summary", data.summary);
        formData.append("shortSummary", data.shortSummary);
        formData.append("metadataTitle", data.metadataTitle);

        // const [roomType1, productId1] = selectedRoomData1.split("-");
        // const [roomType2, productId2] = selectedRoomData2.split("-");
        // const [roomType3, productId3] = selectedRoomData3.split("-");
        // const [roomType4, productId4] = selectedRoomData4.split("-");

        // const roomData = [
        //   { roomType: roomType1, productId: productId1 },
        //   { roomType: roomType2, productId: productId2 },
        //   { roomType: roomType3, productId: productId3 },
        //   { roomType: roomType4, productId: productId4 },
        // ];

        // Loop through each object in roomData and append its properties to formData
        // roomData.forEach((room, index) => {
        //   formData.append(`roomData[${index}][roomType]`, room.roomType);
        //   formData.append(`roomData[${index}][productId]`, room.productId);
        // });

        formData.append(`fiveRooms[${0}]`, data.fiveRooms[0]);
        formData.append(`fiveRooms[${1}]`, data.fiveRooms[1]);
        formData.append(`fiveRooms[${2}]`, data.fiveRooms[2]);
        formData.append(`fiveRooms[${3}]`, data.fiveRooms[3]);
        formData.append(`fiveRooms[${4}]`, data.fiveRooms[4]);
        formData.append("fiveGridHeader", data.fiveGridHeader);
        formData.append("fiveGridDescription", data.fiveGridDescription);

        formData.append("twoGridHeader", data.twoGridHeader);
        formData.append("twoGridDescription", data.twoGridDescription);
        formData.append(`twoRooms[${0}]`, data.twoRooms[0]);
        formData.append(`twoRooms[${1}]`, data.twoRooms[1]);

        // formData.append("roomType", selectedRoomOption);

        formData.append("firstSlider[type]", firstSlider.type);
        formData.append("firstSlider[subType]", firstSlider.subType);

        formData.append("secondSlider[type]", secondSlider.type);
        formData.append("secondSlider[subType]", secondSlider.subType);

        formData.append("thirdSlider[type]", thirdSlider.type);
        formData.append("thirdSlider[subType]", thirdSlider.subType);

        formData.append("forthSlider[type]", forthSlider.type);
        formData.append("forthSlider[subType]", forthSlider.subType);

        formData.append("fifthSlider[type]", fifthSlider.type);
        formData.append("fifthSlider[subType]", fifthSlider.subType);

        // --------- 💥 api call 💥 -------
        try {
          const response = await fetch(`${BASE_URL}/api/createSuggestion`, {
            method: "POST",
            body: formData,
          });
          const responseData = await response.json();
          window.alert(responseData.message);
          setLoading(false);
          // navigate("/admin");
        } catch (error) {
          console.error("Error uploading images:", error);
          setLoading(false);
        }

        // reset();
      })}
    >
      {/* ➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡ ➡➡➡➡➡➡➡➡*/}

      <div className="space-y-12 bg-white p-6 md:p-12">
        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Add New Blog
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
                htmlFor="metadataTitle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Metadata Title*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("metadataTitle", {
                      required: "Metadata title is required",
                    })}
                    id="metadataTitle"
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

            {/* <div className="sm:col-span-3">
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
            </div> */}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Main Room*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("mainImage", {
                      required: "Sub Heading is required",
                    })}
                    placeholder="Enter room ID"
                    id="mainImage"
                    onChange={(e) => handleImageChange(e, "mainImage")}
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggestion Card Image*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
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
            </div> */}
          </div>

          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  border-b-2">
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
          </div> */}

          {/* <div className="my-10">
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
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                    SubHeading Room 1*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(`subHeadings[${index}].room1`, {
                          required: "Sub Heading is required",
                        })}
                        id={`subHeadings${index + 1}Room1`}
                        placeholder="Enter Room ID"
                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    SubHeading Room 2*
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                      <input
                        type="text"
                        {...register(`subHeadings[${index}].room2`, {
                          required: "Sub Heading is required",
                        })}
                        id={`subHeadings${index + 1}Room2`}
                        placeholder="Enter room ID"
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
          </div> */}

          <h1 className="mt-10 text-2xl font-bold">Rooms</h1>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                5 Grid Room Heading*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`fiveGridHeader`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveGridHeader`}
                    placeholder="Enter Header"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                5 Grid Room Description*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`fiveGridDescription`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveGridDescription`}
                    placeholder="Enter Description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* <div className="sm:col-span-1">
              <label htmlFor="room">Choose Room</label>
              <select
                id="room"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleRoomChange(e)} // Pass 1 for room 1
              >
                <option value="">-- Select Room --</option>
                {rooms.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Room 1*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`fiveRooms[0]`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveRooms[0]`}
                    placeholder="Enter room ID"
                    // onChange={(e) =>
                    //   handleImageChange(e, "subHeadingImage2")
                    // }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Room 2*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`fiveRooms[1]`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveRooms[1]`}
                    placeholder="Enter room ID"
                    // onChange={(e) =>
                    //   handleImageChange(e, "subHeadingImage2")
                    // }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Room 3*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`fiveRooms[2]`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveRooms[2]`}
                    placeholder="Enter room ID"
                    // onChange={(e) =>
                    //   handleImageChange(e, "subHeadingImage2")
                    // }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Room 4*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`fiveRooms[3]`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveRooms[3]`}
                    placeholder="Enter room ID"
                    // onChange={(e) =>
                    //   handleImageChange(e, "subHeadingImage2")
                    // }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Room 5*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`fiveRooms[4]`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveRooms[4]`}
                    placeholder="Enter room ID"
                    // onChange={(e) =>
                    //   handleImageChange(e, "subHeadingImage2")
                    // }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                2 Grid Room Heading*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`twoGridHeader`, {
                      required: "Sub Heading is required",
                    })}
                    id={`fiveGridHeader`}
                    placeholder="Enter Header"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                2 Grid Room Description*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`twoGridDescription`, {
                      required: "Sub Heading is required",
                    })}
                    id={`twoGridDescription`}
                    placeholder="Enter Description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Room 1*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`twoRooms[0]`, {
                      required: "Sub Heading is required",
                    })}
                    id={`twoRooms[0]`}
                    placeholder="Enter room ID"
                    // onChange={(e) =>
                    //   handleImageChange(e, "subHeadingImage2")
                    // }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Room 2*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register(`twoRooms[1]`, {
                      required: "Sub Heading is required",
                    })}
                    id={`twoRooms[1]`}
                    placeholder="Enter room ID"
                    // onChange={(e) =>
                    //   handleImageChange(e, "subHeadingImage2")
                    // }
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 1:</label>
              <select
                id="slider1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSliderChange(e, 1)} // Pass 1 for room 1
                value={firstSlider.type}
              >
                <option value="">-- Select type--</option>
                {sliderOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 1 : SubData</label>
              <select
                id="subData1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSubTypeChange(e, 1)} // Pass 2 for room 2
                value={firstSlider.subType}
              >
                <option value="">-- Select Sub Type--</option>
                {firstSliderSubData.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 2:</label>
              <select
                id="slider2"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSliderChange(e, 2)} // Pass 1 for room 1
                value={secondSlider.type}
              >
                <option value="">-- Select type--</option>
                {sliderOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                s
              </select>
            </div>
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 2 : SubData</label>
              <select
                id="subData1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSubTypeChange(e, 2)} // Pass 2 for room 2
                value={secondSlider.subType}
              >
                <option value="">-- Select Sub Type--</option>
                {secondSliderSubData.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 3:</label>
              <select
                id="slider1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSliderChange(e, 3)} // Pass 1 for room 1
                value={thirdSlider.type}
              >
                <option value="">-- Select type--</option>
                {sliderOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 3 : SubData</label>
              <select
                id="subData1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSubTypeChange(e, 3)} // Pass 2 for room 2
                value={thirdSlider.subType}
              >
                <option value="">-- Select Sub Type--</option>
                {thirdSliderSubData.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 4:</label>
              <select
                id="slider1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSliderChange(e, 4)} // Pass 1 for room 1
                value={forthSlider.type}
              >
                <option value="">-- Select type--</option>
                {sliderOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 4 : SubData</label>
              <select
                id="subData1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSubTypeChange(e, 4)} // Pass 2 for room 2
                value={forthSlider.subType}
              >
                <option value="">-- Select Sub Type--</option>
                {forthSliderSubData.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 5:</label>
              <select
                id="slider1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSliderChange(e, 5)} // Pass 1 for room 1
                value={fifthSlider.type}
              >
                <option value="">-- Select type--</option>
                {sliderOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">Slider 5 : SubData</label>
              <select
                id="subData1"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleSubTypeChange(e, 5)} // Pass 2 for room 2
                value={fifthSlider.subType}
              >
                <option value="">-- Select Sub Type--</option>
                {fifthSliderSubData.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
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
          {loading ? "creating Suggestion ..." : "Create Suggestion"}
        </Button>
      </div>
    </form>
  );
}

export default CreateNewSuggestion;
