import { useEffect } from "react";
import {
  deleteInstagramHashtagPost,
  getInstagramHashtagPosts,
  updateInstagramHashtagPost,
} from "../../../api-handlers/instagramHashtagPost";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategoryDropdown from "./SelectCategoryDropdown";

const SelectedPosts = () => {
  const [queryStatus, setQueryStatus] = useState(() => ({
    data: [],
    isLoading: true,
  }));

  useEffect(() => {
    getInstagramHashtagPosts().then((posts) => {
      console.log(posts);
      setQueryStatus({ data: posts, isLoading: false });
    });
  }, []);

  if (queryStatus.isLoading) {
    return (
      <div>
        <h2 className="font-medium text-base sm:text-lg">Selected Posts</h2>
        <div className="w-full overflow-x-auto flex">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-medium text-base sm:text-lg">Selected Posts</h2>
      <div className="w-full flex gap-2 flex-wrap">
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
    <div className="relative">
      <img
        className="object-cover rounded-lg h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
        src={post.mediaUrl}
        alt={"Instagram Post"}
      />
      <div className="absolute flex gap-2 items-center top-2 right-2">
        <EditPostButton post={post} setIsModalOpen={setIsModalOpen} />
        <DeletePostButton post={post} />
        {isModalOpen ? (
          <EditPostModal post={post} setIsModalOpen={setIsModalOpen} />
        ) : null}
      </div>
    </div>
  );
};

const EditPostModal = ({ post, setIsModalOpen }) => {
  const postProductIds = post.products.map((product) => ({
    id: product._id,
    value: product._id,
  }));
  const [productIds, setProductIds] = useState(postProductIds);
  const [selectedCategory, setSelectedCategory] = useState({});

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

    await updateInstagramHashtagPost({
      id: post.id,
      products: products,
      categoryId: categoryId,
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
            <SelectCategoryDropdown
              setSelectedCategory={setSelectedCategory}
              initialValue={post.category}
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

const EditPostButton = ({ post, setIsModalOpen }) => {
  return (
    <button
      onClick={() => setIsModalOpen(true)}
      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
    >
      Edit
    </button>
  );
};

const DeletePostButton = ({ post }) => {
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const handleDelete = async () => {
    await deleteInstagramHashtagPost(post.id);
    refreshPage();
  };

  return (
    <button
      onClick={handleDelete}
      className=" p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
    >
      Delete
    </button>
  );
};

export default SelectedPosts;
