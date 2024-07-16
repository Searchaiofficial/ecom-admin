import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../config";


const positions = [
  "heading",
  "mainImage",
  "twoGrid",
  "fiveGrid",
  "firstSlider",
  "secondSlider",
  "thirdSlider",
  "forthSlider",
  "fifthSlider",
]

function RoomPageForm() {
  // form related
  const { register, handleSubmit, getValues, reset, control } = useForm();

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

  const [firstSliderSubData, setFirstSliderSubData] = useState([]);
  const [secondSliderSubData, setSecondSliderSubData] = useState([]);
  const [thirdSliderSubData, setThirdSliderSubData] = useState([]);
  const [forthSliderSubData, setForthSliderSubData] = useState([]);
  const [fifthSliderSubData, setFifthSliderSubData] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");

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

  const handleRoomType = (e) => {
    setSelectedRoomType(e.target.value);
  };

  const [categoryMultipleSelector, setCategoryMultipleSelector] = useState([]);
  const [selectionOrder, setSelectionOrder] = useState([]);

  console.log("Category Multiple Selector:", categoryMultipleSelector);

  console.log("Selection Order:", selectionOrder);

  const handleMultipleSelector = (e) => {
    const { options } = e.target;
    if (options) {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setCategoryMultipleSelector(selectedValues);

      // Update the selection order
      const newSelectionOrder = [...selectionOrder];
      selectedValues.forEach((value) => {
        if (!newSelectionOrder.includes(value)) {
          newSelectionOrder.push(value);
        }
      });

      // Filter out unselected values from the order array
      const filteredOrder = newSelectionOrder.filter((value) =>
        selectedValues.includes(value)
      );

      setSelectionOrder(filteredOrder);
    }
  };
  console.log("Selection Order:", selectionOrder);
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        const formData = new FormData();
        console.log("Form-Data:", data);
        formData.append("mainImage", data.mainImage);
        formData.append("roomType", selectedRoomType);

        formData.append("heading", data.heading);
        formData.append("summary", data.summary);
        formData.append("shortSummary", data.shortSummary);
        formData.append("metadataTitle", data.metadataTitle);

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
        // formData.append("position", selectionOrder);
        selectionOrder.forEach((position, index) => {
          formData.append(`position[${index}]`, position);
        });

        // --------- 💥 api call 💥 -------
        try {
          const response = await fetch(`${BASE_URL}/api/createRoommain`, {
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
            Add New Room
          </h2>

          <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
            General Information:
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 flex flex-col gap-2">
              <label className="font-semibold" htmlFor="room">
                Choose Room
              </label>
              <select
                id="room"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleRoomType(e)}
              >
                <option value="">-- Select Room --</option>
                {rooms.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
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
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Room Page Heading*
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
                Room Page Short Summary*
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
                Room Page Summary*
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
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Main Room Image*
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
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>

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
      <div className="sm:col-span-3 px-10">
        <label
          htmlFor="position"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Position
        </label>
        <select
          id="position"
          {...register("position")}
          className="block w-full max-w-sm h-[40vh] mt-1 border bg-transparent p-2 border-gray-400 rounded"
          multiple
          onChange={handleMultipleSelector}
        >
          {positions.map((room, index) => (
            <option className="p-1" key={index} value={room}>
              {room}
            </option>
          ))}
        </select>
        {selectionOrder.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "7px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {selectionOrder.map((room, index) => (
              <div
                // onClick={() => navigate(`/homePage/create-room-section/${room}`)}
                style={{
                  border: "1px solid black",
                  padding: "2px",
                  borderRadius: "3px",
                }}
                key={index}
              >
                {index + 1} {room}
              </div>
            ))}
          </div>
        )}
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
          {loading ? "creating Room pge ..." : "Create Room Page"}
        </Button>
      </div>
    </form>
  );
}

export default RoomPageForm;

// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// // import Review from '../homepage/review/Review';
// import { Button } from "@material-tailwind/react";
// import { BASE_URL } from "../../../config";
// import { useEffect, useState } from "react";

// function RoomPageForm() {
//   // form related
//   const { register, handleSubmit, getValues, reset, control } = useForm();
//   const [roomCategory, setRoomCategory] = useState([]); // [roomType, productId
//   const [rooms, setRooms] = useState([]);
//   const [selectedRoomOption, setSelectedRoomOption] = useState([]);
//   const [selectRoomCategory1, setSelectRoomCategory1] = useState("");
//   const [selectRoomCategory2, setSelectRoomCategory2] = useState("");
//   const [selectRoomCategory3, setSelectRoomCategory3] = useState("");
//   const [selectRoomCategory4, setSelectRoomCategory4] = useState("");
//   const [selectRoomCategory5, setSelectRoomCategory5] = useState("");

