import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const [isProductListExtended, setIsProductListExtended] = useState(false);
  const [isOrderListExtended, setisOrderListExtended] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProductClick = () => {
    setIsProductListExtended(!isProductListExtended);
  };
  const handleOrderClick = () => {
    setisOrderListExtended(!isOrderListExtended);
  };

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold pb-4 pl-3">AYATRIO</h1>
      <ul>
        <li className="pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full ">
        <img className='inline-block ml-4' src="/Images/dashboard.png" alt="dash" width={20} height={20}/>
          <Link to="/admin" className="ml-4">Dashboard</Link>
        </li>
        <li className="pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full">
        <img className='inline-block ml-4' src="/Images/home.png" alt="home" width={20} height={20}/>
          <Link to="/homePage" className="ml-4">Home</Link>
        </li>

        <li className='pl-3 pt-1.5 pb-1.5 text-lg  rounded-full'>
        <img className='inline-block ml-4 float-left' src="/Images/package.png" alt="package" width={20} height={20} />
        
          <div  className="inline-block ml-4 " >
          <Link to='/product-display' className="inline-block " onClick={handleProductClick}>
            Product 
            {isProductListExtended && (
              <ul>
                <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
                  <Link to='/view-product'>View Product</Link>
                </li>
                <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
                  <Link to='/create-product'>Create Product</Link>
                </li>
              </ul>
            )}
            </Link>
          </div>
        </li>
        <li className='pl-3 pt-1.5 pb-1.5 text-lg  rounded-full'>
        <img className='inline-block ml-4 float-left' src="/Images/order.png" alt="order" width={20} height={20}/>
        
          <div  className="inline-block ml-4 " >
          <Link to='/orderdetails' className="inline-block " onClick={handleOrderClick}>
            Order  
            {isOrderListExtended && (
              <ul>
                <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
                  <Link to='/buy-now'>Buy Now</Link>
                </li>
                <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
                  <Link to='/store-order'>In Store Order</Link>
                </li>
                <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
                  <Link to='/free-sampling'>Free Sampling</Link>
                </li>
                <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
                  <Link to='/free-design'>Free Design</Link>
                </li>
              </ul>
            )}
            </Link>
          </div>
        </li>
        <li className="pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full">
        <img className='inline-block ml-4' src="/Images/transaction.png" alt="transaction" width={20} height={20}/>
          <Link to="/transaction" className="ml-4">Transaction</Link>
        </li>
        <li className="pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full">
        <img className='inline-block ml-4' src="/Images/logout.png" alt="logout" width={20} height={20}/>
          <div className="inline-block hover:cursor-pointer ml-4" onClick={handleLogout}>
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
