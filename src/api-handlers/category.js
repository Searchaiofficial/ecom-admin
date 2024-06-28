import axios from "axios";
import { BASE_URL } from "../../config";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
