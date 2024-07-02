import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import AdminNavbar from "../../AdminNavbar";

const SpecialReview = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const navigate = useNavigate();

  const [allCategoryData, setAllCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [optionRoomData, setOptionRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      // imageFiles.forEach((file, index) => {
      //   formData.append(`image`, file);
      // });
      const fileInput = document.getElementById(`image`);
      const file = fileInput?.files[0];
      formData.append(`image`, file);

      formData.append("comment", comment);
      formData.append("name", name);
      formData.append("instagramUrl", instagramUrl);

      const response = await fetch(`${BASE_URL}/api/createSpecialReview`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      window.alert(data.message);
      // navigate('/homePage')
    } catch (error) {
      console.error("Error creating image data:", error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setImageFiles([...imageFiles, ...files]);
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

  const fetchRoomData = async (category) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/getAllRoomsByCategory/${category}`
      );
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      // const selectRoomOptionData = responseData.map(
      //   (room) => `${room.roomType}-${room.productId}`
      // );
      const selectRoomOptionData = [];
      responseData.forEach((room) => {
        const roomName = `${room.roomType}-${room.productId}`;
        const id = room._id;
        selectRoomOptionData.push({ roomName, id });
      });
      setOptionRoomData(selectRoomOptionData);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  useEffect(() => {
    if (allCategoryData.length === 0) {
      fetchAllCategoryData();
    }
    if (selectedCategory) {
      fetchRoomData(selectedCategory);
    }
  }, [selectedCategory, allCategoryData]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleRoomChange = (e) => {
    const room = e.target.value;
    // console.log(room)
    setSelectedRoom(room);
  };

  const handleUpdateSpecialRoom = async () => {
    setSelectedRoom("");
    setSelectedCategory("");
    try {
      const response = await fetch(`${BASE_URL}/api/addSpecialRoomInCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: selectedRoom,
          categoryName: selectedCategory,
        }),
      });

      const data = await response.json();
      window.alert(data.message);
      // navigate('/homePage')
    } catch (error) {
      console.error("Error creating image data:", error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10">
        <div className="mt-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Select Profile Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />

          <label
            htmlFor="nameInput"
            className="mt-5 block text-sm font-medium leading-5 text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
          <label
            htmlFor="descriptionInput"
            className="mt-5 block text-sm font-medium leading-5 text-gray-700"
          >
            Instagram Url:
          </label>
          <input
            type="text"
            id="instagramUrlInput"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
          <label
            htmlFor="instagramUrlInput"
            className="mt-5 block text-sm font-medium leading-5 text-gray-700"
          >
            Comment:
          </label>
          <textarea
            type="text"
            id="descriptionInput"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
          <button
            type="button"
            className="mt-5 w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
            onClick={handleCreate}
          >
            Create Special Review
          </button>
        </div>

        <div className="mt-10 flex justify-between gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium leading-5 text-gray-700">
              Select Category:
            </label>
            <select
              className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {allCategoryData.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium leading-5 text-gray-700">
              Select Room:
            </label>
            <select
              className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              onChange={handleRoomChange}
            >
              <option value="">Select Room</option>
              {optionRoomData.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600 disabled:bg-indigo-300"
          onClick={handleUpdateSpecialRoom}
          disabled={!selectedRoom}
        >
          Update Special Room
        </button>
      </div>
    </>
  );
};

export default SpecialReview;
