import Admin from "./Admin";

const AdminList = ({ admins, refreshAdmins }) => {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="sm:text-xl text-lg font-bold">Admin List</h2>
      {admins.length === 0 ? (
        <p className="text-gray-500">No admins to show</p>
      ) : (
        <ul className="flex gap-2 flex-wrap">
          {admins.map((admin) => (
            <Admin
              key={admin._id}
              admin={admin}
              refreshAdmins={refreshAdmins}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminList;
