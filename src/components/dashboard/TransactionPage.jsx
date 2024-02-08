import React, { useState } from "react";
import Navbar from "../Navbar";

function TransactionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [numToShow, setNumToShow] = useState(20);

  const transactionsData = [
    {
      id: "TXN123",
      paidAmount: "₹410.00",
      paymentMethod: "MasterCard",
      date: "2023-05-30 10:30:00",
    },
    {
      id: "TXN124",
      paidAmount: "₹50.00",
      paymentMethod: "MasterCard",
      date: "2023-01-30 11:30:00",
    },
    {
      id: "TXN125",
      paidAmount: "₹$90.00",
      paymentMethod: "MasterCard",
      date: "2024-01-30 10:30:00",
    },
    {
      id: "SXN126",
      paidAmount: "₹60.00",
      paymentMethod: "MasterCard",
      date: "2020-01-30 08:30:00",
    },
    {
      id: "TXN127",
      paidAmount: "₹670.00",
      paymentMethod: "MasterCard",
      date: "2021-06-30 11:50:00",
    },
    {
      id: "TXN128",
      paidAmount: "₹690.00",
      paymentMethod: "MasterCard",
      date: "2024-01-30 01:30:00",
    },
    // Add more transactions as needed
  ];

  const filteredTransactions = transactionsData
    .filter((transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    )
    .slice(0, numToShow);
  return (
    <div className="flex" style={{minHeight:'728px'}}>
      <div className="flex-grow w-1/5 p-2">
        <Navbar />
      </div>
      <div className="w-4/5 border-l-2 border-gray-300 bg-gray-100 p-5">
      <div className="mb-3 p-3">
          <h1 className="text-4xl font-bold"> Transactions </h1>
        </div>
        <div className="container mx-auto my-8  bg-white border border-black-300 p-4">
          <div className="flex items-center my-4">
            <input
              type="text"
              placeholder="Search by Transaction ID"
              className="border p-2 mr-2 ml-12 w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="border p-2 mr-2 ml-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Sort by Date (Desc)</option>
              <option value="asc">Sort by Date (Asc)</option>
            </select>
            <select
              className="border p-2 mr-12"
              value={numToShow}
              onChange={(e) => setNumToShow(parseInt(e.target.value))}
            >
              <option  value={10}>Show Recent 10 Transactions</option>
              <option  value={5}>Show Recent 5 Transactions</option>
              <option  value={transactionsData.length}>
                Show All Transactions
              </option>
            </select>
          </div>

          <hr />

          <table className="w-full border mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Transaction ID</th>
                <th className="border p-2">Paid Amount</th>
                <th className="border p-2">Payment Method</th>
                <th className="border p-2">Credited Date and Time</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-center">
                  <td className="border p-2">{transaction.id}</td>
                  <td className="border p-2">{transaction.paidAmount}</td>
                  <td className="border p-2">{transaction.paymentMethod}</td>
                  <td className="border p-2">{transaction.date}</td>
                  <td className="border p-2">
                    <button type="button" className="text-white bg-blue-100 hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none ">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
