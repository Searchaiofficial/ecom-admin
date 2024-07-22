import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";

const OfferForm = () => {
  const [offerName, setOfferName] = useState("");
  const [percentageOff, setPercentageOff] = useState(0);
  const [offerTypes, setOffertypes] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [selectedOfferType, setSelectedOfferType] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [Deletedtype, setDeletedtype] = useState();
  const [DeletedProduct, setDeletedProduct] = useState();
  const [deleteOfferType, setDeleteOffertype] = useState();
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [deletedCategory, setDeletedCategory] = useState();
  const [deletedOfferForCategory, setdeletedOfferForCategory] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const limit = 100;
  console.log(allCategory);

  useEffect(() => {
    fetchOfferTypes();
    fetchAllProducts();
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    try {
      const responce = await axios.get(`${BASE_URL}/api/categories`);
      setAllCategory(responce.data);
    } catch (error) {
      console.log("FETCH DEMAND TYPES ERROR :", error);
    }
  };

  const fetchOfferTypes = async () => {
    try {
      const responce = await axios.get(`${BASE_URL}/api/getAllOffers`);
      setOffertypes(responce.data);
    } catch (error) {
      console.log("FETCH DEMAND TYPES ERROR :", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const responce = await axios.get(
        `${BASE_URL}/api/products?limit=${limit}`
      );
      setAllProducts(responce.data);
    } catch (error) {
      console.log("FETCH PRODUCTS TYPES ERROR :", error);
    }
  };

  const handleCreateOffer = async () => {
    try {
      if (offerName === "") {
        window.alert("Offer name is required");
        return;
      }
      const responce = await axios.post(`${BASE_URL}/api/createOffer`, {
        type: offerName,
        percentageOff: percentageOff,
        startDate: startDate,
        endDate: endDate,
      });
      console.log(responce.data.message);
      window.alert(responce.data.message);
      setOfferName("");
      setPercentageOff(0);
      window.location.reload();
    } catch (error) {
      console.log("Error while creating demand", error);
      window.alert("Some error occured try again");
      setOfferName("");
      setPercentageOff(0);
    }
  };

  const handleOfferTypeChange = (e) => {
    setSelectedOfferType(e.target.value);
  };

  const handleAddProductToOffer = async () => {
    try {
      console.log(selectedOfferType);
      console.log(selectedProduct);
      const responce = await axios.post(`${BASE_URL}/api/addProductToOffer`, {
        type: selectedOfferType,
        productId: selectedProduct,
      });
      window.alert(responce.data.message);
    } catch (error) {
      console.log("ADD PRODUCT TO DEMAND ERROR :", error);
      window.alert("Some error occured try again");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const responce = await axios.patch(
        `${BASE_URL}/api/removeProductFromOffer`,
        { type: Deletedtype, productId: DeletedProduct }
      );
      window.alert(responce.data.message);
    } catch (error) {
      console.log("DELETE PRODUCT FROM DEMAND TYPE :", error);
      window.alert("Some error occured try again");
    }
  };

  const handleDeleteOfferType = async () => {
    try {
      console.log(deleteOfferType);
      const encodedOfferType = encodeURIComponent(deleteOfferType); //'70% off'
      const responce = await axios.delete(
        `${BASE_URL}/api/deleteOffer/${encodedOfferType}`
      );
      window.alert(responce.data.message);
    } catch (error) {
      console.log("DELETE OFFER :", error);
      window.alert("Some error occured try again");
    }
  };

  const handleChangeProductsOnOffer = async (e) => {
    setDeletedtype(e.target.value);
  };

  const handleAddCategoryToOffer = async () => {
    try {
      const responce = await axios.post(`${BASE_URL}/api/addCategoryToOffer/`, {
        type: selectedOfferType,
        categoryType: selectedCategory,
      });
      window.alert(responce.data.message);
    } catch (error) {
      console.log("DELETE OFFER :", error);
      window.alert("Some error occured try again");
    }
  };

  const handleRemoveCategory = async () => {
    try {
      const responce = await axios.patch(
        `${BASE_URL}/api/removeCategoryFromOffer/`,
        { type: deletedOfferForCategory, categoryType: deletedCategory }
      );
      window.alert(responce.data.message);
    } catch (error) {
      console.log("ERROR WHILE REMOVING CATEGORY FROM OFFER :", error);
    }
  };

  return (
    <div>
      <div className="space-y-12 bg-white p-6 md:p-12 flex flex-col border-b">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
          Create Offer
        </h2>
        <div className="border-gray-500 border-b pb-12 w-full flex items-center justify-center gap-10">
          <div className="w-[400px]">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium  text-gray-900"
              >
                Offer Name*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    value={offerName}
                    required
                    onChange={(e) => setOfferName(e.target.value)}
                    type="text"
                    id="title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[400px]">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium  text-gray-900"
              >
                Percentage Off*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    value={percentageOff}
                    required
                    onChange={(e) => setPercentageOff(e.target.value)}
                    type="number"
                    id="title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[400px]">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium  text-gray-900"
              >
                Start Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    id="specialstartdate"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[400px]">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium  text-gray-900"
              >
                End Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    id="specialstartdate"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={handleCreateOffer}
              className="bg-blue-500 text-white p-2.5 font-semibold rounded-lg uppercase"
            >
              Create
            </button>
          </div>
        </div>

        {/* Add Product to offer */}

        {/* <div className="flex flex-col items-center gap-12 pb-12 border-b-2">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">Add product to offer</h1>
                    <div className="flex items-center gap-36">
                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose offer type</lable>
                            <select
                                value={selectedOfferType}
                                onChange={handleOfferTypeChange}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >

                                <option key={0} value={null}>
                                    ------
                                </option>

                                {offerTypes.map((item) => (
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
                            <button onClick={handleAddProductToOffer} className="p-3 bg-blue-500 rounded-lg text-white  font-semibold">Add product to offer</button>
                        </div>
                    </div>
                </div> */}

        {/* Remove product from offer */}

        {/* <div className="flex flex-col items-center gap-10 mb-12 border-b-2">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">Remove product from offer</h1>
                    <div className="flex items-center gap-36 mb-12">
                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose demand type</lable>
                            <select
                                value={Deletedtype}
                                onChange={handleChangeProductsOnOffer}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {offerTypes.map((item) => (
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
                            <button onClick={handleDeleteProduct} className="p-3 bg-blue-500 rounded-lg text-white  font-semibold">Delete product from offer</button>
                        </div>
                    </div>
                </div> */}

        {/* Add category to offer */}

        {/* <div className="flex flex-col items-center gap-12 pb-12 border-b-2">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">Add category to offer</h1>
                    <div className="flex items-center gap-36">
                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose offer type</lable>
                            <select
                                value={selectedOfferType}
                                onChange={handleOfferTypeChange}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >

                                <option key={0} value={null}>
                                    ------
                                </option>

                                {offerTypes.map((item) => (
                                    <option key={item._id} value={item.type}>
                                        {item.type}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose Category</lable>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {allCategory.map((item) => (
                                    <option key={item._id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <button onClick={handleAddCategoryToOffer} className="p-3 bg-blue-500 rounded-lg text-white  font-semibold">Add category to offer</button>
                        </div>
                    </div>
                </div>
 */}

        {/* Remove Category from offer */}

        {/* <div className="flex flex-col items-center gap-10 mb-12 border-b-2">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">Remove category from offer</h1>
                    <div className="flex items-center gap-36 mb-12">
                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose offer</lable>
                            <select
                                value={deletedOfferForCategory}
                                onChange={(e) => setdeletedOfferForCategory(e.target.value)}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {offerTypes.map((item) => (
                                    <option key={item._id} value={item.type}>
                                        {item.type}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div>
                            <lable className="text-sm font-medium  text-gray-900">Choose Category</lable>
                            <select
                                value={deletedCategory}
                                onChange={(e) => setDeletedCategory(e.target.value)}
                                id="type"
                                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            >
                                <option key={0} value={null}>
                                    ------
                                </option>

                                {allCategory.map((item) => (
                                    <option key={item._id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <button onClick={handleRemoveCategory} className="p-3 bg-blue-500 rounded-lg text-white  font-semibold">Remove category from offer</button>
                        </div>
                    </div>
                </div> */}

        {/* Delete offer */}

        <div className="flex flex-col items-center gap-10 mb-12">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Delete offer
          </h1>
          <div className="flex items-center gap-36">
            <div>
              <lable className="text-sm font-medium  text-gray-900">
                Choose offer
              </lable>
              <select
                value={deleteOfferType}
                onChange={(e) => setDeleteOffertype(e.target.value)}
                id="type"
                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              >
                <option key={0} value={null}>
                  ------
                </option>

                {offerTypes.map((item) => (
                  <option key={item._id} value={item.type}>
                    {item.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={handleDeleteOfferType}
                className="p-3 bg-blue-500 rounded-lg text-white  font-semibold"
              >
                Delete Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
