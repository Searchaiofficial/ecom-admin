import React from "react";
import Navbar from "../Navbar";
import BarChart from "./BarChart";
import PieChart from "./PieChart";


function Dashboard() {
  const recentOrdersData = [
    { id: 1, product: "Flooring 1", quantity: 2, amount: 120 },
    { id: 2, product: "Flooring 2", quantity: 1, amount: 50 },
    { id: 3, product: "Flooring 3", quantity: 3, amount: 200 },
    // Add more sample orders as needed
  ];
  const salesData = [
    5000, 8000, 12000, 6000, 10000, 7500, 11000, 9000, 8500, 7000, 9500, 8000,
  ];

  return (
    <div className="flex">
      <div className="flex-grow w-1/5 p-2">
        <Navbar />
      </div>
      <div className=" w-4/5 border-l-2 border-gray-100 bg-gray-100 p-6">
        <h2 className="text-4xl font-bold p-3">Dashboard</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* Row 1 */}
          <div className="bg-white p-4 flex ">
            <div className="w-16 h-16  rounded-full bg-gradient-to-r from-gray-100 to-gray-100 flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-2xl"><img  src="/Images/user.png" alt="customer" width={30} height={30}/></span>
            </div>

            <div className="ml-3">
              <h2 className="text-gray-700 ">Total User Visit</h2>
              <h2 className="text-2xl font-bold text-gray-800">15</h2>
            </div>
          </div>
          <div className="bg-white p-4 flex ">
            <div className="w-16 h-16  rounded-full bg-gradient-to-r from-gray-100 to-gray-100 flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-2xl">₹</span>
            </div>

            <div className="ml-3">
              <h2 className="text-gray-700 ">Total Orders</h2>
              <h2 className="text-2xl font-bold text-gray-800">32</h2>
            </div>
          </div>
          <div className="bg-white p-4 flex ">
            <div className="w-16 h-16  rounded-full bg-gradient-to-r from-gray-100 to-gray-100 flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-2xl">₹</span>
            </div>

            <div className="ml-3">
              <h2 className="text-gray-700 ">Total Revenue</h2>
              <h2 className="text-2xl font-bold text-gray-800">300000</h2>
            </div>
          </div>

          {/* Row 2 */}
          <div className="bg-white p-4 col-span-2">
            <BarChart data={salesData} />
          </div>

          <div className="bg-white p-4">
            <PieChart />
          </div>

          {/* Row 3 */}
          <div className="bg-white p-4 col-span-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Recent Orders
              </h2>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Product
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {recentOrdersData.map((order) => (
                    <tr key={order.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.product}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                      ₹{order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
