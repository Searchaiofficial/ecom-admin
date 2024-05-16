import DemandForm from "../components/Demand/demandForm";
import Navbar from "../components/Navbar";

const DemandPage = () => {
    return (
        <div>
            <div className="flex">
                <div className="flex-grow w-1/5 p-2">
                    <Navbar />
                </div>
                <div className='w-4/5 border-l-2 border-gray-300'>
                    <DemandForm />
                </div>
            </div>
        </div>
    );
}

export default DemandPage;