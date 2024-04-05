import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

function NewProductForm() {
    const { handleSubmit, control, register } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {

        const formData = new FormData();

        try {
            // image
            const fileInput = document.getElementById(`image`);
            const file = fileInput?.files[0];
            formData.append(`image`, file);
            formData.append(`text`, data.text);
            formData.append('link', data.link);
            formData.append('imgTitle', data.imgTitle);

            const response = await fetch(`${BASE_URL}/api/createnewProductSection`, {
                method: "POST",
                body: formData
            })
            const res = await response.json();
            window.alert(res.message)
            navigate('/homePage')
        } catch (error) {
            console.log("error saving image section", error)
        }
    };

    return (
        <>
            <AdminNavbar />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10">
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
                                {...register('image', {
                                    required: 'name is required',
                                })}
                                id="image"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                accept="image/*"
                            />
                        </div>
                    </div>


                    <label htmlFor={`imgTitle`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Image Title
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="text"
                                {...register('imgTitle', {
                                    required: 'imgTitle is required',
                                })}
                                id="imgTitle"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <label htmlFor={`text`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Image Text
                    </label>
                    <Controller
                        name={`text`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <textarea
                                {...field}
                                rows="3"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />



                    <label htmlFor={`link`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Link
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="text"
                                {...register('link', {
                                    required: 'link is required',
                                })}
                                id="link"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
                    >
                        Create Image
                    </button>
                </div>
            </form>
        </>
    );
}

export default NewProductForm;
