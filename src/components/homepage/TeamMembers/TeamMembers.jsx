import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";

const TeamMembers = () => {
  const [teamData, setTeamData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${BASE_URL}/api/profileContent`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTeamData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (profileId) => {
    fetch(`${BASE_URL}/api/profileContent/${profileId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div className="mt-4 border-t border-red-400 py-4">
      <div className="text-center mb-6">
        <h1 className="font-bold ">Team Memebers</h1>
        <span
          className="text-red-400  mt-1 hover:cursor-pointer"
          onClick={() => navigate("/homePage/create-team-members-section")}
        >
          Create New
        </span>
      </div>
      <div className="mx-4 flex gap-x-4">
        {teamData &&
          teamData.map((member) => (
            <div
              key={member._id}
              style={{ marginBottom: "20px" }}
              className="flex flex-col mt-4  border p-2"
            >
              <img
                src={member.user.image}
                alt={`${member.displayName}'s Image`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <h3 className="font-bold">{member.user.displayName}</h3>
              <button
                type="button"
                className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 w-[60px]"
                onClick={() => handleDelete(member._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamMembers;
