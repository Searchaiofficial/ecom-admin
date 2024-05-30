import { useEffect } from "react";
import { getCategories } from "../../../api-handlers/category";
import { useState } from "react";

const SelectCategoryDropdown = ({ setSelectedCategory, initialValue }) => {
  const [categories, setCategories] = useState([]);
  console.log({ initialValue });

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(() => {
        let allCategories = [];

        categories.forEach((category) => {
          allCategories = [...allCategories, ...category.subcategories];
        });

        return allCategories;
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-sm">Select Category</label>
      <select
        defaultValue={initialValue}
        className="w-full border rounded-lg p-2"
        onChange={(e) => {
          const selectedCategory = categories.find(
            (category) => category._id === e.target.value
          );

          setSelectedCategory(selectedCategory);
        }}
      >
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategoryDropdown;