//   const [selectedRoomData1, setSelectedRoomData1] = useState("");
//   const [selectedRoomData2, setSelectedRoomData2] = useState("");
//   const [optionRoomData, setOptionRoomData] = useState([]);

//   const [allOfferData, setAllOfferData] = useState([]);
//   const [allDemandData, setAllDemandData] = useState([]);
//   const [allCategoryData, setAllCategoryData] = useState([]);

//   const [firstSlider, setFirstSlider] = useState({
//     type: "",
//     subType: "",
//   });
//   const [secondSlider, setSecondSlider] = useState({
//     type: "",
//     subType: "",
//   });
//   const [thirdSlider, setThirdSlider] = useState({
//     type: "",
//     subType: "",
//   });

//   const [firstSliderSubData, setFirstSliderSubData] = useState([]);
//   const [secondSliderSubData, setSecondSliderSubData] = useState([]);
//   const [thirdSliderSubData, setThirdSliderSubData] = useState([]);

//   const sliderOption = ["Demand Type", "Offer", "Category"];
//   const [loading, setloading] = useState(false);

//   const {
//     fields: subHeadings,
//     append: appendSubHeading,
//     remove: removeSubHeading,
//   } = useFieldArray({
//     control,
//     name: "subHeadings",
//   });

//   const navigate = useNavigate();

//   const handleCategoryChange = (e, number) => {
//     const room = e.target.value;
//     if (number === 1) {
//       setSelectRoomCategory1(room);
//     } else if (number === 2) {
//       setSelectRoomCategory2(room);
//     } else if (number === 3) {
//       setSelectRoomCategory3(room);
//     } else if (number === 4) {
//       setSelectRoomCategory4(room);
//     } else if (number === 5) {
//       setSelectRoomCategory5(room);
//     }
//   };

//   const handleSliderChange = (e, number) => {
//     const type = e.target.value;
//     if (number === 1) {
//       setFirstSlider({ ...firstSlider, type });
//       handleTypeAndSubTypeChange(type, number);
//     } else if (number === 2) {
//       setSecondSlider({ ...secondSlider, type });
//       handleTypeAndSubTypeChange(type, number);
//     } else if (number === 3) {
//       setThirdSlider({ ...thirdSlider, type });
//       handleTypeAndSubTypeChange(type, number);
//     }
//   };

//   const handleTypeAndSubTypeChange = (type, number) => {
//     if (number === 1) {
//       if (type === "Demand Type") {
//         setFirstSliderSubData(allDemandData);
//       } else if (type === "Offer") {
//         setFirstSliderSubData(allOfferData);
//       } else if (type === "Category") {
//         setFirstSliderSubData(allCategoryData);
//       }
//     } else if (number === 2) {
//       if (type === "Demand Type") {
//         setSecondSliderSubData(allDemandData);
//       } else if (type === "Offer") {
//         setSecondSliderSubData(allOfferData);
//       } else if (type === "Category") {
//         setSecondSliderSubData(allCategoryData);
//       }
//     } else if (number === 3) {
//       if (type === "Demand Type") {
//         setThirdSliderSubData(allDemandData);
//       } else if (type === "Offer") {
//         setThirdSliderSubData(allOfferData);
//       } else if (type === "Category") {
//         setThirdSliderSubData(allCategoryData);
//       }
//     }
//   };

//   const handleSubTypeChange = (e, number) => {
//     const subType = e.target.value;
//     if (number === 1) {
//       setFirstSlider({ ...firstSlider, subType });
//     } else if (number === 2) {
//       setSecondSlider({ ...secondSlider, subType });
//     } else if (number === 3) {
//       setThirdSlider({ ...thirdSlider, subType });
//     }
//   };

//   const handleRoomChange = (e) => {
//     const room = e.target.value;
//     setSelectedRoomOption(room);
//   };

//   const handleRoomDataChange = (e, number) => {
//     const room = e.target.value;
//     if (number === 1) {
//       setSelectedRoomData1(room);
//     } else if (number === 2) {
//       setSelectedRoomData2(room);
//     }
//   };

