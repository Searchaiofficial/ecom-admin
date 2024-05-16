import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../config";

const UpdateProductForm = () => {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const [demandTypes, setDemandTypes] = useState([])
    const [demandName, setDemandName] = useState()
    const [offerName, setOfferName] = useState()
    const [specialprice, setSpecialprice] = useState({});
    const [offerTypes, setOffertypes] = useState([])


    const fetchProduct = async () => {
        try {
            const responce = await axios.get(`${BASE_URL}/api/getSingleProduct?id=${id}`)
            setProduct(responce.data)
            // setDemandName(responce.data.demandtype)
            setDemandName(responce.data.demandtype)
            setOfferName(responce.data?.offer)

        } catch (error) {
            console.log("ERROR FETCHING PRODUCT DETAILS :", error)

        }
    }

    const fetchDemandTypes = async () => {
        try {
            const responce = await axios.get(`${BASE_URL}/api/getAllDemandTypes`)
            setDemandTypes(responce.data)
        } catch (error) {
            console.log("FETCH DEMAND TYPES ERROR :", error)
        }
    }

    const fetchOfferTypes = async () => {
        try {
            const responce = await axios.get(`${BASE_URL}/api/getAllOffers`)
            setOffertypes(responce.data)
        } catch (error) {
            console.log("FETCH DEMAND TYPES ERROR :", error)
        }
    }


    useEffect(() => {
        fetchProduct()
        fetchDemandTypes()
        fetchOfferTypes()
    }, [])

    // console.log(product)
    // console.log(demandTypes)
    // console.log(demandName)
    // console.log(specialprice)
    // console.log(offerTypes)


    const updateDemandType = async () => {
        try {
            const responce = await axios.post(`${BASE_URL}/api/addProductToDemandType`, { type: demandName, productId: id })
            window.alert(responce.data.message)

        } catch (error) {
            console.log("ADD PRODUCT TO DEMAND ERROR :", error)
            window.alert("Some error occured try again")

        }
    }


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSpecialprice({ ...specialprice, [name]: value });
    };


    const updateSpecialPrice = async () => {
        try {
            const responce = await axios.patch(`${BASE_URL}/api/updateSpecialPrice`, { productId: id, specialprice })
            window.alert(responce.data.message)

        } catch (error) {
            console.log("ADD PRODUCT TO DEMAND ERROR :", error)
            window.alert("Some error occured try again")

        }
    };

    const RemoveProductfromDemandType = async () => {
        try {
            const responce = await axios.patch(`${BASE_URL}/api/removeProductFromDemandType`, { type: demandName, productId: id })
            window.alert(responce.data.message)
            setDemandName(null)

        } catch (error) {
            console.log("DELETE PRODUCT FROM DEMAND TYPE :", error)
            window.alert("Some error occured try again")
        }
    }

    const updateOfferType = async () => {
        try {
            console.log(offerName)
            console.log(id)
            // const responce = await axios.post(`${BASE_URL}/api/addProductToOffer`, { type: offerName, productId: id })
            // window.alert(responce.data.message)

        } catch (error) {
            console.log("ADD PRODUCT TO DEMAND ERROR :", error)
            window.alert("Some error occured try again")
        }
    }

    const RemoveProductfromOfferType = async () => {
        try {
            const responce = await axios.patch(`${BASE_URL}/api/removeProductFromOffer`, { type: offerName, productId: id })
            window.alert(responce.data.message)

        } catch (error) {
            console.log("DELETE PRODUCT FROM DEMAND TYPE :", error)
            window.alert("Some error occured try again")
        }
    }



    return (
        <div>
            <div className="flex flex-col p-4 gap-10">
                <h1 className="text-3xl font-semibold text-gray-900">Update Product</h1>
                <div>
                    <div className="flex gap-5 items-center">
                        <h2>Product Title : </h2>
                        <p>{product?.productTitle}</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <h2>Pattern Number: </h2>
                        <p>{product?.patternNumber}</p>
                    </div>
                </div>

                {/* Update Demand Type */}

                <div className="flex items-center gap-12">
                    <lable className="font-semibold text-lg text-gray-700">Demand Type :</lable>
                    <select className="py-1 px-2 rounded-md bg-gray-100 " value={demandName} onChange={(e) => setDemandName(e.target.value)}>
                        <opiton key={0} value={null}>
                            -----
                        </opiton>
                        {

                            demandTypes && demandTypes.map((demand) => (
                                <option key={demand._id} value={demand.type}>
                                    {demand.type}
                                </option>
                            ))
                        }
                    </select>
                    <button onClick={updateDemandType} className="bg-blue-500 text-white p-2 rounded-lg">Update Demand type</button>
                    <button onClick={RemoveProductfromDemandType} className="bg-red-500 text-white p-2 rounded-lg">Remove Product From Demand type</button>
                </div>

                {/* Offer */}

                <div className="flex items-center gap-20">
                    <label className="font-semibold text-lg text-gray-700">Offer Type:</label>
                    <select className="py-1 px-2 rounded-md bg-gray-100 min-w-[213px]" value={offerName} onChange={(e) => setOfferName(e.target.value)}>
                        <option key={0} value="">
                            -----
                        </option>
                        {offerTypes && offerTypes.map((demand) => (
                            <option key={demand._id} value={demand.type}>
                                {demand.type}
                            </option>
                        ))}
                    </select>
                    <button onClick={updateOfferType} className="bg-blue-500 text-white p-2 rounded-lg -ml-8">Update Demand type</button>
                    <button onClick={RemoveProductfromOfferType} className="bg-red-500 text-white p-2 rounded-lg -ml-8 min-w-[275px]">Remove Product From Offer type</button>
                </div>

                {/* Update special price */}

                <div className="flex flex-col p-6 border gap-10  w-[50%]">
                    <div className="flex items-center gap-14">
                        <lable className="font-semibold text-lg text-gray-700">Special Price :</lable>
                        <input type="number" name="price" onChange={handleOnChange} id="specialPrice" className="bg-gray-100 py-1 px-2 rounded-md min-w-[215px]" />
                    </div>
                    <div className="flex items-center gap-14">
                        <label
                            htmlFor="startDate"
                            className="font-semibold text-lg text-gray-700"
                        >
                            Start Date :
                        </label>
                        <input
                            type="date"
                            className="bg-gray-100 ml-5 py-1 px-2 rounded-md min-w-[215px]"
                            name="startDate"
                            id="startDate"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex items-center gap-14">
                        <label
                            htmlFor="endDate"
                            className="font-semibold text-lg text-gray-700"
                        >
                            End Date :
                        </label>
                        <input
                            type="date"
                            className="bg-gray-100 ml-7 py-1 px-2 rounded-md min-w-[215px]"
                            name="endDate"
                            id="endDate"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <button onClick={updateSpecialPrice} className="bg-blue-500 p-3 text-white rounded-lg uppercase font-semibold">Update</button>
                        <button onClick={() => window.location.reload()} className="bg-gray-100 p-3 text-black border-2 rounded-lg uppercase font-semibold">Cancel</button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default UpdateProductForm;