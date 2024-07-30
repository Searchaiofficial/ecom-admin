import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";

const UrgencyForm = () => {
  const [urgencyName, setUrgencyName] = useState("");
  const [urgencyTypes, setUrgencyTypes] = useState([]);
  const [DeleteUrgencyType, setDeleteUrgencyType] = useState();

  const fetchUrgencyTypes = async () => {
    try {
      const responce = await axios.get(`${BASE_URL}/api/getUrgencies`);
      setUrgencyTypes(responce.data);
    } catch (error) {
      console.log("FETCH Urgecy TYPES ERROR :", error);
    }
  };

  useEffect(() => {
    fetchUrgencyTypes();
  }, []);

  const handleCreateUrgency = async () => {
    try {
      if (urgencyName === "") {
        window.alert("Urgency name is required");
        return;
      }
      const responce = await axios.post(`${BASE_URL}/api/createUrgency`, {
        type: urgencyName,
      });
      console.log(responce.data.message);
      window.alert(responce.data.message);
      setUrgencyName("");
    } catch (error) {
      console.log("Error while creating demand", error);
      window.alert("Some error occured try again");
      setUrgencyName("");
    }
  };

  const handleDeleteUrgencyType = async () => {
    try {
      const responce = await axios.delete(
        `${BASE_URL}/api/deleteUrgency/${DeleteUrgencyType}`
      );
      window.alert(responce.data.message);
      setDeleteUrgencyType(null);
      window.location.reload();
    } catch (error) {
      console.log("DELETE Urgency TYPE :", error);
      window.alert("Some error occured try again");
      setDeleteUrgencyType(null);
    }
  };

  return (
    <div>
      <div className="space-y-12 bg-white p-6 md:p-12 flex flex-col ">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center">
          Create Urgency
        </h2>
        <div className="border-gray-500 border-b pb-12 w-full flex items-center justify-center gap-10">
          <div className="w-[400px]">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium  text-gray-900"
              >
                Urgency Name*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    value={urgencyName}
                    required
                    onChange={(e) => setUrgencyName(e.target.value)}
                    type="text"
                    id="title"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={handleCreateUrgency}
              className="bg-blue-500 text-white p-2.5 font-semibold rounded-lg uppercase"
            >
              Create
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 mb-12">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 text-center">
            Delete Urgency
          </h1>
          <div className="flex items-center gap-36">
            <div>
              <lable className="text-sm font-medium  text-gray-900">
                Choose Urgency
              </lable>
              <select
                value={DeleteUrgencyType}
                onChange={(e) => setDeleteUrgencyType(e.target.value)}
                id="type"
                className="block flex-1 border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              >
                <option key={0} value={null}>
                  ------
                </option>

                {urgencyTypes.map((urgency, index) => (
                  <option key={index + 1} value={urgency.type}>
                    {urgency.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={handleDeleteUrgencyType}
                className="p-3 bg-blue-500 rounded-lg text-white  font-semibold"
              >
                Delete Urgency
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyForm;
