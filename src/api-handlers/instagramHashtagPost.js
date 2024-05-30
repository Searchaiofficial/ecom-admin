import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const getInstagramHashtagPosts = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/hashtagpost`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const instagramApiUrl =
  "https://graph.facebook.com/v20.0/18008984500097700/top_media?user_id=17841407828748565&fields=id%2Ccaption%2Cchildren%2Clike_count%2Cpermalink%2Cmedia_url%2Cmedia_product_type&access_token=EAAL9JCcqxl0BOZB4fzSl4K5xdgajP4ZBcnZAX3uhlk4nGzeny8gZB1Vl1HIP8jJuiSchf9Oj4nzOXAElUUq6rIKZAZAgyyf4sNxt1ZBgRADLjrkwQVZBrhqrGC86Yv7plJPR0yV1BSIZBPDWlTE13NIow2nDZBjWYWUr4QeyZAwBe8dmZByFlfjiC0SdFqvWerP8FIvgZA77YFYkB";

export const fetchInstagramHashtagPosts = async () => {
  try {
    const response = await axios.get(instagramApiUrl);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createInstagramHashtagPost = async ({
  id,
  mediaUrl,
  products,
  permalink,
  categoryId,
}) => {
  try {
    const response = await axios.post(`${baseURL}/api/hashtagpost`, {
      id,
      mediaUrl,
      products,
      categoryId,
      postUrl: permalink,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteInstagramHashtagPost = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/api/hashtagpost/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateInstagramHashtagPost = async ({
  id,
  products,
  categoryId,
}) => {
  try {
    const response = await axios.patch(`${baseURL}/api/hashtagpost/${id}`, {
      products,
      categoryId,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
