import axios from "axios";
import { BASE_URL } from "../../config";

export const getLiveRoomAdmins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/liveroomadmin`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLiveRoomAdmin = async (id) => {
  try {
    await axios.delete(`${baseURL}/api/liveroomadmin/${id}`);
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  } catch (error) {
    console.log(error.message);
  }
};

export const addLiveRoomAdmin = async ({ name, email, topic }) => {
  try {
    const response = await axios.post(`${baseURL}/api/liveroomadmin`, {
      name,
      email,
      topic,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLiveRoomAdmin = async ({ id, name, topic }) => {
  try {
    const response = await axios.patch(`${baseURL}/api/liveroomadmin/${id}`, {
      name,
      topic,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
