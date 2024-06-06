import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../config";
import { useEffect, useState } from "react";

function RoomPageForm() {
  // form related
  const { register, handleSubmit, getValues, reset, control } = useForm();
  const [roomCategory, setRoomCategory] = useState([]); // [roomType, productId
  const [rooms, setRooms] = useState([]);
  const [selectedRoomOption, setSelectedRoomOption] = useState([]);
  const [selectRoomCategory1, setSelectRoomCategory1] = useState("");
  const [selectRoomCategory2, setSelectRoomCategory2] = useState("");
  const [selectRoomCategory3, setSelectRoomCategory3] = useState("");
  const [selectRoomCategory4, setSelectRoomCategory4] = useState("");
  const [selectRoomCategory5, setSelectRoomCategory5] = useState("");

  const [selectedRoomData1, setSelectedRoomData1] = useState("");
  const [selectedRoomData2, setSelectedRoomData2] = useState("");
  const [optionRoomData, setOptionRoomData] = useState([]);

  const [allOfferData, setAllOfferData] = useState([]);
  const [allDemandData, setAllDemandData] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([])

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

  const [firstSliderSubData, setFirstSliderSubData] = useState([]);
  const [secondSliderSubData, setSecondSliderSubData] = useState([]);
  const [thirdSliderSubData, setThirdSliderSubData] = useState([]);

  const sliderOption = ["Demand Type", "Offer", "Category"];
  const [loading, setloading] = useState(false)

  const {
    fields: subHeadings,
    append: appendSubHeading,
    remove: removeSubHeading,
  } = useFieldArray({
    control,
    name: "subHeadings",
  });

  const navigate = useNavigate();

  const handleCategoryChange = (e, number) => {
    const room = e.target.value;
    if (number === 1) {
      setSelectRoomCategory1(room);
    } else if (number === 2) {
      setSelectRoomCategory2(room);
    } else if (number === 3) {
      setSelectRoomCategory3(room);
    } else if (number === 4) {
      setSelectRoomCategory4(room);
    } else if (number === 5) {
      setSelectRoomCategory5(room);
    }
  };

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
    }
  };


  const handleRoomChange = (e) => {
    const room = e.target.value;
    setSelectedRoomOption(room);
  };

  const handleRoomDataChange = (e, number) => {
    const room = e.target.value;
    if (number === 1) {
      setSelectedRoomData1(room);
    } else if (number === 2) {
      setSelectedRoomData2(room);
    }
  };

  const fetchAllRooms = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getAllDifferentRoomTypes`);
      const responseData = await response.json();
      setRooms(responseData);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const fetchRoomCategory = async (roomType) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/getAllCategoriesByRoomType/${roomType}`
      );
      const responseData = await response.json();
      setRoomCategory(responseData);
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
      setOptionRoomData(selectRoomOptionData);
    } catch (error) {
      console.error("Error fetching room details:", error);
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

  useEffect(() => {
    if (rooms.length === 0) {
      fetchAllRooms();
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

    if (selectedRoomOption) {
      fetchRoomCategory(selectedRoomOption);
      fetchRoomData(selectedRoomOption);
    }
  }, [rooms, selectedRoomOption, allDemandData, allOfferData, allCategoryData]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setloading(true)
        const formData = new FormData();
        console.log(firstSlider, secondSlider, thirdSlider);
        console.log("Form-Data:", data);

        const subHeadingData = getValues("subHeadings");
        console.log("SubHeading-Data:", subHeadingData);

        subHeadingData.forEach((subHeading, index) => {
          formData.append(`details[${index}][title]`, subHeading?.title);
          formData.append(
            `details[${index}][description]`,
            subHeading?.description
          );
        });

        data.circles.forEach((circle, index) => {
          formData.append(
            `circles[${index}].productTitle`,
            circle.productTitle
          );
          formData.append(
            `circles[${index}].productCategory`,
            circle.productCategory
          );
          formData.append(
            `circles[${index}].productPrice`,
            Number(circle.productPrice)
          );
          formData.append(
            `circles[${index}].topPosition`,
            Number(circle.topPosition)
          );
          formData.append(
            `circles[${index}].leftPosition`,
            Number(circle.leftPosition)
          );
          formData.append(`circles[${index}].productLink`, circle.productLink);
        });

        formData.append("roomName", data.roomName);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("fiveGridHeader", data.fiveGridHeader)
        formData.append("fiveGridDescription", data.fiveGridDescription)
        formData.append("twoGridHeader", data.twoGridHeader)
        formData.append("twoGridDescription", data.twoGridDescription)

        // const [roomType1, productId1] = selectedRoomCategory1.split("-");
        // const [roomType2, productId2] = selectedRoomCategory2.split("-");

        formData.append("roomType", selectedRoomOption);
        formData.append("category[0]", selectRoomCategory1);
        formData.append("category[1]", selectRoomCategory2);
        formData.append("category[2]", selectRoomCategory3);
        formData.append("category[3]", selectRoomCategory4);
        formData.append("category[4]", selectRoomCategory5);

        const [roomType1, productId1] = selectedRoomData1.split("-");
        const [roomType2, productId2] = selectedRoomData2.split("-");

        const roomData = [
          { roomType: roomType1, productId: productId1 },
          { roomType: roomType2, productId: productId2 },
        ];

        formData.append("firstSlider[type]", firstSlider.type);
        formData.append("firstSlider[subType]", firstSlider.subType);

        formData.append("secondSlider[type]", secondSlider.type);
        formData.append("secondSlider[subType]", secondSlider.subType);

        formData.append("thirdSlider[type]", thirdSlider.type);
        formData.append("thirdSlider[subType]", thirdSlider.subType);


        // Loop through each object in roomData and append its properties to formData
        roomData.forEach((room, index) => {
          formData.append(`roomData[${index}][roomType]`, room.roomType);
          formData.append(`roomData[${index}][productId]`, room.productId);
        });

        const fileInput = document.getElementById(`image`);
        const file = fileInput?.files[0];
        formData.append(`image`, file);

        for (var key of formData.entries()) {
          console.log(key[0] + ", " + key[1]);
        }
        console.log("Form-Data:", formData);
        // --------- 💥 api call 💥 -------
        try {
          const response = await fetch(`${BASE_URL}/api/createRoommain`, {
            method: "POST",
            headers: {},
            body: formData,
          });
          const responseData = await response.json();
          window.alert(responseData.message);
          setloading(false)
          // navigate("/admin");
        } catch (error) {
          console.error("Error uploading images:", error);
          setloading(false)
        }

        reset();
        // setSelectedColors([]);
        // setSelectedPurchaseMode([]);
      })}
    >
      {/* ➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡ ➡➡➡➡➡➡➡➡*/}

      <div className="space-y-12 bg-white p-6 md:p-12">
        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Create Room Page
          </h2>

          <div className="sm:col-span-3 md:w-1/2">
            <label
              htmlFor="roomNAme"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Room Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                <input
                  type="text"
                  {...register("roomName", {
                    required: "roomName is required",
                  })}
                  id="roomNAme"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <textarea
                    type="text"
                    {...register("title", {
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
                Description*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <textarea
                    type="text"
                    {...register("description", {
                      required: "description is required",
                    })}
                    id="description"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3 mt-8 md:w-1/2">
            <label
              htmlFor="fiveGridHeader"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Five Grid Header
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                <input
                  type="text"
                  {...register("fiveGridHeader", {
                    required: "fiveGridHeader is required",
                  })}
                  id="fiveGridHeader"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3 mt-8 md:w-1/2">
            <label
              htmlFor="fiveGridDescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Five Grid Description
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                <input
                  type="text"
                  {...register("fiveGridDescription", {
                    required: "fiveGridDescription is required",
                  })}
                  id="fiveGridDescription"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1 my-6">
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
            </div>
            <div className="sm:col-span-1 my-6">
              <label htmlFor="room">Category 1:</label>
              <select
                id=""
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleCategoryChange(e, 1)} // Pass 2 for room 2
              // value={selectedRoomCategory2}
              >
                <option value="">-- Select Category --</option>
                {roomCategory.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1 my-6">
              <label htmlFor="room">Category 2:</label>
              <select
                id=""
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleCategoryChange(e, 2)} // Pass 2 for room 2
              // value={selectedRoomCategory2}
              >
                <option value="">-- Select Category--</option>
                {roomCategory.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1 my-6">
              <label htmlFor="room">Category 3:</label>
              <select
                id=""
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleCategoryChange(e, 3)} // Pass 2 for room 2
              // value={selectedRoomCategory2}
              >
                <option value="">-- Select Category--</option>
                {roomCategory.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1 my-6">
              <label htmlFor="room">Category 4:</label>
              <select
                id=""
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleCategoryChange(e, 4)} // Pass 2 for room 2
              // value={selectedRoomCategory2}
              >
                <option value="">-- Select Category--</option>
                {roomCategory.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1 my-6">
              <label htmlFor="room">Category 5:</label>
              <select
                id=""
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleCategoryChange(e, 5)} // Pass 2 for room 2
              // value={selectedRoomCategory2}
              >
                <option value="">-- Select Category--</option>
                {roomCategory.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3 mt-8 md:w-1/2">
            <label
              htmlFor="twoGridHeader"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Two Grid Header
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                <input
                  type="text"
                  {...register("twoGridHeader", {
                    required: "twoGridHeader is required",
                  })}
                  id="twoGridHeader"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3 mt-8 md:w-1/2">
            <label
              htmlFor="twoGridDescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Two Grid Description
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                <input
                  type="text"
                  {...register("twoGridDescription", {
                    required: "twoGridDescription is required",
                  })}
                  id="twoGridDescription"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">RoomData 1:</label>
              <select
                id="room"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleRoomDataChange(e, 1)} // Pass 1 for room 1
                value={selectedRoomData1}
              >
                <option value="">-- Select Room Data--</option>
                {optionRoomData.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">RoomData 2:</label>
              <select
                id="room"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleRoomDataChange(e, 2)} // Pass 2 for room 2
                value={selectedRoomData2}
              >
                <option value="">-- Select Room Data--</option>
                {optionRoomData.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </div>

          s

          <div className="mt-10">
            <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
              SubHeadings
            </label>
            {subHeadings.map((subHeading, index) => (
              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-500 pb-2"
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

          <div className="mt-6">
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
                    required: "Image is required",
                  })}
                  id="image"
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  accept="image/*"
                // onChange={(e) => handleImageChange(e, 1)}
                />
              </div>
            </div>

            <label className="block text-sm font-medium leading-5 text-gray-700 mt-4">
              Childs
            </label>
            <Controller
              name={`circles`}
              control={control}
              defaultValue={[
                {
                  productTitle: "",
                  productCategory: "",
                  productPrice: 0,
                  topPosition: 0,
                  leftPosition: 0,
                  productLink: "",
                },
              ]}
              render={({ field }) => (
                <div>
                  {field.value.map((circle, index) => (
                    <div key={index} className="mt-4">
                      <label
                        htmlFor={`circles[${index}].productTitle`}
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Child {index + 1} Product Title
                      </label>
                      <Controller
                        name={`circles[${index}].productTitle`}
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
                        htmlFor={`circles[${index}].productCategory`}
                        className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                      >
                        Child {index + 1} Product Category
                      </label>
                      <Controller
                        name={`circles[${index}].productCategory`}
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
                        htmlFor={`circles[${index}].productPrice`}
                        className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                      >
                        Child {index + 1} Product Price
                      </label>
                      <Controller
                        name={`circles[${index}].productPrice`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                          />
                        )}
                      />

                      <label
                        htmlFor={`circles[${index}].topPosition`}
                        className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                      >
                        Child {index + 1} Top Position
                      </label>
                      <Controller
                        name={`circles[${index}].topPosition`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                          />
                        )}
                      />

                      <label
                        htmlFor={`circles[${index}].leftPosition`}
                        className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                      >
                        Child {index + 1} Left Position
                      </label>
                      <Controller
                        name={`circles[${index}].leftPosition`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                          />
                        )}
                      />

                      <label
                        htmlFor={`circles[${index}].productLink`}
                        className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                      >
                        Child {index + 1} Product Link
                      </label>
                      <Controller
                        name={`circles[${index}].productLink`}
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
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newCircles = [
                        ...field.value,
                        {
                          productTitle: "",
                          productCategory: "",
                          productPrice: 0,
                          topPosition: 0,
                          leftPosition: 0,
                          productLink: "",
                        },
                      ];
                      field.onChange(newCircles);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mt-4"
                  >
                    Add Child
                  </button>
                </div>
              )}
            />
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
          {
            loading ? "Creating room main..." : "Create Room Main"
          }
        </Button>
      </div>
    </form>
  );
}

export default RoomPageForm;
