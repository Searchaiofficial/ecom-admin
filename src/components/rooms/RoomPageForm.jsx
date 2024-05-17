import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../config";
import { useEffect, useState } from "react";

function RoomPageForm() {
  // form related
  const { register, handleSubmit, getValues, reset, control } = useForm();
  const [selectRoomOption, setSelectRoomOption] = useState([]);
  const [selectedRoom1, setSelectedRoom1] = useState("");
  const [selectedRoom2, setSelectedRoom2] = useState("");
  const {
    fields: subHeadings,
    append: appendSubHeading,
    remove: removeSubHeading,
  } = useFieldArray({
    control,
    name: "subHeadings",
  });

  const navigate = useNavigate();

  const handleRoomChange = (e, roomNumber) => {
    const room = e.target.value;
    if (roomNumber === 1) {
      setSelectedRoom1(room);
    } else if (roomNumber === 2) {
      setSelectedRoom2(room);
    }
  };


  const fetchRoom = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/rooms`);
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      const selectRoomOptionData = responseData.map(room => `${room.roomType}-${room.productId}`);
      console.log("Select Room Data:", selectRoomOptionData);
      setSelectRoomOption(selectRoomOptionData);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  useEffect(() => {
    if (selectRoomOption.length === 0) {
      fetchRoom();
    }
  }, [selectRoomOption]);
  
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData();
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

        const [roomType1, productId1] = selectedRoom1.split('-');
        const [roomType2, productId2] = selectedRoom2.split('-');

        const roomData = [
          { roomType: roomType1, productId: productId1 },
          { roomType: roomType2, productId: productId2 }
        ];

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

      <div div className="space-y-12 bg-white p-6 md:p-12" >
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
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="room">RoomData 1:</label>
              <select
                id="room"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={(e) => handleRoomChange(e, 1)} // Pass 1 for room 1
                value={selectedRoom1}
              >
                <option value="">-- Select Room --</option>
                {selectRoomOption.map((room, index) => (
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
                onChange={(e) => handleRoomChange(e, 2)} // Pass 2 for room 2
                value={selectedRoom2}
              >
                <option value="">-- Select Room --</option>
                {selectRoomOption.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </div>


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

                {/* <div className="sm:col-span-3">
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
                </div> */}

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
      </div >

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
    </form >
  );
}

export default RoomPageForm;
