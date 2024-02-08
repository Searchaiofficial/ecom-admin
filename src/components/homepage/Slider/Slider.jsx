import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

const Slider = () => {
    const [apiData, setApiData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BASE_URL}/api/getImgCircle?limit=${100}`)
            .then((response) => response.json())
            .then((data) => setApiData(data.result))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (circleId) => {
        fetch(`${BASE_URL}/api/deleteSliderCircle/${circleId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setApiData(data.result))
            .catch((error) => console.error('Error deleting data:', error));
    };
    console.log("slider: ", apiData);
    return (
        <>
            <div className='mt-6 mx-4'>
                <div className='text-center mb-6'>
                    <h1 className='font-bold '>Slider section</h1>
                    <span className='text-purple-400 font-bold  mt-1 hover:cursor-pointer' onClick={() => navigate('/homePage/create-slider-section')}>Create New</span>
                </div>
                {/* <div className='grid  grid-cols-3'> */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>

                    {apiData && apiData.map((item) => (
                        // <div key={item._id} style={{ marginBottom: '20px', position: "relative" }} className='col-span-3 border'>
                        <div key={item._id} style={{ marginBottom: '20px', position: "relative" }} className='border mx-auto'>  
                            <img src={item.imgSrc} alt="Product" style={{ maxWidth: '100%', width: "400px", height: "200px" }} />
                            {item.circles && item.circles[0] && item.circles[0].circles && item.circles[0].circles.map((circle) => (
                                <div
                                    key={circle._id}
                                    style={{
                                        top: `${circle.topPosition}%`,
                                        left: `${circle.leftPosition}%`,                                    
                                        color: 'black',
                                        padding: '5px', 
                                        paddingLeft: '12px'                                     
                                    }}
                                    
                                >
                                    <p>{circle.productTitle}</p>
                                    <p>{circle.productCategory}</p>
                                    <p>${circle.price?.toFixed(2)}</p>
                                   
                                </div>
                            ))}
                             <button
                                        type="button"
                                        className="ml-2 mb-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                        </div>
                        
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default Slider