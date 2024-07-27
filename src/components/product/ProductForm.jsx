import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import Review from '../homepage/review/Review';
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "../../../config";
import axios from "axios";

const DimensionInput = ({ label, value, unit, onChange }) => {
  return (
    <div className="sm:col-span-2">
      <label>{label}:</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange({ value: e.target.value, unit })}
        className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
      />
      <select
        value={unit}
        onChange={(e) => onChange({ value, unit: e.target.value })}
      >
        <option value="mm">mm</option>
        <option value="cm">cm</option>
        <option value="m">m</option>
        <option value="in">in</option>
        <option value="ft">ft</option>
      </select>
    </div>
  );
};

const ColorCheckbox = ({ color, isChecked, onChange }) => {
  return (
    <label key={color} className="inline-flex items-center mt-1">
      <input
        type="checkbox"
        value={color}
        checked={isChecked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-orange-600"
      />
      <span className="ml-1 text-gray-700 mr-4">{color}</span>
    </label>
  );
};

const PurchaseModeCheckBox = ({ purchaseMode, isChecked, onChange }) => {
  return (
    <label key={purchaseMode} className="inline-flex items-center mt-1">
      <input
        type="checkbox"
        value={purchaseMode}
        checked={isChecked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-orange-600"
      />
      <span className="ml-1 text-gray-700 mr-4">{purchaseMode}</span>
    </label>
  );
};

function ProductForm() {
  // form related
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const {
    fields: coreValues,
    append: appendCoreValue,
    remove: removeCoreValue,
  } = useFieldArray({
    control,
    name: "coreValues",
  });
  const {
    fields: features,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });
  const {
    fields: colors,
    append: appendColors,
    remove: removeColors,
  } = useFieldArray({
    control,
    name: "colors",
  });

  const {
    fields: productDimensions,
    append: appendProductDimensions,
    remove: removeProductDimensions,
  } = useFieldArray({
    control,
    name: "productDimensions",
  });

  // -------------------------------------------------

  const roomOptions = [
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Bathroom",
    "Balcony",
    "Office Room",
    "Guest Room",
    "Pooja Room",
    "Kids Room",
    "Kitchen",
  ];

  // const categoryOptions = {
  //   Wallpaper: [
  //     "3D",
  //     "Abstract",
  //     "Animals & Birds",
  //     "Flock & Luxury",
  //     "Brick & Stone",
  //     "Customize",
  //     "Striped",
  //     "Flower & Trees",
  //     "Vintage",
  //     "Art Deco",
  //     "Geometric",
  //     "Kid",
  //     "Modern",
  //     "Plain & Texture",
  //     "Traditional",
  //     "Wood",
  //   ],
  //   Flooring: [
  //     "Carpet",
  //     "Carpet Tiles",
  //     "Vinyl Floor",
  //     "Luxury Vinyl Plank",
  //     "Laminate",
  //     "Wooden Floor",
  //     "Deck Wood",
  //   ],
  //   Blinds: [
  //     "Vertical Blinds",
  //     "Roller Blinds",
  //     "Zebra Blinds",
  //     "Shutter Blinds",
  //     "Wooden Blinds",
  //   ],
  //   Curtains: ["Abstract", "Geometric", "Plains & Textures", "Leave", "Floral"],
  //   "Sport & Gym Flooring": [
  //     "Artificial Grass",
  //     "Interlocking Mat",
  //     "Rubber Tiles",
  //     "Vinyl Sports Floors",
  //   ],
  // };

  const availablePurchaseMode = [
    "Only Online",
    "Buy online with in-store request",
    "In-store request Only",
  ];
  const typeofprice = ["Special Price", "Discounted Price"];

  // --

  const options = [
    { label: "No", value: "no" },
    { label: "Yes", value: "yes" },
  ];
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [productType, setProductType] = useState("normal");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [color, setColor] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [price, setPrice] = useState([]);
  const [images, setImages] = useState([]);
  const [demand, setDemand] = useState("");
  const [priceType, setPriceType] = useState("");
  const [selectedPurchaseMode, setSelectedPurchaseMode] = useState([]);
  const [pdf, setPdf] = useState("");
  const [roomMultipleSelector, setRoomMultipleSelector] = useState([]);
  const [demandTypes, setDemandTypes] = useState([]);
  const [productAvailability, setProductAvailability] = useState("in stock");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };
  const handleProductChange = (e) => {
    const demandtyp = e.target.value;
    setDemand(demandtyp);
    // setProduct('');
  };
  const handlePriceChange = (e) => {
    setPriceType(e.target.value);
    const price = e.target.value;
    setPrice(price);
    setPrice("");
    setProductDiscountedPrice(null);
  };
  const handleSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSelectedSubcategory(subcategory);
  };

  // --

  const [dimensions, setDimensions] = useState({
    length: { value: "", unit: "mm" },
    width: { value: "", unit: "mm" },
    thickness: { value: "", unit: "mm" },
  });

  const handleDimensionChange = (dimension, newValue) => {
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [dimension]: newValue,
    }));
  };

  // --

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/getSubCategories/${selectedCategory}`
      );
      const responseData = await response.json();
      setSubCategoryOptions(
        responseData.map((subCategory) => subCategory.name)
      );
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`);
      const responseData = await response.json();
      setCategoryOptions(responseData.map((category) => category.name));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAllDemandTypes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getAllDemandTypes`);
      const responseData = await response.json();
      setDemandTypes(responseData.map((demand) => demand.type));
    } catch (error) {
      console.error("Error fetching demand types:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getAuthors`);
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      const selectAuthorData = [];
      responseData.forEach((author) => {
        const authorName = `${author.displayName}-${author.email}`;
        const id = author._id;
        selectAuthorData.push({ authorName, id });
      });
      setAuthors(selectAuthorData);
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  };

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    if (demandTypes.length === 0) {
      fetchAllDemandTypes();
    }
    if (categoryOptions.length === 0) {
      fetchCategories();
    }
    if (selectedCategory) {
      fetchSubCategories();
      const colorsForCategory = getColorsForCategory(selectedCategory);
      setAvailableColors(colorsForCategory);
    } else {
      setAvailableColors([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, categoryOptions]);

  console.log(selectedCategory);

  const [categoryColors, setCategoryColors] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/getCategoryByName/${selectedCategory}`
      );
      console.log(response.data);
      setCategoryColors(response.data?.availableColors);
    };

    if (selectedCategory) {
      fetchCategoryDetails();
    }
  }, [selectedCategory]);

  const getColorsForCategory = (category) => {
    switch (category) {
      case "Decor":
        return ["Oak Brown", "Maple Red", "Cherry Blossom", "Walnut", "Teak"];
      case "Wallpaper":
        return [
          "Sky Blue",
          "Forest Green",
          "Sunset Orange",
          "Rose Pink",
          "Charcoal Gray",
        ];
      case "Curtains":
        return ["Cream", "Biege", "Sunset Orange", "Rose Pink", "light Gray"];
      case "Bed and Dining":
        return ["Sky Blue", "Green", "Orange", "Peral white", "Gray"];
      default:
        return ["Oak Brown", "Maple Red", "Cherry Blossom", "Walnut", "Teak"];
    }
  };

  const handleImageChange = (e, index, section) => {
    const file = e.target.files[0];
    if (section === "features") {
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImages(`features${index}`, imageUrl);
      }
    } else if (section === "corevalues") {
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImages(`corevalues${index}`, imageUrl);
      }
    } else {
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImages(`img${index}`, imageUrl);
      }
    }
  };

  const handlePurchaseModeChange = (e) => {
    const purchaseMode = e.target.value;
    if (selectedPurchaseMode.includes(purchaseMode)) {
      setSelectedPurchaseMode((prevMode) =>
        prevMode.filter((c) => c !== purchaseMode)
      );
    } else {
      setSelectedPurchaseMode((prevMode) => [...prevMode, purchaseMode]);
    }
  };

  const handlePDFchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const pdfUrl = URL.createObjectURL(file);
      console.log(pdfUrl);
      setPdf(pdfUrl);
    }
  };

  const handleMultipleSelector = (e) => {
    const { options } = e.target;
    if (options) {
      setRoomMultipleSelector(
        Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value)
      );
    }
  };

  const [loading, setLoading] = useState(false);

  const [offerTypes, setOfferTypes] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");

  const fetchOfferTypes = async () => {
    try {
      const responce = await axios.get(`${BASE_URL}/api/getAllOffers`);
      setOfferTypes(responce.data);
    } catch (error) {
      console.log("FETCH OFFER TYPES ERROR :", error);
    }
  };

  useEffect(() => {
    fetchOfferTypes();
  }, []);

  const [productPrice, setProductPrice] = useState(null);
  const [productDiscountedPrice, setProductDiscountedPrice] = useState(null);
  const handleOfferTypeChange = (e) => {
    const selectedValue = e.target.value;
    const parsedValue = selectedValue && JSON.parse(selectedValue);
    setSelectedOffer(parsedValue);
    if (parsedValue) {
      setProductDiscountedPrice(
        productPrice - (productPrice * parsedValue.percentageOff) / 100
      );
    } else {
      setProductDiscountedPrice('')
    }

  };

  return (
    <form
      noValidate
      // submit method of the form 💥
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        console.log(data);
        const formData = new FormData();
        // console.log("Form-Data:", data);
        const coreValuesData = getValues("coreValues");
        const productDimensionsData = getValues("productDimensions");
        const featuresData = getValues("features");
        const colorsData = getValues("colors");
        console.log("colorsData", colorsData);
        console.log("selectedColor", selectedColors);
        colors.forEach((color, index) => {
          formData.append(`colors[${index}]`, color.color);
          color.images.forEach((image) => {
            formData.append(`colors`, image[0]);
          });
        });
        console.log("coreValuesData", coreValuesData);
        console.log("featuresData", featuresData);
        // normal text data
        formData.append("productType", productType);
        formData.append("title", data.title);
        console.log(data.patternNumber);
        formData.append("patternNumber", data.patternNumber);
        formData.append("room", data.room);

        formData.append("designStyle", data.designStyle);
        console.log(selectedCategory);
        formData.append("category", selectedCategory);
        formData.append("demandtype", demand);
        formData.append("subCategory", selectedSubcategory);
        formData.append("shortDescription", data.shortDescription);
        formData.append("color", color);
        formData.append("units", data.units);
        formData.append("unitType", data.unitType);
        // formData.append("totalPricePerUnit", data.totalPricePerUnit);
        formData.append("discountedprice", productDiscountedPrice);
        formData.append("perUnitType", data.perUnitType);
        formData.append("material", data.material);
        if (data.specialprice) {
          formData.append("specialprice[price]", data.specialprice.price);
          formData.append(
            "specialprice[startDate]",
            data.specialprice.startDate
          );
          formData.append("specialprice[endDate]", data.specialprice.endDate);
        }
        // formData.append("specialprice", data.specialprice);
        formData.append("availability", productAvailability);
        formData.append("availabilityTime[from]", data.availabilityTime.from);
        formData.append("availabilityTime[to]", data.availabilityTime.to);
        formData.append("perUnitPrice", data.perUnitPrice);
        formData.append("expectedDelivery", data.expectedDelivery);
        formData.append("isFreeSampleAvailable", data.isFreeSampleAvailable);
        formData.append(
          "isFreeShippingAvailable",
          data.isFreeShippingAvailable
        );
        formData.append("isOnlySoldInStore", data.isOnlySoldInStore);
        formData.append("authorId", selectedAuthor);

        formData.append("offer", selectedOffer.type);

        // Add images to FormData
        for (let i = 1; i <= 4; i++) {
          const fileInput = document.getElementById(`img${i}`);
          const file = fileInput?.files[0];
          if (file) {
            formData.append(`image`, file);
          }
        }

        for (let i = 1; i <= featuresData.length; i++) {
          const fileInput = document.getElementById(`features${i}`);
          const file = fileInput?.files[0];
          console.log(file);
          if (file) {
            formData.append(`features`, file);
          }
        }
        for (let i = 1; i <= coreValuesData.length; i++) {
          const fileInput = document.getElementById(`corevalues${i}`);
          const file = fileInput?.files[0];
          console.log(file);
          if (file) {
            formData.append(`corevalues`, file);
          }
        }

        formData.append("purchaseMode", selectedPurchaseMode);
        formData.append("productDescription", data.productDescription);

        coreValuesData.forEach((coreValue, index) => {
          formData.append(
            `coreValues[${index}][heading]`,
            coreValue?.heading || ""
          );
          formData.append(
            `coreValues[${index}][subheading]`,
            coreValue?.subheading || ""
          );
        });

        featuresData.forEach((feature, index) => {
          formData.append(
            `features[${index}][heading]`,
            feature?.heading || ""
          );
        });

        productDimensionsData.forEach((productDimension, index) => {
          formData.append(
            `dimensions[${index}][length][value]`,
            productDimension?.length?.value || ""
          );
          formData.append(
            `dimensions[${index}][length][unit]`,
            productDimension?.length?.unit || ""
          );
          formData.append(
            `dimensions[${index}][width][value]`,
            productDimension?.width?.value || ""
          );
          formData.append(
            `dimensions[${index}][width][unit]`,
            productDimension?.width?.unit || ""
          );
          formData.append(
            `dimensions[${index}][thickness][value]`,
            productDimension?.thickness?.value || ""
          );
          formData.append(
            `dimensions[${index}][thickness][unit]`,
            productDimension?.thickness?.unit || ""
          );
          formData.append(
            `dimensions[${index}][price]`,
            productDimension?.price || ""
          );
          formData.append(
            `dimensions[${index}][discountedprice]`,
            productDimension?.discountedprice || ""
          );
          formData.append(
            `dimensions[${index}][specialprice]`,
            productDimension?.specialprice || ""
          );
        });

        // //  add PDF to FormData
        // formData.append('pdf', data.pdf[0]);
        formData.append("maintainanceDetails", data.maintainanceDetails);

        console.log(formData);
        // --------- 💥 api call 💥 -------
        try {
          const response = await fetch(`${BASE_URL}/api/createProduct`, {
            method: "POST",
            body: formData,
          });
          const responseData = await response.json();
          window.alert(responseData.message);
          setLoading(false);
          // navigate("/admin");
        } catch (error) {
          console.error("Error creating products:", error);
          setLoading(false);
        }

        // reset();
        setSelectedColors([]);
        setSelectedPurchaseMode([]);
      })}
    >
      {/* ➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡ ➡➡➡➡➡➡➡➡*/}

      <div className="space-y-12 bg-white p-6 md:p-12">
        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Add New Product
          </h2>

          <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
            General Information:
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Product Title*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("title", {
                      required: "name is required",
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="patternNumber"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Pattern Number*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("patternNumber", {
                      required: "patternNumber is required",
                    })}
                    id="patternNumber"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="room"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Room
              </label>
              <select
                {...register("room")}
                id="room"
                className="block w-full mt-1 border bg-transparent p-2 border-gray-400 rounded"
                multiple
                onChange={handleMultipleSelector}
              >
                {roomOptions.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
              {roomMultipleSelector.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "7px",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  {roomMultipleSelector.map((room, index) => {
                    return (
                      <button
                        // onClick={() =>
                        //   navigate(`/homePage/create-room-section/${room}`)
                        // }
                        style={{
                          border: "1px solid black",
                          padding: "2px",
                          borderRadius: "3px",
                        }}
                        key={index}
                      >
                        {room}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Short description*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("shortDescription", {
                      required: "name is required",
                    })}
                    id="shortDescription"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 my-6">
              <label>Product Type :</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="normal"
                  name="requestType"
                  value="normal"
                  checked={productType === "normal"}
                  onChange={() => setProductType("normal")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="normal" className="ml-2 text-gray-700">
                  Normal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="special"
                  name="requestType"
                  value="special"
                  checked={productType === "special"}
                  onChange={() => setProductType("special")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="special" className="ml-2 text-gray-700">
                  Special (Ayatrio Family Member)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="requested"
                  name="requestType"
                  value="requested"
                  checked={productType === "requested"}
                  onChange={() => setProductType("requested")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="requested" className="ml-2 text-gray-700">
                  Requested (Luxurious)
                </label>
              </div>
            </div>
            <div className="sm:col-span-2 my-6">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">-- Select Category --</option>
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 my-6">
              {selectedCategory && (
                <>
                  <label htmlFor="subcategory">Subcategory:</label>
                  <select
                    id="subcategory"
                    className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                    onChange={handleSubcategoryChange}
                    value={selectedSubcategory}
                  >
                    <option value="">-- Select Subcategory --</option>
                    {subCategoryOptions.map((subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 my-6">
              <label>Product Availability :</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="in stock"
                  name="productAvailability"
                  value="in stock"
                  checked={productAvailability === "in stock"}
                  onChange={() => setProductAvailability("in stock")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="in stock" className="ml-2 text-gray-700">
                  In stock
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="out of stock"
                  name="productAvailability"
                  value="out of stock"
                  checked={productAvailability === "out of stock"}
                  onChange={() => setProductAvailability("out of stock")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="out of stock" className="ml-2 text-gray-700">
                  Out of stock
                </label>
              </div>
            </div>
            <div className="sm:col-span-2 my-6">
              <label
                htmlFor="availabilityTimefrom"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Available From*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="date"
                    {...register("availabilityTime.from")}
                    id="availabilityTimefrom"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 my-6">
              <label
                htmlFor="availabilityTimeto"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Available Upto*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="date"
                    {...register("availabilityTime.to")}
                    id="availabilityTimeto"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`isFreeSampleAvailable`}
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Free Sample :*
              </label>
              <div className="mt-2">
                <select
                  {...register(`isFreeSampleAvailable`, {
                    required: "Free Sample is required",
                  })}
                  id={`isFreeSampleAvailable`}
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                >
                  {options.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`isFreeShippingAvailable`}
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Free Shipping :*
              </label>
              <div className="mt-2">
                <select
                  {...register(`isFreeShippingAvailable`, {
                    required: "Free Sipping is required",
                  })}
                  id={`isFreeShippingAvailable`}
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                >
                  {options.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`isOnlySoldInStore`}
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Only Sold in Store :*
              </label>
              <div className="mt-2">
                <select
                  {...register(`isOnlySoldInStore`, {
                    required: "Free Sipping is required",
                  })}
                  id={`isOnlySoldInStore`}
                  className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                >
                  {options.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`expectedDelivery`}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Expected Delivery (Day)*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="Number"
                    {...register(`expectedDelivery`, {
                      required: "expectedDelivery is required",
                    })}
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Select Author:
              </label>
              <select
                className="mt-2 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                onChange={handleAuthorChange}
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.authorName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label>Length :</label>
              <input
                type="number"
                {...register(`productDimensions.${0}.length.value`)}
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
              />
              <select {...register(`productDimensions.${0}.length.unit`)}>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label>Width :</label>
              <input
                type="number"
                {...register(`productDimensions.${0}.width.value`)}
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
              />
              <select {...register(`productDimensions.${0}.width.unit`)}>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label>Thickness :</label>
              <input
                type="number"
                {...register(`productDimensions.${0}.thickness.value`)}
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
              />
              <select
                {...register(`productDimensions.${0}.thickness.unit`)}
                defaultValue="mm"
              >
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div> */}
          <div>
            {productDimensions.map((productDimensions, index) => (
              <div key={productDimensions.id}>
                {index === 0 ? (
                  <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
                    Standard Dimension {index + 1}
                  </h2>
                ) : (
                  <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
                    Dimension {index + 1}
                  </h2>
                )}
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label>Length :</label>
                    <input
                      type="number"
                      {...register(`productDimensions.${index}.length.value`)}
                      className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                    />
                    <select
                      {...register(`productDimensions.${index}.length.unit`)}
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="in">in</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label>Width :</label>
                    <input
                      type="number"
                      {...register(`productDimensions.${index}.width.value`)}
                      className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                    />
                    <select
                      {...register(`productDimensions.${index}.width.unit`)}
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="in">in</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label>Thickness :</label>
                    <input
                      type="number"
                      {...register(
                        `productDimensions.${index}.thickness.value`
                      )}
                      className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                    />
                    <select
                      {...register(`productDimensions.${index}.thickness.unit`)}
                      defaultValue="mm"
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="in">in</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`productDimensions.${index}.price`}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>

                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                        <input
                          type="number"
                          {...register(`productDimensions.${index}.price`, {
                            required: "price is required",
                            min: 1,
                            max: 100000,
                          })}
                          id={`productDimensions.${index}.price`}
                          className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`productDimensions.${index}.discountedprice`}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Discounted Price
                    </label>

                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                        <input
                          type="number"
                          {...register(
                            `productDimensions.${index}.discountedprice`,
                            {
                              min: 1,
                              max: 10000,
                            }
                          )}
                          id={`productDimensions.${index}.discountedprice`}
                          className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`productDimensions.${index}.specialprice`}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Special Price
                    </label>

                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                        <input
                          type="number"
                          {...register(
                            `productDimensions.${index}.specialprice`,
                            {
                              min: 1,
                              max: 10000,
                            }
                          )}
                          id={`productDimensions.${index}.specialprice`}
                          className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="bg-red-600 w-20 my-2 px-2 rounded-md"
                    type="button"
                    onClick={() => removeProductDimensions(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              className="bg-blue-600 h-[2rem] w-[8rem] mt-2 rounded-md"
              type="button"
              onClick={() => appendProductDimensions({})}
            >
              Add Dimension
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="unitType">Unit Type</label>
              <select
                id="unitType"
                {...register("unitType", {
                  required: "Unit Type is required",
                })}
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
              >
                <option value="">--Select Unit Type--</option>
                {["m", "roll", "sqft", "kg", "box", "pcs"].map(
                  (type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="units">Units</label>
              <input
                type="number"
                id="units"
                {...register("units", {
                  required: "Units are required",
                  min: 1,
                })}
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="perUnitType">Per Unit Type</label>
              <select
                id="perUnitType"
                {...register("perUnitType", {
                  required: "Per Unit Type is required",
                })}
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
              >
                <option value="">--Select Per Unit Type--</option>
                {["m", "roll", "sqft", "kg", "box", "pcs"].map(
                  (type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>

            {productType !== "requested" && (
              <div className="sm:col-span-3">
                <label htmlFor="perUnitPrice">Per Unit Price</label>
                <input
                  type="number"
                  id="perUnitPrice"
                  {...register("perUnitPrice", {
                    required: "Per Unit Price is required",
                    min: 0,
                  })}
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                />
              </div>
            )}
          </div>

          {productType !== "requested" && productPrice && (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 my-6">
                <label label htmlFor="typeofprice">
                  Price:
                </label>
                <select
                  id="typeofprice"
                  className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                  onChange={handlePriceChange}
                >
                  <option value="">-- Type of Price --</option>
                  {typeofprice.map((priceType, index) => (
                    <option key={index} value={priceType}>
                      {priceType}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="sm:col-span-2 my-6"
                style={{
                  display: priceType === "Discounted Price" ? "block" : "none",
                }}
              >
                <label htmlFor="offer">Offer:</label>
                <select
                  id="offer"
                  {...register("offer")}
                  className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                  onChange={handleOfferTypeChange}
                >
                  <option value="">-- Select Offer Type--</option>
                  {offerTypes.map((offer, index) => (
                    <option key={index} value={JSON.stringify(offer)}>
                      {offer.type}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="sm:col-span-2"
                style={{
                  display: priceType === "Discounted Price" ? "block" : "none",
                }}
              >
                <label
                  htmlFor="discountedprice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discounted Price
                </label>

                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                    <input
                      type="number"
                      // {...register("discountedprice",  {
                      //   min: 1,
                      //   max: 10000,
                      //   value : productDiscountedPrice
                      // })}
                      value={productDiscountedPrice}
                      onChange={(e) =>
                        setProductDiscountedPrice(e.target.value)
                      }
                      id="discountedprice"
                      className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div
                className="sm:col-span-2"
                style={{
                  display: priceType === "Special Price" ? "block" : "none",
                }}
              >
                <label
                  htmlFor="specialprice"
                  className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                >
                  Special Price*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                    <input
                      type="text"
                      {...register("specialprice.price")}
                      id="specialprice"
                      className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div
                className="sm:col-span-1"
                style={{
                  display: priceType === "Special Price" ? "block" : "none",
                }}
              >
                <label
                  htmlFor="specialstartdate"
                  className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                >
                  Special Price Start Date*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                    <input
                      type="date"
                      {...register("specialprice.startDate")}
                      id="specialstartdate"
                      className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div
                className="sm:col-span-1"
                style={{
                  display: priceType === "Special Price" ? "block" : "none",
                }}
              >
                <label
                  htmlFor="specialenddate"
                  className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                >
                  Special Price End Date*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                    <input
                      type="date"
                      {...register("specialprice.endDate")}
                      id="specialenddate"
                      className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="designStyle"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Type*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("designStyle", {
                      required: "designStyle is required",
                    })}
                    id="designStyle"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="material"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Material*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register("material", {
                      required: "material is required",
                    })}
                    id="material"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3 my-6">
              <label htmlFor="demandtype">Demand Type:</label>
              <select
                id="demandtype"
                className="ml-2 border bg-transparent p-2 border-gray-400 rounded"
                onChange={handleProductChange}
              >
                <option value="">-- Select Demand Type--</option>
                {demandTypes.map((demandtype, index) => (
                  <option key={index} value={demandtype}>
                    {demandtype}
                  </option>
                ))}
              </select>
            </div>

            {/* {productType !== "requested" && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Total Price
                </label>

                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                    <input
                      type="number"
                      {...register("totalPricePerUnit", {
                        required: "totalPricePerUnit is required",
                        min: 1,
                        max: 100000,
                      })}
                      id="totalPricePerUnit"
                      className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            )} */}
          </div>

          <select
            className="w-full my-4 max-w-xs border border-gray-400 rounded-md p-1"
            onChange={(e) => {
              const color = e.target.value;
              setColor(color);
            }}
          >
            <option value="">Select Color</option>
            {categoryColors
              .filter((color) => !selectedColors.includes(color))
              .map((color, colorIndex) => (
                <option key={colorIndex} value={`${color.name}`}>
                  {color.name}
                </option>
              ))}
          </select>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="img1"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image1* (Thumbnail)
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("img1", {
                      required: "name is required",
                    })}
                    id="img1"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 1, "")}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="img2"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image2*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("img2", {
                      required: "name is required",
                    })}
                    id="img2"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 2, "")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="img3"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image3*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("img3", {
                      required: "name is required",
                    })}
                    id="img3"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 3, "")}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image4*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register("img4", {
                      required: "name is required",
                    })}
                    id="img4"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 4, "")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full my-8">
            {colors.map((field, index) => (
              <div className="w-full m-2" key={field.id}>
                <select
                  className="w-full my-2 border border-gray-400 rounded-md p-1"
                  value={field.color}
                  onChange={(e) => {
                    const updatedColors = [...colors];
                    updatedColors[index].color = e.target.value;
                    setSelectedColors((prev) => [...prev, ...updatedColors]);
                  }}
                >
                  <option value="">Select Color</option>
                  {categoryColors
                    .filter((color) => !selectedColors.includes(color))
                    .map((color, colorIndex) => (
                      <option key={colorIndex} value={`${color.name}`}>
                        {color.name}
                      </option>
                    ))}
                </select>
                {field.images.map((image, imageIndex) => (
                  <input
                    className="w-full my-2 border border-gray-400 rounded-md p-1"
                    key={`${field.id}-${imageIndex}`}
                    type="file"
                    {...register(`colors.${index}.images.${imageIndex}`)}
                  />
                ))}

                <button
                  className="bg-red-400 rounded-md p-2"
                  type="button"
                  onClick={() => removeColors(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {colors.length < 4 && (
            <button
              className="bg-blue-500 rounded-md p-2 mx-2"
              type="button"
              onClick={() =>
                appendColors({ color: "", images: [{}, {}, {}, {}] })
              }
            >
              Add More Colors
            </button>
          )}
        </div>

        {/* 💢💢💢💢💢 purchase mode 💢💢💢💢💢💢💢 */}

        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
            Product Purchase Mode:
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="purchaseMode">Purchase Mode:</label>
              <div>
                {availablePurchaseMode.map((pMode) => (
                  <PurchaseModeCheckBox
                    key={pMode}
                    purchaseMode={pMode}
                    isChecked={selectedPurchaseMode.includes(pMode)}
                    onChange={handlePurchaseModeChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 💢💢💢💢💢 product detail 💢💢💢💢💢💢💢 */}

        <div className="border-b border-gray-500 pb-12">
          <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
            Product Details:
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Product Description*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <textarea
                    type="text"
                    {...register("productDescription", {
                      required: "Description is required",
                    })}
                    id="productDescription"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
              Core Values:
            </label>

            <div className=" w-[200px] ">
              {coreValues.map((coreValue, index) => (
                <div className=" w-[200px] " key={coreValue.id}>
                  <label
                    htmlFor={`coreValues[${index}].heading`}
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Core value {index + 1} - Heading
                  </label>
                  <input
                    className="mt-1 p-2 mb-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    type="text"
                    {...register(`coreValues.${index}.heading`)}
                  />
                  <label
                    htmlFor={`coreValues[${index}].subheading`}
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Core value {index + 1} - Sub-heading
                  </label>
                  <input
                    className="mt-1 p-2 mb-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    type="text"
                    {...register(`coreValues.${index}.subheading`)}
                  />
                  <label
                    htmlFor={`coreValues[${index}].heading`}
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Core value {index + 1} - Icon
                  </label>
                  <input
                    className="mt-1 p-2 mb-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    type="file"
                    name={`corevalues${index + 1}`}
                    id={`corevalues${index + 1}`}
                    onChange={(e) => {
                      handleImageChange(e, index, "corevalues");
                    }}
                  />
                  <button
                    className="bg-red-600  my-2 px-2 rounded-md"
                    type="button"
                    onClick={() => removeCoreValue(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                className="bg-blue-600 h-[2rem] w-[8rem] mt-2 rounded-md"
                type="button"
                onClick={() => appendCoreValue({})}
              >
                Add Core Value
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <label className="block text-lg font-medium leading-5 text-gray-700 mt-4">
              Product Features:
            </label>

            <div>
              {features.map((feature, index) => (
                <div className="" key={feature.id}>
                  <label
                    htmlFor={`features[${index}].heading`}
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Feature {index + 1} Heading
                  </label>
                  <input
                    className="mt-1 p-2 mb-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    type="text"
                    {...register(`features.${index}.heading`)}
                  />
                  <label
                    htmlFor={`features[${index}].feature`}
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Feature {index + 1} Icon
                  </label>
                  <input
                    className="mt-1 p-2 mb-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    type="file"
                    name={`features${index + 1}`}
                    id={`features${index + 1}`}
                    onChange={(e) => {
                      handleImageChange(e, index, "features");
                    }}
                  />
                  <button
                    type="button"
                    className="bg-red-600 my-2 px-2 rounded-md"
                    onClick={() => removeFeature(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="bg-blue-600 h-[2rem] w-[8rem] mt-2 rounded-md"
                onClick={() => appendFeature({})}
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>

        {/* 💢💢💢💢💢 Product Maintance 💢💢💢💢💢💢💢 */}

        <div className="pb-12">
          <h2 className="text-lg mt-6 font-bold leading-7 text-gray-900">
            Product Maintainance:
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="maintainanceDetails"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Product Maintainance Details*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <textarea
                    type="text"
                    {...register("maintainanceDetails")}
                    id="maintainanceDetails"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label
                htmlFor="pdf"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                // name="pdf"
              >
                Product Description PDF
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="file"
                    {...register('pdf')}
                    id="pdf"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    accept="application/pdf"
                    onChange={(e) => handlePDFchange(e)}
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mb-24 flex items-center justify-center md:justify-end gap-x-6 mr-10">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>

        <Button
          type="submit"
          className="rounded-md shadow-2xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          {loading ? "Adding product..." : "Add product"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
