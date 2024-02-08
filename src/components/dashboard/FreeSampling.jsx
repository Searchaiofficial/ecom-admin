import React from 'react'
import Navbar from '../Navbar';

function FreeSampling() {
    const orderItems = [
        { product: "Flooring 1", quantity: 2, unitPrice: 10.99 },
        { product: "Flooring 2", quantity: 1, unitPrice: 45.49 },
        { product: "Flooring 3", quantity: 3, unitPrice: 15.75 },
        // Add more items as needed
      ];
    
      const shippingCharges = 5.99;
      // Calculate subtotal
      const subtotal = orderItems.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0
      );
    
      // Calculate total including shipping charges
      const total = subtotal + shippingCharges;
  return (
    <div className="flex" style={{minHeight:'728px'}}>
      <div className="flex-grow w-1/5 p-2">
        <Navbar />
      </div>
      <div className="w-4/5 border  font-sans-serif bg-gray-100 p-5">
        <div className="mb-3 p-3">
          <h1 className="text-4xl font-bold"> Free Sampling </h1>
        </div>
        <div className="bg-white p-4">
        <div className=" mb-12 ">
          <div className=" w-full p-3 mb-3">
            <h1 className="text-large font-bold"> TUESDAY 28TH JAN 2024</h1>
          </div>
          <hr />
          <div className="flex flex-wrap mt-3">
            <div className="flex-1 ">
              <div className='inline-block ml-4 float-left' ><img className=' ml-4' src="/Images/customer.png" alt="customer" width={40} height={40}/></div>
              <div className="ml-4 inline-block">
                <h2 className="font-bold">Customer</h2>
                <p className="font-thin">John Alexaander</p>
                <p className="font-thin">alex@example.com</p>
                <p className="font-thin">+91 8976729232</p>
                <a href="#" className="text-blue-400">
                  View Profile
                </a>
              </div>
            </div>
            <div className="flex-1 ">
            <div className='inline-block ml-4 float-left' ><img className=' ml-4' src="/Images/customer.png" alt="customer" width={40} height={40}/></div>
              <div className="ml-4 inline-block">
                <h2 className="font-bold">Customer</h2>
                <p className="font-thin">Shipping :<span className="font-semibold">Fargo Express</span></p>
                <p className="font-thin"> Payment Method : <span className="font-semibold">card</span></p>
                <p className="font-thin"> Status : <span className="font-semibold text-green-400">Success</span></p>
                <a href="#" className="text-blue-400">Download</a>
              </div>
            </div>
            <div className="flex-1 ">
            <div className='inline-block ml-4 float-left' ><img className=' ml-4' src="/Images/delivery2.png" alt="delivery" width={40} height={40}/></div>
              <div className="ml-4 inline-block">
                <h2 className="font-bold">Delivery To</h2>
                <p className="font-thin">
                  City : <span className="font-semibold">Fargo Express</span>
                </p>
                <p className="font-thin">
                  Street : <span className="font-semibold">Beruniy 369</span>
                </p>
                <p className="font-thin">
                  Address :{" "}
                  <span className="font-semibold">
                    Block A, House 123 , Floo2
                  </span>
                </p>
                <a href="#" className="text-blue-400">
                  View Map
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex bg-white">
        <div  className="w-2/3">
          <div className="order-details-box">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orderItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{item.product}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">₹{item.unitPrice.toFixed(2)}</td>
                    <td className="border p-2">
                    ₹{(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="subtotal-section mt-4 flex justify-end w-1/5 float-right flex flex-col">
              <div className="subtotal font-bold">
                Subtotal: ₹{subtotal.toFixed(2)}
              </div>
              <div className="shipping font-bold ml-4">
                Shipping: ₹{shippingCharges.toFixed(2)}
              </div>
              <div className="total font-bold ml-4">
                Total: ₹{total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="border w-1/3 ml-3 mb-3 text-center">
          Payment Info
        </div>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default FreeSampling