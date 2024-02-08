import React from 'react'
import ProductForm from '../components/product/ProductForm'
import AdminNavbar from '../components/AdminNavbar'
import Navbar from '../components/Navbar'

const AdminProductFormPage = () => {
  return (
    <div>
      <div className="flex">
      <div className="flex-grow w-1/5 p-2">
        <Navbar />
      </div>
      <div className='w-4/5 border-l-2 border-gray-300'>
      <ProductForm />
      </div>
      </div>
    </div>
  )
}

export default AdminProductFormPage