//   const fetchAllRooms = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/getAllDifferentRoomTypes`);
//       const responseData = await response.json();
//       setRooms(responseData);
//     } catch (error) {
//       console.error("Error fetching room details:", error);
//     }
//   };

//   const fetchRoomCategory = async (roomType) => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/api/getAllCategoriesByRoomType/${roomType}`
//       );
//       const responseData = await response.json();
//       setRoomCategory(responseData);
//     } catch (error) {
//       console.error("Error fetching room details:", error);
//     }
//   };

//   const fetchRoomData = async (roomType) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/rooms/${roomType}`);
//       const responseData = await response.json();
//       console.log("Response Data:", responseData);
//       const selectRoomOptionData = responseData.map(
//         (room) => `${room.roomType}-${room.productId}`
//       );
//       console.log("Select Room Data:", selectRoomOptionData);
//       setOptionRoomData(selectRoomOptionData);
//     } catch (error) {
//       console.error("Error fetching room details:", error);
//     }
//   };

//   const fetchAllDemandData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/getAllDemandTypes`);
//       const responseData = await response.json();
//       const data = responseData.map((demand) => demand.type);
//       setAllDemandData(data);
//     } catch (error) {
//       console.error("Error fetching demand data:", error);
//     }
//   };

//   const fetchAllOfferData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/getAllOffers`);
//       const responseData = await response.json();
//       const data = responseData.map((offer) => offer.type);
//       setAllOfferData(data);
//     } catch (error) {
//       console.error("Error fetching offer data:", error);
//     }
//   };

//   const fetchAllCategoryData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/categories`);
//       const responseData = await response.json();
//       const data = responseData.map((category) => category.name);
//       setAllCategoryData(data);
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     }
//   };

//   useEffect(() => {
//     if (rooms.length === 0) {
//       fetchAllRooms();
//     }

//     if (allDemandData.length === 0) {
//       fetchAllDemandData();
//     }

//     if (allOfferData.length === 0) {
//       fetchAllOfferData();
//     }

//     if (allCategoryData.length === 0) {
//       fetchAllCategoryData();
//     }

//     if (selectedRoomOption) {
//       fetchRoomCategory(selectedRoomOption);
//       fetchRoomData(selectedRoomOption);
//     }
//   }, [rooms, selectedRoomOption, allDemandData, allOfferData, allCategoryData]);

//   const {
//     fields: circles,
//     append: appendCircle
//   } = useFieldArray({
//     control,
//     name: "circles",
//   });

//   return (
//     <form
//       onSubmit={handleSubmit(async (data) => {
//         setloading(true);
//         const formData = new FormData();
//         console.log(firstSlider, secondSlider, thirdSlider);
//         console.log("Form-Data:", data);

//         const subHeadingData = getValues("subHeadings");
//         console.log("SubHeading-Data:", subHeadingData);

//         subHeadingData.forEach((subHeading, index) => {
//           formData.append(`details[${index}][title]`, subHeading?.title);
//           formData.append(
//             `details[${index}][description]`,
//             subHeading?.description
//           );
//         });

//         data.circles.forEach((circle, index) => {
//           formData.append(
//             `circles[${index}].status`,
//             circle.status
//           );
//           formData.append(
//             `circles[${index}].productTitle`,
//             circle.productTitle
//           );
//           formData.append(
//             `circles[${index}].productCategory`,
//             circle.productCategory
//           );
//           formData.append(
//             `circles[${index}].productPrice`,
//             Number(circle.productPrice)
//           );
//           formData.append(
//             `circles[${index}].topPosition`,
//             Number(circle.topPosition)
//           );
//           formData.append(
//             `circles[${index}].leftPosition`,
//             Number(circle.leftPosition)
//           );
//           formData.append(`circles[${index}].productLink`, circle.productLink);
//         });

//         formData.append("roomName", data.roomName);
//         formData.append("title", data.title);
//         formData.append("description", data.description);
//         formData.append("fiveGridHeader", data.fiveGridHeader);
//         formData.append("fiveGridDescription", data.fiveGridDescription);
//         formData.append("twoGridHeader", data.twoGridHeader);
//         formData.append("twoGridDescription", data.twoGridDescription);
//         formData.append("metadataTitle", data.metadataTitle);

//         // const [roomType1, productId1] = selectedRoomCategory1.split("-");
//         // const [roomType2, productId2] = selectedRoomCategory2.split("-");

