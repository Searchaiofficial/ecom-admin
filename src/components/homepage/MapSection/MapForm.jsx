import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';
import axios from 'axios';

function MapForm() {
    const { handleSubmit, control, register, reset } = useForm();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    const [allcategories, setAllCategories] = useState([])
    const [categoryMultipleSelector, setCategoryMultipleSelector] = useState([]);


    const fetchAllCategories = async () => {
        try {
            const responce = await axios.get(`${BASE_URL}/api/categories`)
            setAllCategories(responce.data)
            console.log(responce.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllCategories()
    }, [])

    const handleMultipleSelector = (e) => {
        const { options } = e.target;
        if (options) {
            setCategoryMultipleSelector(
                Array.from(options)
                    .filter((option) => option.selected)
                    .map((option) => option.value)
            );
        }
    }


    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages(`img${index}`, imageUrl);
        }
    };

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('geo_location.latitude', data.geo_location.latitude);
            formData.append('geo_location.longitude', data.geo_location.longitude);
            formData.append('address', data.address);
            formData.append('phone', data.phone);
            formData.append('thumbnail', data.thumbnail);
            formData.append("pincode", data.pincode);
            // formData.append("category", data.category);
            categoryMultipleSelector.forEach(category => {
                formData.append('category[]', category);
            });

            // Add images to FormData
            for (let i = 1; i <= 4; i++) {
                const fileInput = document.getElementById(`img${i}`);
                const file = fileInput?.files[0];
                if (file) {
                    formData.append(`image`, file);
                }
            }

            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }


            const response = await fetch(`${BASE_URL}/api/createMapPlaces`, {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            window.alert(responseData.message);
            navigate('/homePage');
            reset()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10">
                <div className="mt-6">
                    <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                        Name
                    </label>
                    <Controller
                        name="name"
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

                    <label htmlFor="geo_location.latitude" className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Latitude
                    </label>
                    <Controller
                        name="geo_location.latitude"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step="any"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />

                    <label htmlFor="geo_location.longitude" className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Longitude
                    </label>
                    <Controller
                        name="geo_location.longitude"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step="any"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />

                    <label htmlFor="address" className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Address
                    </label>
                    <Controller
                        name="address"
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

                    <label htmlFor="pincode" className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        PinCode
                    </label>
                    <Controller
                        name="pincode"
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

                    <label htmlFor="phone" className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Phone
                    </label>
                    <Controller
                        name="phone"
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

                    <div className="sm:col-span-3">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            category
                        </label>
                        <select
                            {...register("category")}
                            id="category"
                            className="block w-full mt-1 border bg-transparent p-2 border-gray-400 rounded"
                            multiple
                            onChange={handleMultipleSelector}
                        >
                            {allcategories?.map((room, index) => (
                                <option key={index} value={room.name}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                        {categoryMultipleSelector.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    gap: "7px",
                                    alignItems: "center",
                                    marginTop: "10px",
                                }}
                            >
                                {categoryMultipleSelector.map((room, index) => {
                                    return (
                                        <button
                                            // onClick={() =>
                                            //   navigate(`/homePage/create-room-section/${room}`)
                                            // }
                                            style={{
                                                border: "1px solid black",
                                                padding: "2px",
                                                borderRadius: "3px",
                                            }}
                                            key={index}
                                        >
                                            {room}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="img1"
                                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                            >
                                Image1* (Thumbnail)
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                                    <input
                                        type="file"
                                        {...register('img1', {
                                            required: 'name is required',
                                        })}
                                        id="img1"
                                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 1)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="img2"
                                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                            >
                                Image2*
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                                    <input
                                        type="file"
                                        {...register('img2', {
                                            required: 'name is required',
                                        })}
                                        id="img2"
                                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 2)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="img3"
                                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                            >
                                Image3*
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                                    <input
                                        type="file"
                                        {...register('img3', {
                                            required: 'name is required',
                                        })}
                                        id="img3"
                                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 3)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="img4"
                                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                            >
                                Image4*
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                                    <input
                                        type="file"
                                        {...register('img4', {
                                            required: 'name is required',
                                        })}
                                        id="img4"
                                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 4)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
                    >
                        Create Map
                    </button>
                </div>
            </form>
        </>
    );
}

export default MapForm;
