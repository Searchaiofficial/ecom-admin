import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import AdminNavbar from "../../AdminNavbar";

const SpecialReview = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const navigate = useNavigate();

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
      </div>
    </>
  );
};

export default SpecialReview;