//         formData.append("roomType", selectedRoomOption);
//         formData.append("category[0]", selectRoomCategory1);
//         formData.append("category[1]", selectRoomCategory2);
//         formData.append("category[2]", selectRoomCategory3);
//         formData.append("category[3]", selectRoomCategory4);
//         formData.append("category[4]", selectRoomCategory5);

//         const [roomType1, productId1] = selectedRoomData1.split("-");
//         const [roomType2, productId2] = selectedRoomData2.split("-");

//         const roomData = [
//           { roomType: roomType1, productId: productId1 },
//           { roomType: roomType2, productId: productId2 },
//         ];

//         formData.append("firstSlider[type]", firstSlider.type);
//         formData.append("firstSlider[subType]", firstSlider.subType);

//         formData.append("secondSlider[type]", secondSlider.type);
//         formData.append("secondSlider[subType]", secondSlider.subType);

//         formData.append("thirdSlider[type]", thirdSlider.type);
//         formData.append("thirdSlider[subType]", thirdSlider.subType);

//         // Loop through each object in roomData and append its properties to formData
//         roomData.forEach((room, index) => {
//           formData.append(`roomData[${index}][roomType]`, room.roomType);
//           formData.append(`roomData[${index}][productId]`, room.productId);
//         });

//         const fileInput = document.getElementById(`image`);
//         const file = fileInput?.files[0];
//         formData.append(`image`, file);

//         for (var key of formData.entries()) {
//           console.log(key[0] + ", " + key[1]);
//         }
//         console.log("Form-Data:", formData);
//         // --------- 💥 api call 💥 -------
//         try {
//           const response = await fetch(`${BASE_URL}/api/createRoommain`, {
//             method: "POST",
//             headers: {},
//             body: formData,
//           });
//           const responseData = await response.json();
//           window.alert(responseData.message);
//           setloading(false);
//           // navigate("/admin");
//         } catch (error) {
//           console.error("Error uploading images:", error);
//           setloading(false);
//         }

//         reset();
//         // setSelectedColors([]);
//         // setSelectedPurchaseMode([]);
//       })}
//     >
//       {/* ➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡ ➡➡➡➡➡➡➡➡*/}

