import { useState } from "react";
import { deleteLiveRoomAdmin } from "../../api-handlers/liveRoomAdmin";
import EditAdminDialog from "./EditAdminDialog";

const Admin = ({ admin: { _id: id, email, name }, refreshAdmins }) => {
  const [isEditAdminDialogOpen, setIsEditAdminDialogOpen] = useState(false);

  const deleteAdmin = async () => {
    await deleteLiveRoomAdmin(id);
    await refreshAdmins();
  };

  return (
    <>
      {isEditAdminDialogOpen ? (
        <EditAdminDialog
          setIsEditAdminDialogOpen={setIsEditAdminDialogOpen}
          id={id}
          email={email}
          name={name}
          refreshAdmins={refreshAdmins}
        />
      ) : null}
      <li className="p-2 border border-gray-300 rounded-md flex flex-grow justify-between items-center max-w-2xl">
        <p>{email}</p>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            onClick={() => setIsEditAdminDialogOpen((prev) => !prev)}
            className="px-4 py-2 transition rounded-md bg-slate-500 text-white hover:bg-slate-500/90"
          >
            Edit
          </button>
          <button
            onClick={deleteAdmin}
            className="px-4 py-2 transition rounded-md bg-red-600 text-white hover:bg-red-600/90"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

export default Admin;
