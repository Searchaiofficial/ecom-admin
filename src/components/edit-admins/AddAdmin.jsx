import { useState } from "react";
import { addLiveRoomAdmin } from "../../api-handlers/liveRoomAdmin";

const AddAdmin = ({ refreshAdmins }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, name } = formData;

    if (!email) return;

    await addLiveRoomAdmin({ email, name });
    await refreshAdmins();

    setFormData({ email: "", name: "" });
  };

  return (
    <section className="flex flex-col gap-2">
      <h2 className="sm:text-xl text-lg font-bold">Add Admin</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-xl"
      >
        <input
          type="email"
          required
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-md p-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <button className="px-4 py-2 transition rounded-md bg-slate-500 text-white hover:bg-slate-500/90">
          Add
        </button>
      </form>
    </section>
  );
};

export default AddAdmin;
