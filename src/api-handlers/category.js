import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/categories`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