//       <div className="space-y-12 bg-white p-6 md:p-12">
//         <div className="border-b border-gray-500 pb-12">
//           <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
//             Create Room Page
//           </h2>
//           <div className="sm:col-span-3 md:w-1/2">
//             <label
//               htmlFor="roomNAme"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Room Name
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                 <input
//                   type="text"
//                   {...register("roomName", {
//                     required: "roomName is required",
//                   })}
//                   id="roomNAme"
//                   className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="sm:col-span-3 md:w-1/2">
//             <label
//               htmlFor="metadataTitle"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Metadata Title
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                 <input
//                   type="text"
//                   {...register("metadataTitle", {
//                     required: "Metadata Title is required",
//                   })}
//                   id="metadataTitle"
//                   className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Title*
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                   <textarea
//                     type="text"
//                     {...register("title", {
//                       required: "title is required",
//                     })}
//                     id="title"
//                     className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium leading-6 text-gray-900 font-bold"
//               >
//                 Description*
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                   <textarea
//                     type="text"
//                     {...register("description", {
//                       required: "description is required",
//                     })}
//                     id="description"
//                     className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="sm:col-span-3 mt-8 md:w-1/2">
//             <label
//               htmlFor="fiveGridHeader"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Five Grid Header
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                 <input
//                   type="text"
//                   {...register("fiveGridHeader", {
//                     required: "fiveGridHeader is required",
//                   })}
//                   id="fiveGridHeader"
//                   className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="sm:col-span-3 mt-8 md:w-1/2">
//             <label
//               htmlFor="fiveGridDescription"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Five Grid Description
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                 <input
//                   type="text"
//                   {...register("fiveGridDescription", {
//                     required: "fiveGridDescription is required",
//                   })}
//                   id="fiveGridDescription"
//                   className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-1 my-6">
//               <label htmlFor="room">Choose Room</label>
//               <select
//                 id="room"
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleRoomChange(e)} // Pass 1 for room 1
//               >
//                 <option value="">-- Select Room --</option>
//                 {rooms.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="sm:col-span-1 my-6">
//               <label htmlFor="room">Category 1:</label>
//               <select
//                 id=""
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleCategoryChange(e, 1)} // Pass 2 for room 2
//                 // value={selectedRoomCategory2}
//               >
//                 <option value="">-- Select Category --</option>
//                 {roomCategory.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="sm:col-span-1 my-6">
//               <label htmlFor="room">Category 2:</label>
//               <select
//                 id=""
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleCategoryChange(e, 2)} // Pass 2 for room 2
//                 // value={selectedRoomCategory2}
//               >
//                 <option value="">-- Select Category--</option>
//                 {roomCategory.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="sm:col-span-1 my-6">
//               <label htmlFor="room">Category 3:</label>
//               <select
//                 id=""
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleCategoryChange(e, 3)} // Pass 2 for room 2
//                 // value={selectedRoomCategory2}
//               >
//                 <option value="">-- Select Category--</option>
//                 {roomCategory.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="sm:col-span-1 my-6">
//               <label htmlFor="room">Category 4:</label>
//               <select
//                 id=""
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleCategoryChange(e, 4)} // Pass 2 for room 2
//                 // value={selectedRoomCategory2}
//               >
//                 <option value="">-- Select Category--</option>
//                 {roomCategory.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="sm:col-span-1 my-6">
//               <label htmlFor="room">Category 5:</label>
//               <select
//                 id=""
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleCategoryChange(e, 5)} // Pass 2 for room 2
//                 // value={selectedRoomCategory2}
//               >
//                 <option value="">-- Select Category--</option>
//                 {roomCategory.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="sm:col-span-3 mt-8 md:w-1/2">
//             <label
//               htmlFor="twoGridHeader"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Two Grid Header
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                 <input
//                   type="text"
//                   {...register("twoGridHeader", {
//                     required: "twoGridHeader is required",
//                   })}
//                   id="twoGridHeader"
//                   className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="sm:col-span-3 mt-8 md:w-1/2">
//             <label
//               htmlFor="twoGridDescription"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Two Grid Description
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                 <input
//                   type="text"
//                   {...register("twoGridDescription", {
//                     required: "twoGridDescription is required",
//                   })}
//                   id="twoGridDescription"
//                   className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-3 my-6">
//               <label htmlFor="room">RoomData 1:</label>
//               <select
//                 id="room"
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleRoomDataChange(e, 1)} // Pass 1 for room 1
//                 value={selectedRoomData1}
//               >
//                 <option value="">-- Select Room Data--</option>
//                 {optionRoomData.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="sm:col-span-3 my-6">
//               <label htmlFor="room">RoomData 2:</label>
//               <select
//                 id="room"
//                 className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
//                 onChange={(e) => handleRoomDataChange(e, 2)} // Pass 2 for room 2
//                 value={selectedRoomData2}
//               >
//                 <option value="">-- Select Room Data--</option>
//                 {optionRoomData.map((room, index) => (
//                   <option key={index} value={room}>
//                     {room}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           s
//           <div className="mt-10">
//             <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
//               SubHeadings
//             </label>
//             {subHeadings.map((subHeading, index) => (
//               <div
//                 className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-500 pb-2"
//                 key={subHeading.id}
//               >
//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor={`subHeadings[${index}].title`}
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     SubHeading {index + 1} Title*
//                   </label>
//                   <div className="mt-2">
//                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                       <textarea
//                         type="text"
//                         {...register(`subHeadings[${index}].title`, {
//                           required: "Sub Heading is required",
//                         })}
//                         className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="sm:col-span-3">
//                   <label className="block text-sm font-medium leading-6 text-gray-900">
//                     SubHeading Description*
//                   </label>
//                   <div className="mt-2">
//                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                       <textarea
//                         type="text"
//                         {...register(`subHeadings[${index}].description`, {
//                           required: "Sub Heading is required",
//                         })}
//                         className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   className="bg-red-600  w-20 my-2 px-2 rounded-md"
//                   type="button"
//                   onClick={() => removeSubHeading(index)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}

//             <button
//               className="bg-blue-600 h-[2rem] w-[8rem] mt-2 rounded-md"
//               type="button"
//               onClick={() => appendSubHeading({})}
//             >
//               Add SubHeading
//             </button>
//           </div>
//           <div className="mt-6">
//             <label
//               htmlFor="image"
//               className="block text-sm font-medium leading-6 text-gray-900 font-bold"
//             >
//               Image Source
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
//                 <input
//                   type="file"
//                   {...register("image", {
//                     required: "Image is required",
//                   })}
//                   id="image"
//                   className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   accept="image/*"
//                   // onChange={(e) => handleImageChange(e, 1)}
//                 />
//               </div>
//             </div>

