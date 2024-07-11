import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShippingRateForm from './ShippingRateForm';
import { BASE_URL } from "../../../config"

const ShippingRates = () => {
  const [shippingRates, setShippingRates] = useState([]);
  const [editRate, setEditRate] = useState(null);

  useEffect(() => {
    fetchShippingRates();
  }, []);

  const fetchShippingRates = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/shippingRate`);
      setShippingRates(response.data);
    } catch (error) {
      console.error('Error fetching shipping rates', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/shippingRate/${id}`);
      fetchShippingRates();
    } catch (error) {
      console.error('Error deleting shipping rate', error);
    }
  };

  const handleEdit = (rate) => {
    setEditRate(rate);
  };

  const handleFormSubmit = () => {
    setEditRate(null);
    fetchShippingRates();
  };

  return (
    <div className="max-w-md  mt-12 mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Shipping Rates</h2>
      <ShippingRateForm onSubmit={handleFormSubmit} editRate={editRate} />
      <ul className="mt-6  space-y-4">
      {shippingRates?.map((rate) => (
          <li key={rate._id} className="p-4 bg-white shadow-md rounded-md flex justify-between items-center">
            <span className='text-xl'>({rate.minDistance} - {rate.maxDistance}) km: Rs {rate.charge}</span>
            <div>
              <button 
                onClick={() => handleEdit(rate)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(rate._id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ShippingRates;
