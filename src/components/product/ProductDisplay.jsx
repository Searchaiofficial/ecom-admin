import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import Navbar from "../Navbar";
import UpdateProduct from "./UpdateProduct";
import { useNavigate } from "react-router-dom";

const ProductDisplay = () => {
  const [modalOpen, setModalOpen] = useState(false);


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const [productID, setProductID] = useState({}); // [1
  const handleUpdate = (productId) => () => {
    setProductID(productId);
    // toggleModal();
    window.location.replace(`/update/${productId}`)

  };

  const [productData, setProductData] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const limit = 100;
    const apiUrl = `${BASE_URL}/api/products?limit=${limit}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (productId) => {
    fetch(`${BASE_URL}/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleRoom = (room, id, productObjectId) => {
    console.log(id)
    console.log(productObjectId)
    navigate(`/homePage/create-room-section/${room}?productId=${id}&productObjectId=${productObjectId}`);
  };

  const handleToggleReadMore = (productId) => {
    console.log(productId)
    setExpandedProduct((prev) => (prev === productId ? null : productId));
  };

  console.log(productData);
  return (
    <>
      <div className="flex" style={{ minHeight: "728px" }}>
        <div className="flex-grow w-1/5 p-2">
          <Navbar />
        </div>
        <div className="flex-grow w-4/5 border-l-2 border-gray-300">
          <div className="mx-6 mb-8">
            {/* <h2 className='pl-4 pt-4 font-bold text-2xl'>Welcome to AYATRIO</h2> */}
            <h2 className="pb-6 pt-1 font-bold text-center text-xl">
              Product Information
            </h2>
            <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productData &&
                productData.map((product) => (
                  <div
                    key={product._id}
                    style={{ marginBottom: "30px" }}
                    className="relative pb-10 p-2 border rounded"
                  >
                    <img
                      key={product._id}
                      src={product.images[0]}
                      alt={`Product Image`}
                      className="mb-6 w-[282px]"
                    />
                    <h3 className="font-bold text-orange-500">
                      {product.productTitle}
                    </h3>
                    <p>
                      <b>Product ID:</b> {product.productId}
                    </p>
                    <p>
                      <b>Pattern Number:</b> {product.patternNumber}
                    </p>
                    <p>
                      <b>Category:</b> {product.category}
                    </p>
                    <p>
                      <b>Subcategory:</b> {product.subcategory}
                    </p>
                    <p>
                      <b>Collection Name:</b> {product.collectionName}
                    </p>
                    {expandedProduct === product._id ? (
                      <>
                        <p>
                          <b>Room Category:</b>
                          {product.roomCategory.map((category, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleRoom(category, product.productId, product._id)
                              }
                              className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            >
                              {category}
                            </button>
                          ))}
                        </p>
                        <p>
                          <b>Style:</b> {product.style}
                        </p>
                        {/* <p>
                          <b>Dimensions:</b> {product.dimensions.length.value}{" "}
                          mm x {product.dimensions.width.value} mm x{" "}
                          {product.dimensions.thickness.value} mm
                        </p> */}
                        <p>
                          <b>Colors:</b> {product.colors.join(", ")}
                        </p>
                        <p>
                          <b>Unit Type:</b> {product.unitType}
                        </p>
                        <p>
                          <b>Units Available:</b> {product.units}
                        </p>
                        <p>
                          <b>Price per Unit:</b> ${product.perUnitPrice}
                        </p>
                        <p>
                          <b>purchaseMode:</b> {product.purchaseMode.join(", ")}
                        </p>
                        <p>
                          <b>productDescription:</b>{" "}
                          {product.productDescription}
                        </p>
                        <p>
                          <b>Popularity:</b> {product.popularity}
                        </p>

                        <h4 className="font-bold">Ratings:</h4>
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
                      <p
                        className="cursor-pointer text-blue-500"
                        onClick={() => handleToggleReadMore(product._id)}
                      >
                        Read More
                      </p>
                    )}
                    <div className="flex justify-around w-full gap-4">
                      <button
                        type="button"
                        className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1"
                        onClick={handleUpdate(product._id)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="mt-4 w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <UpdateProduct
          toggleModal={toggleModal}
          productId={productID}
        />
      )}
    </>
  );
};

export default ProductDisplay;