//             <label className="block text-sm font-medium leading-5 text-gray-700 mt-4">
//               Childs
//             </label>
//             <Controller
//               name={`circles`}
//               control={control}
//               defaultValue={[
//                 {
//                   status: "",
//                   productTitle: "",
//                   productCategory: "",
//                   productPrice: 0,
//                   topPosition: 0,
//                   leftPosition: 0,
//                   productLink: "",
//                 },
//               ]}
//               render={({ field }) => (
//                 <div>
//                   {field.value.map((circle, index) => (
//                     <div key={index} className="mt-4">

//                       <label
//                         htmlFor={`circles[${index}].status`}
//                         className="block text-sm font-medium leading-5 text-gray-700"
//                       >
//                         Child {index + 1} Status
//                       </label>
//                       <Controller
//                         name={`circles[${index}].status`}
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                           <select
//                             {...field}
//                             className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
//                           >
//                             <option value="">Select Status</option>
//                             <option value="Active">Active</option>
//                             <option value="Inactive">Inactive</option>
//                             <option value="ActiveWithData">Active with Data</option>
//                           </select>
//                         )}
//                       />

//                       <label
//                         htmlFor={`circles[${index}].productTitle`}
//                         className="block text-sm font-medium leading-5 text-gray-700 mt-5"
//                       >
//                         Child {index + 1} Product Title
//                       </label>
//                       <Controller
//                         name={`circles[${index}].productTitle`}
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             type="text"
//                             className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
//                           />
//                         )}
//                       />

//                       <label
//                         htmlFor={`circles[${index}].productCategory`}
//                         className="block text-sm font-medium leading-5 text-gray-700 mt-4"
//                       >
//                         Child {index + 1} Product Category
//                       </label>
//                       <Controller
//                         name={`circles[${index}].productCategory`}
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             type="text"
//                             className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
//                           />
//                         )}
//                       />

//                       <label
//                         htmlFor={`circles[${index}].productPrice`}
//                         className="block text-sm font-medium leading-5 text-gray-700 mt-4"
//                       >
//                         Child {index + 1} Product Price
//                       </label>
//                       <Controller
//                         name={`circles[${index}].productPrice`}
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             type="number"
//                             className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
//                           />
//                         )}
//                       />

//                       <label
//                         htmlFor={`circles[${index}].topPosition`}
//                         className="block text-sm font-medium leading-5 text-gray-700 mt-4"
//                       >
//                         Child {index + 1} Top Position
//                       </label>
//                       <Controller
//                         name={`circles[${index}].topPosition`}
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             type="number"
//                             className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
//                           />
//                         )}
//                       />

//                       <label
//                         htmlFor={`circles[${index}].leftPosition`}
//                         className="block text-sm font-medium leading-5 text-gray-700 mt-4"
//                       >
//                         Child {index + 1} Left Position
//                       </label>
//                       <Controller
//                         name={`circles[${index}].leftPosition`}
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             type="number"
//                             className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
//                           />
//                         )}
//                       />

//                       <label
//                         htmlFor={`circles[${index}].productLink`}
//                         className="block text-sm font-medium leading-5 text-gray-700 mt-4"
//                       >
//                         Child {index + 1} Product Link
//                       </label>
//                       <Controller
//                         name={`circles[${index}].productLink`}
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             type="text"
//                             className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
//                           />
//                         )}
//                       />
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() =>
//                       appendCircle({
//                         status: "",
//                         productTitle: "",
//                         productCategory: "",
//                         productPrice: 0,
//                         topPosition: 0,
//                         leftPosition: 0,
//                         productLink: "",
//                       })
//                     }
//                     className="text-indigo-600 hover:text-indigo-900 mt-4"
//                   >
//                     Add Child
//                   </button>
//                 </div>
//               )}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mb-24 flex items-center justify-center md:justify-end gap-x-6 mr-10">
//         <button
//           type="button"
//           className="text-sm font-semibold leading-6 text-gray-900"
//           onClick={() => navigate(-1)}
//         >
//           Cancel
//         </button>

//         <Button
//           type="submit"
//           className="rounded-md shadow-2xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
//         >
//           {loading ? "Creating room main..." : "Create Room Main"}
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default RoomPageForm;
