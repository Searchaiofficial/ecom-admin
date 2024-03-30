import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

const floorOptions = ["Ground", "First", "Second", "Third", "Fourth", "Fifth"];
function RoomForm() {
    const { handleSubmit, register, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            // image
            const fileInput = document.getElementById(`image`);
            const file = fileInput?.files[0];
            formData.append(`image`, file);
            formData.append('roomTitle', data.roomTitle);
            formData.append('floor', data.floor);
            formData.append('roomType', params.roomType);
           
            const response = await fetch(`${BASE_URL}/api/createRoom`, {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            window.alert(responseData.message);
            navigate('/homePage')
        } catch (error) {
            console.log(error)
        }
        reset();
    };

    return (
        <>
            <AdminNavbar />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10">
                <div className="mt-6">

                    <label
                        htmlFor="image"
                        className="block text-sm leading-6 text-gray-900 font-bold"
                    >
                        Image Source
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="file"
                                {...register('image', {
                                    required: 'name is required',
                                })}
                                id="image"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <label
                        htmlFor="roomTitle"
                        className="block text-sm leading-6 text-gray-900 font-bold"
                    >
                        Room Title
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="text"
                                {...register('roomTitle', {
                                    required: 'roomTitle is required',
                                })}
                                id="roomTitle"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>
                    <label
                        htmlFor="floor"
                        className="block text-sm leading-6 text-gray-900 font-bold"
                    >
                        Floor
                    </label>
                    <select {...register('floor')} id="floor" className="block w-full mt-1 border bg-transparent p-2 border-gray-400 rounded">
                        <option value={''}>-- Select Floor --</option>
                        {floorOptions.map((floor, index) => (
                            <option key={index} value={floor}>{floor}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
                    >
                        Create Room
                    </button>
                </div>
            </form>
        </>
    );
}

export default RoomForm;
