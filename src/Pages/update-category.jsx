import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";

const CategoryUpdate = () => {
  const params = useParams();
  const name = params.name.slice(1);

  const [categoryDetails, setCategoryDetails] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [newSubCategoryImage, setNewSubCategoryImage] = useState(null);
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const [editSubCategoryImage, setEditSubCategoryImage] = useState(null);
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);
  const [message, setMessage] = useState("");

  const [metadataTitle, setMetadataTitle] = useState("");
  const [metadataMessage, setMetadataMessage] = useState("");

  const [subcategoryDescription, setSubcategoryDescription] = useState("");
  const [subcategoryMetadataTitle, setSubcategoryMetadataTitle] = useState("");

  const [firstGrid, setFirstGrid] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [secondGrid, setSecondGrid] = useState({
    title: "",
    description: "",
    link: "",
  });

  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);

  // Fetch category details on component mount
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/getCategoryByName/${name}`
        );
        setCategoryDetails(response.data);
        setMetadataTitle(response.data.metadata?.title || "");
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchCategoryDetails();
  }, [name]);

  // Handle image upload and set state accordingly
  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdateMetadata = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/updatecategorymetadata/${categoryDetails.name}`,
        {
          metadataTitle,
        }
      );

      setMetadataMessage(response.data.message);
    } catch (error) {
      console.error("Error updating metadata:", error);
      setMetadataMessage("Error updating metadata");
    }
  };

  // Create a new subcategory
  const handleCreateSubcategory = async () => {
    setMessage("");

    if (!newSubCategoryImage) return setMessage("Please select an image");
    if (!newSubCategoryName) return setMessage("Please enter a name");
    if (!subcategoryDescription)
      return setMessage("Please enter a description");
    if (!subcategoryMetadataTitle)
      return setMessage("Please enter a metadata title");

    const formData = new FormData();
    formData.append("image", newSubCategoryImage);
    formData.append("name", newSubCategoryName);
    formData.append("description", subcategoryDescription);
    formData.append("metadataTitle", subcategoryMetadataTitle);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/createSubCategory/${categoryDetails._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setCategoryDetails((prevDetails) => ({
        ...prevDetails,
        subcategories: [
          ...prevDetails.subcategories,
          {
            name: newSubCategoryName,
            img: response.data.newSubcategory.img,
            _id: response.data.newSubcategory._id,
          },
        ],
      }));
      const fileInput = document.getElementById("file_input_file");
      fileInput.value = "";

      setNewSubCategoryName("");
      setNewSubCategoryImage(null);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      setMessage("Error creating subcategory");
    }
  };

  // Delete a subcategory
  const handleDelete = async (subcategoryId) => {
    setMessage("");
    try {
      console.log(subcategoryId, "item._id");
      await axios.delete(
        `${BASE_URL}/api/deleteSubCategory/${categoryDetails._id}/subCategory/${subcategoryId}`
      );
      setCategoryDetails((prevDetails) => ({
        ...prevDetails,
        subcategories: prevDetails.subcategories.filter(
          (subcategory) => subcategory._id !== subcategoryId
        ),
      }));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      setMessage("Error deleting subcategory");
    }
  };

  // Set up editing of a subcategory
  const handleEditSubcategory = (subcategory) => {
    setEditSubCategoryId(subcategory._id);
    setEditSubCategoryName(subcategory.name);
    setEditSubCategoryImage(subcategory.img);
  };

  // Save edited subcategory details
  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("image", editSubCategoryImage);
    formData.append("name", editSubCategoryName);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/editSubCategory/${categoryDetails._id}/subCategory/${editSubCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setCategoryDetails((prevDetails) => ({
        ...prevDetails,
        subcategories: prevDetails.subcategories.map((subcategory) =>
          subcategory._id === editSubCategoryId
            ? {
                ...subcategory,
                name: editSubCategoryName,
                img: response.data.imageUrl,
              }
            : subcategory
        ),
      }));
      setEditSubCategoryId(null);
      setEditSubCategoryName("");
      setEditSubCategoryImage(null);
    } catch (error) {
      console.error("Error editing subcategory:", error);
      setMessage("Error editing subcategory");
    }
  };

  const handleUpdateCategoryFirstGrid = async () => {
    try {
      const formData = new FormData();
      formData.append("firstGrid[title]", firstGrid.title);
      formData.append("firstGrid[link]", firstGrid.link);
      formData.append("firstGrid[description]", firstGrid.description);
      formData.append("firstImage", firstImage);
      const response = await axios.post(
        `${BASE_URL}/api/updateCategoryFirstGrid/${categoryDetails._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.alert(response.data.message);
      window.location.reload();
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCategorySecondGrid = async () => {
    try {
      const formData = new FormData();
      formData.append("secondGrid[title]", secondGrid.title);
      formData.append("secondGrid[description]", secondGrid.description);
      formData.append("secondGrid[link]", secondGrid.link);
      formData.append("secondImage", secondImage);
      const response = await axios.post(
        `${BASE_URL}/api/updateCategorySecondGrid/${categoryDetails._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.alert(response.data.message);
      window.location.reload();
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategoryFirstGrid = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/deleteCategoryFirstGrid/${categoryDetails._id}`
      );
      window.alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting FirstGrid:", error);
      setMessage("Error deleting FirstGrid");
    }
  };

  const handleDeleteCategorySecondGrid = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/deleteCategorySecondGrid/${categoryDetails._id}`
      );
      window.alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting FirstGrid:", error);
      setMessage("Error deleting SecondGrid");
    }
  };

  // Render the component UI
  return (
    <>
      <div className="flex flex-col items-center mt-2">
        <h1 className="font-semibold text-3xl">Update Category</h1>
        <div className="ml-20 self-start">
          <img
            src={categoryDetails?.image}
            className="w-[200px] h-[200px]"
            alt="category"
          />
          <h1 className="font-semibold text-xl mt-2">
            {categoryDetails?.name}
          </h1>
          <p className="text-md font-semibold mt-2">
            {categoryDetails?.description}
          </p>
        </div>

        {/* Metadata */}
        <h1 className="mt-4 text-lg font-semibold">Metadata</h1>
        <div className="flex flex-col self-start ml-20 my-5">
          <p className="font-semibold text-lg my-4">Metadata</p>
          <div className="flex items-center">
            <label className="w-full flex justify-between gap-10 items-center">
              <span>Metadata Title</span>
              <input
                type="text"
                placeholder="Enter metadata title"
                className="border p-2 border-black rounded-md"
                value={metadataTitle}
                onChange={(e) => setMetadataTitle(e.target.value)}
              />
            </label>
          </div>
          <button
            className="bg-blue-500 p-2 rounded-lg mt-4 text-white hover:bg-blue-700"
            onClick={handleUpdateMetadata}
          >
            Update Metadata
          </button>
          {metadataMessage && (
            <p className="mt-4 text-red-500">{metadataMessage}</p>
          )}
        </div>

        {/* Subcategories */}
        <h1 className="mt-4 text-lg font-semibold">Subcategories</h1>
        <div className="flex flex-col self-start ml-20 my-5">
          <p className="font-semibold text-lg my-4">Create New Subcategory</p>
          <div className="flex items-center">
            <input
              id="file_input_file"
              type="file"
              onChange={(e) => handleImageUpload(e, setNewSubCategoryImage)}
            />
            <input
              type="text"
              placeholder="Enter subcategory name"
              className="border p-2 border-black rounded-md"
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter subcategory description"
              className="border p-2 border-black rounded-md"
              value={subcategoryDescription}
              onChange={(e) => setSubcategoryDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter subcategory metadata title"
              className="border p-2 border-black rounded-md"
              value={subcategoryMetadataTitle}
              onChange={(e) => setSubcategoryMetadataTitle(e.target.value)}
            />
            <button
              className="ml-20 bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-700"
              onClick={handleCreateSubcategory}
            >
              Create Subcategory
            </button>
          </div>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
        {editSubCategoryId && (
          <div className="flex flex-col self-start ml-20 my-5">
            <p className="font-semibold text-lg my-4">Edit Subcategory</p>
            <div className="flex items-center">
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, setEditSubCategoryImage)}
              />
              <input
                type="text"
                placeholder="Enter subcategory name"
                className="border p-2 border-black rounded-md"
                value={editSubCategoryName}
                onChange={(e) => setEditSubCategoryName(e.target.value)}
              />
              <button
                className="ml-20 bg-green-500 p-2 rounded-lg text-white hover:bg-green-700"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-400 p-2 rounded-lg ml-5"
                onClick={() => setEditSubCategoryId(null)}
              >
                Close
              </button>
            </div>
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </div>
        )}
        <div className="self-start mt-10 ml-20 mb-20 flex gap-10 flex-wrap">
          {categoryDetails?.subcategories?.map((item) => (
            <div key={item._id} className="flex flex-col items-center">
              <img
                src={item.img}
                alt="subcategory"
                className="w-[100px] h-[100px]"
              />
              <h1 className="text-[14px] mt-2 font-semibold">{item.name}</h1>
              <button
                className="bg-red-500 text-white w-full rounded-lg mt-2"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              {/* <button
                            className="bg-yellow-500 text-white w-full rounded-lg mt-2"
                            onClick={() => handleEditSubcategory(item)}
                        >
                            Edit
                        </button> */}
            </div>
          ))}
        </div>
      </div>
      <div className="p-10">
        <h1 className="mt-8 text-2xl font-semibold text-center">Grid</h1>
        <h1 className="text-xl my-4">First Grid</h1>
        {categoryDetails?.firstGrid && (
          <>
            <div className="flex flex-row gap-8  items-center">
              <img
                src={categoryDetails?.firstGrid?.image}
                alt="first grid"
                width={100}
                height={100}
              />
              <div>
                <p>
                  <span className="text-blue-900 font-semibold">Title : </span>
                  <span>{categoryDetails?.firstGrid?.title}</span>
                </p>
                <p>
                  <span className="text-blue-900 font-semibold">
                    Description :{" "}
                  </span>
                  <span>{categoryDetails?.firstGrid?.description}</span>
                </p>
                <p>
                  <span className="text-blue-900 font-semibold">Link : </span>
                  <span>{categoryDetails?.firstGrid?.link}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleDeleteCategoryFirstGrid}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-6 w-fit"
            >
              Remove Grid
            </button>
          </>
        )}
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
                  onChange={(e) =>
                    setFirstGrid({ ...firstGrid, title: e.target.value })
                  }
                  value={firstGrid.title}
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
                  onChange={(e) =>
                    setFirstGrid({ ...firstGrid, description: e.target.value })
                  }
                  value={firstGrid.description}
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
                  onChange={(e) =>
                    setFirstGrid({ ...firstGrid, link: e.target.value })
                  }
                  value={firstGrid.link}
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
        <button
          onClick={handleUpdateCategoryFirstGrid}
          className="bg-blue-500 text-white py-2 px-4 rounded-md my-6"
        >
          Update First Grid
        </button>
        <hr />
        <h1 className="text-xl my-6">Second Grid</h1>
        {categoryDetails?.secondGrid && (
          <>
            <div className="flex flex-row gap-8  items-center">
              <img
                src={categoryDetails?.secondGrid?.image}
                alt="first grid"
                width={100}
                height={100}
              />
              <div>
                <p>
                  <span className="text-blue-900 font-semibold">Title : </span>
                  <span>{categoryDetails?.secondGrid?.title}</span>
                </p>
                <p>
                  <span className="text-blue-900 font-semibold">
                    Description :{" "}
                  </span>
                  <span>{categoryDetails?.secondGrid?.description}</span>
                </p>
                <p>
                  <span className="text-blue-900 font-semibold">Link : </span>
                  <span>{categoryDetails?.secondGrid?.link}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleDeleteCategorySecondGrid}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-6 w-fit"
            >
              Remove Grid
            </button>
          </>
        )}
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
                  onChange={(e) =>
                    setSecondGrid({ ...secondGrid, title: e.target.value })
                  }
                  value={secondGrid.title}
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
                  onChange={(e) =>
                    setSecondGrid({
                      ...secondGrid,
                      description: e.target.value,
                    })
                  }
                  value={secondGrid.description}
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
                  onChange={(e) =>
                    setSecondGrid({ ...secondGrid, link: e.target.value })
                  }
                  value={secondGrid.link}
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
        <button
          onClick={handleUpdateCategorySecondGrid}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6"
        >
          Update Second Grid
        </button>
      </div>
    </>
  );
};

export default CategoryUpdate;
