import { useState } from "react";
import {
  createInstagramHashtagPost,
  fetchInstagramHashtagPosts,
} from "../../../api-handlers/instagramHashtagPost";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategoryDropdown from "./SelectCategoryDropdown";

const AllPosts = () => {
  const [queryStatus, setQueryStatus] = useState(() => ({
    data: [],
    isLoading: true,
  }));

  useEffect(() => {
    fetchInstagramHashtagPosts().then((posts) => {
      console.log(posts);
      setQueryStatus({ data: posts.data, isLoading: false });
    });
  }, []);

  if (queryStatus.isLoading) {
    return (
      <div>
        <h2 className="font-medium text-base sm:text-lg">All Posts</h2>
        <div className="w-full overflow-x-auto flex">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-medium text-base sm:text-lg">All Posts</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4">
        {queryStatus.data.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

const Post = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <a
      href={post.permalink}
      target="_blank"
      className="relative flex items-center"
    >
      <img
        className="object-cover rounded-lg"
        src={post.media_url}
        alt={"Instagram Post"}
      />
      <SelectPostButton post={post} setIsModalOpen={setIsModalOpen} />
      {isModalOpen ? (
        <SelectPostModal post={post} setIsModalOpen={setIsModalOpen} />
      ) : null}
    </a>
  );
};

const SelectPostButton = ({ post, setIsModalOpen }) => {
  return (
    <button
      onClick={() => setIsModalOpen((prev) => !prev)}
      className="bg-blue-500 text-white px-2 py-1 rounded-lg absolute right-2 bottom-2 hover:bg-blue-600 transition"
    >
      Select Post
    </button>
  );
};

const SelectPostModal = ({ post, setIsModalOpen }) => {
  const [productIds, setProductIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const products = productIds.map((product) => product.value);
    const categoryId = selectedCategory._id;

    await createInstagramHashtagPost({
      id: post.id,
      mediaUrl: post.media_url,
      products: products,
      permalink: post.permalink,
      categoryId: categoryId,
      username: username,
    });

    refreshPage();
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="h-screen w-screen fixed inset-0 backdrop-brightness-50 z-[9999] bg-transparent"
      ></div>
      <div className="w-full max-w-lg bg-white fixed left-1/2 top-1/2 rounded-lg border shadow-md -translate-x-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4 items-center py-4 px-2 sm:px-4">
        <button
          className="absolute right-2 sm:right-4 top-4"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
        <h3 className="font-semibold text-lg">Add Products</h3>
        <div className="flex flex-col gap-2 w-full">
          <hr className="w-full" />
          <form onSubmit={onSubmit} className="flex flex-col gap-1">
            <SelectCategoryDropdown setSelectedCategory={setSelectedCategory} />
            <input
              type="text"
              placeholder="Username"
              className="w-full border rounded-lg p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {productIds.length === 0 ? (
              <p>No products added.</p>
            ) : (
              <p>Products:</p>
            )}
            {productIds.map((product) => (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setProductIds((prev) => {
                      return prev.filter((p) => p.id !== product.id);
                    });
                  }}
                  className="absolute right-2 top-2"
                >
                  X
                </button>
                <input
                  key={product.id}
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter ID"
                  value={product.value}
                  onChange={(e) => {
                    setProductIds((prev) => {
                      return prev.map((p) => {
                        if (p.id === product.id) {
                          return {
                            id: p.id,
                            value: e.target.value,
                          };
                        }
                        return p;
                      });
                    });
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setProductIds((prev) => {
                  return [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      value: "",
                    },
                  ];
                });
              }}
              className="bg-blue-500 text-white rounded-lg p-2 mt-2 hover:bg-blue-600 transition"
            >
              Add Product
            </button>
            <button className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AllPosts;
