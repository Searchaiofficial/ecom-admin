import { useEffect } from "react";
import { useState } from "react";
import AddAdmin from "../components/edit-admins/AddAdmin";
import AdminList from "../components/edit-admins/AdminList";
import { getLiveRoomAdmins } from "../api-handlers/liveRoomAdmin";

const EditAdmins = () => {
  const [admins, setAdmins] = useState([]);

  const refreshAdmins = async () => {
    const admins = await getLiveRoomAdmins();
    setAdmins(admins);
  };

  useEffect(() => {
    getLiveRoomAdmins().then((data) => {
      setAdmins(data);
    });
  }, []);

  return (
    <main className="flex flex-col gap-6 px-2 sm:px-4 py-4">
      <AdminList admins={admins} refreshAdmins={refreshAdmins} />
      <AddAdmin admins={admins} refreshAdmins={refreshAdmins} />
    </main>
  );
};

export default EditAdmins;
