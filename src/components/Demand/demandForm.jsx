import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config"

const DemandForm = () => {
    const [demandName, setDemandName] = useState("")
    const [demandTypes, setDemandTypes] = useState([])
    const [AllProducts, setAllProducts] = useState([])
    const [selectedDemandType, setSelectedDemandtype] = useState("")
    const [selectedProduct, setSelectedProduct] = useState()
    const [Deletedtype, setDeletedtype] = useState()
    const [DeletedProduct, setDeletedProduct] = useState()
    const [DeleteDemandType, setDeleteDemandType] = useState()



    const limit = 100

    console.log(selectedDemandType)

    const fetchDemandTypes = async () => {
        try {
            const responce = await axios.get(`${BASE_URL}/api/getAllDemandTypes`)
            setDemandTypes(responce.data)
        } catch (error) {
            console.log("FETCH DEMAND TYPES ERROR :", error)
        }
    }

    const fetchAllProducts = async () => {
        try {
            const responce = await axios.get(`${BASE_URL}/api/products?limit=${limit}`)
            setAllProducts(responce.data)
        } catch (error) {
            console.log("FETCH PRODUCTS TYPES ERROR :", error)
        }
    }

    useEffect(() => {
        fetchDemandTypes()
        fetchAllProducts()
    }, [])

    const handleCreateDemand = async () => {
        try {
            if (demandName === "") {
                window.alert("Demand name is required")
                return
            }
            const responce = await axios.post(`${BASE_URL}/api/createDemandType`, { type: demandName })
            console.log(responce.data.message)
            window.alert(responce.data.message)
            setDemandName("")

        } catch (error) {
            console.log("Error while creating demand", error)
            window.alert("Some error occured try again")
            setDemandName("")

        }
    }


    const handleDemandTypeChange = (e) => {
        setSelectedDemandtype(e.target.value)

    }

    const handleAddProductToDemand = async () => {
        try {
            const responce = await axios.post(`${BASE_URL}/api/addProductToDemandType`, { type: selectedDemandType, productId: selectedProduct })
            window.alert(responce.data.message)
            // setSelectedDemandtype(null)
            // setSelectedProduct(null)
        } catch (error) {
            console.log("ADD PRODUCT TO DEMAND ERROR :", error)
            window.alert("Some error occured try again")
            // setSelectedDemandtype(null)
            // setSelectedProduct(null)
        }
    }

    const handleDeleteProduct = async () => {
        try {
            const responce = await axios.patch(`${BASE_URL}/api/removeProductFromDemandType`, { type: Deletedtype, productId: DeletedProduct })
            window.alert(responce.data.message)
            setDeletedProduct(null)
            setDeletedtype(null)


        } catch (error) {
            console.log("DELETE PRODUCT FROM DEMAND TYPE :", error)
            window.alert("Some error occured try again")
            setDeletedProduct(null)
            setDeletedtype(null)
        }
    }

    const handleDeleteDemandType = async () => {
        try {
            const responce = await axios.delete(`${BASE_URL}/api/deleteDemandType/${DeleteDemandType}`)
            window.alert(responce.data.message)
            setDeleteDemandType(null)
            window.location.reload()

        } catch (error) {
            console.log("DELETE PRODUCT FROM DEMAND TYPE :", error)
            window.alert("Some error occured try again")
            setDeleteDemandType(null)


        }
    }


    return (
        <div>
            <div className="space-y-12 bg-white p-6 md:p-12 flex flex-col ">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
                    Create Demand
                </h2>
                <div className="border-gray-500 border-b pb-12 w-full flex items-center justify-center gap-10">

                    <div className="w-[400px]">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium  text-gray-900"
                            >
                                Demand Name*
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                                    <input
                                        value={demandName}
                                        required
                                        onChange={(e) => setDemandName(e.target.value)}
                                        type="text"
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="mt-5">
                        <button onClick={handleCreateDemand} className="bg-blue-500 text-white p-2.5 font-semibold rounded-lg uppercase">Create</button>
                    </div>
                </div>


                {/* Add Product to demand type */}

                {/* <div className="flex flex-col items-center gap-12 pb-12 border-b-2">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">Add product to demand type</h1>
                    <div className="flex items-center gap-36">
                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose demand type</lable>
                            <select
                                value={selectedDemandType}
                                onChange={handleDemandTypeChange}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {demandTypes.map((item) => (
                                    <option key={item._id} value={item.type}>
                                        {item.type}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose Product</lable>
                            <select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {AllProducts.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.category}-{item.patternNumber}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <button onClick={handleAddProductToDemand} className="p-3 bg-blue-500 rounded-lg text-white  font-semibold">Add product to Demand type</button>
                        </div>
                    </div>
                </div> */}


                {/* Delete product from demand type */}

                {/* <div className="flex flex-col items-center gap-10 mb-12 border-b-2">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">Delete product from demand type</h1>
                    <div className="flex items-center gap-36 mb-12">
                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose demand type</lable>
                            <select
                                value={Deletedtype}
                                onChange={(e) => setDeletedtype(e.target.value)}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {demandTypes.map((item) => (
                                    <option key={item._id} value={item.type}>
                                        {item.type}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose Product</lable>
                            <select
                                value={DeletedProduct}
                                onChange={(e) => setDeletedProduct(e.target.value)}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {AllProducts.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.category}-{item.patternNumber}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <button onClick={handleDeleteProduct} className="p-3 bg-blue-500 rounded-lg text-white  font-semibold">Delete product from demand type</button>
                        </div>
                    </div>
                </div> */}


                {/* Delete Demand type */}

                <div className="flex flex-col items-center gap-10 mb-12">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">Delete demand type</h1>
                    <div className="flex items-center gap-36">
                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose demand type</lable>
                            <select
                                value={DeleteDemandType}
                                onChange={(e) => setDeleteDemandType(e.target.value)}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {demandTypes.map((item) => (
                                    <option key={item._id} value={item.type}>
                                        {item.type}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <button onClick={handleDeleteDemandType} className="p-3 bg-blue-500 rounded-lg text-white  font-semibold">Delete product from demand type</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DemandForm;