import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

function ImgGridForm() {
    const { handleSubmit, control, register } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            // category
            formData.append(`category`, data.category);

            data.circles.forEach((circle, index) => {
                formData.append(`circles[${index}].productTitle`, circle.productTitle);
                formData.append(`circles[${index}].productCategory`, circle.productCategory);
                formData.append(`circles[${index}].productPrice`, Number(circle.productPrice));
                formData.append(`circles[${index}].topPosition`, Number(circle.topPosition));
                formData.append(`circles[${index}].leftPosition`, Number(circle.leftPosition));
                formData.append(`circles[${index}].productLink`, circle.productLink);
            });
            // image
            const fileInput = document.getElementById(`image`);
            const file = fileInput?.files[0];
            formData.append(`image`, file);
            
            const response = await fetch(`${BASE_URL}/api/gridImg`, {
                method: 'POST',
                headers: {
                },
                body: formData,
            });

            const responseData = await response.json();
            window.alert(responseData.message);
            navigate('/homePage')
        } catch (error) {
            console.log(error)
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

                    <label htmlFor={`category`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Category
                    </label>
                    <Controller
                        name={`category`}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />

                    <label className="block text-sm font-medium leading-5 text-gray-700 mt-4">Circles</label>
                    <Controller
                        name={`circles`}
                        control={control}
                        defaultValue={[{
                            productTitle: '',
                            productCategory: '',
                            productPrice: 0,
                            topPosition: 0,
                            leftPosition: 0,
                            productLink: '',
                        }]}
                        render={({ field }) => (
                            <div>
                                {field.value.map((circle, index) => (

                                    <div key={index} className="mt-4">

                                        <label htmlFor={`circles[${index}].productTitle`} className="block text-sm font-medium leading-5 text-gray-700">
                                            Circle {index + 1} Product Title
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


                                        <label htmlFor={`circles[${index}].productCategory`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Product Category
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


                                        <label htmlFor={`circles[${index}].productCategory`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Product Price
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

                                        <label htmlFor={`circles[${index}].topPosition`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Top Position
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

                                        <label htmlFor={`circles[${index}].leftPosition`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Left Position
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

                                        <label htmlFor={`circles[${index}].productLink`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Product Link
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
                                <button type="button"
                                    onClick={() => {
                                        const newCircles = [
                                            ...field.value,
                                            {
                                                productTitle: '',
                                                productCategory: '',
                                                productPrice: 0,
                                                topPosition: 0,
                                                leftPosition: 0,
                                                productLink: '',
                                            },
                                        ];
                                        field.onChange(newCircles);
                                    }}
                                    className="text-indigo-600 hover:text-indigo-900 mt-4">
                                    Add Circle
                                </button>
                            </div>
                        )}
                    />
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
                    >
                        Create Img Grid
                    </button>
                </div>
            </form>
        </>
    );
}

export default ImgGridForm;
