import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../../config"

const ShippingRateForm = ({ onSubmit, editRate }) => {
  const [minDistance, setMinDistance] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [charge, setCharge] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (editRate) {
      setMinDistance(editRate.minDistance);
      setMaxDistance(editRate.maxDistance);
      setCharge(editRate.charge);
      setEstimatedDelivery(editRate.estimatedDelivery);
      setId(editRate._id);
    } else {
      setMinDistance('');
      setMaxDistance('');
      setCharge('');
      setId(null);
    }
  }, [editRate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.patch(`${BASE_URL}/api/shippingRate/${id}`, { minDistance, maxDistance, charge, estimatedDelivery });
      } else {
        await axios.post(`${BASE_URL}/api/shippingRate`, { minDistance, maxDistance, charge,estimatedDelivery });
      }
      setMinDistance('');
      setMaxDistance('');
      setEstimatedDelivery('');
      setCharge('');
      setId(null);
      onSubmit();
    } catch (error) {
      console.error('Error saving shipping rate', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Min Distance</label>
        <input 
          type="number" 
          value={minDistance} 
          onChange={(e) => setMinDistance(e.target.value)} 
          required 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Max Distance</label>
        <input 
          type="number" 
          value={maxDistance} 
          onChange={(e) => setMaxDistance(e.target.value)} 
          required 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Charge</label>
        <input 
          type="number" 
          value={charge} 
          onChange={(e) => setCharge(e.target.value)} 
          required 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Estimated Delivery (Day)</label>
        <input 
          type="number" 
          value={estimatedDelivery} 
          onChange={(e) => setEstimatedDelivery(e.target.value)} 
          required 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button 
        type="submit" 
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        {id ? 'Update' : 'Add'} Shipping Rate
      </button>
    </form>
  );
};

export default ShippingRateForm;
