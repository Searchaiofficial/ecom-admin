import { useState } from "react";
import { updateLiveRoomAdmin } from "../../api-handlers/liveRoomAdmin";
import { useEffect } from "react";

const EditAdminDialog = ({
  setIsEditAdminDialogOpen,
  refreshAdmins,
  id,
  email,
  name,
}) => {
  const [formData, setFormData] = useState({
    email: email,
    name: name,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, name } = formData;

    if (!email) return;

    await updateLiveRoomAdmin({ id, email, name });
    await refreshAdmins();

    setIsEditAdminDialogOpen(false);
  };

  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      setIsEditAdminDialogOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed">
      <div
        onClick={() => setIsEditAdminDialogOpen(false)}
        className="h-screen w-screen fixed inset-0 backdrop-brightness-50 z-[9999] bg-transparent"
      ></div>
      <div className="w-full max-w-lg bg-white fixed left-1/2 top-1/2 rounded-lg border shadow-md -translate-x-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4 items-center py-4 px-2 sm:px-4">
        <button
          className="absolute right-2 sm:right-4 top-4"
          onClick={() => setIsEditAdminDialogOpen(false)}
        >
          Close
        </button>
        <h3 className="font-semibold text-lg">Edit admin</h3>
        <div className="flex flex-col gap-2 w-full">
          <hr className="w-full" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              type="email"
              required
              placeholder="Email"
              className="border border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md p-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <button className="px-4 py-2 transition rounded-md bg-slate-500 text-white hover:bg-slate-500/90">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAdminDialog;
