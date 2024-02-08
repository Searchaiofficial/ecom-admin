import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';
import Navbar from '../Navbar';

const ProductDisplay = () => {
  const [productData, setProductData] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    const limit = 100;
    const apiUrl = `${BASE_URL}/api/products?limit=${limit}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (productId) => {
    fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error deleting data:', error));
  };

  const handleToggleReadMore = (productId) => {
    setExpandedProduct((prev) => (prev === productId ? null : productId));
  };

  return (
    <>
      <div className='flex' style={{minHeight:'728px'}}>
        <div className='flex-grow w-1/5 p-2'>
          <Navbar/>
        </div>
        <div className='flex-grow w-4/5 border-l-2 border-gray-300'>
          <div className='mx-6 mb-8'>
            {/* <h2 className='pl-4 pt-4 font-bold text-2xl'>Welcome to AYATRIO</h2> */}
            <h2 className='pb-6 pt-1 font-bold text-center text-xl'>Product Information</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productData && productData.map((product) => (
                <div key={product._id} style={{ marginBottom: '30px' }} className='p-2 border rounded'>
                  <img key={product._id} src={product.images[0]} alt={`Product Image`} className='mb-6 w-[282px]' />
                  <h3 className='font-bold text-orange-500'>{product.productTitle}</h3>
                  <p><b>Product ID:</b> {product.productId}</p>
                  <p><b>Pattern Number:</b> {product.patternNumber}</p>
                  <p><b>Category:</b> {product.category}</p>
                  <p><b>Subcategory:</b> {product.subcategory}</p>
                  <p><b>Collection Name:</b> {product.collectionName}</p>
                  {expandedProduct === product._id ? (
                    <>
                      <p><b>Room Category:</b> {product.roomCategory}</p>
                      <p><b>Style:</b> {product.style}</p>
                      <p><b>Dimensions:</b> {product.dimensions.length.value} mm x {product.dimensions.width.value} mm x {product.dimensions.thickness.value} mm</p>
                      <p><b>Colors:</b> {product.colors.join(', ')}</p>
                      <p><b>Unit Type:</b> {product.unitType}</p>
                      <p><b>Units Available:</b> {product.units}</p>
                      <p><b>Price per Unit:</b> ${product.perUnitPrice}</p>
                      <p><b>Total Price: </b>${product.totalPrice}</p>
                      <p><b>purchaseMode:</b> {product.purchaseMode.join(', ')}</p>
                      <p><b>productDescription:</b> {product.productDescription}</p>
                      <p><b>Popularity:</b> {product.popularity}</p>

                      <h4 className='font-bold'>Ratings:</h4>
                      {product.ratings.length > 0 ? (
                        product.ratings.map((rating) => (
                          <div key={rating._id}>
                            <p>User ID: {rating.userId}</p>
                            <p>Rating: {rating.rating}</p>
                            <p>Review: {rating.review}</p>
                            <p>Timestamp: {rating.timestamp}</p>
                          </div>
                        ))
                      ) : (
                        <p>No ratings available</p>
                      )}

                      <p
                        type="button"
                        className="cursor-pointer text-blue-500"
                        onClick={() => setExpandedProduct(null)}
                      >
                        Read Less
                      </p>
                    </>
                  ) : (
                    <p className="cursor-pointer text-blue-500" onClick={() => handleToggleReadMore(product._id)}>
                      Read More
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-4 ml-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
