import Navbar from "../components/Navbar";
import UrgencyForm from "../components/Urgency/UrgencyFoam";

const UrgencyPage = () => {
    return (
        <div>
            <div className="flex">
                <div className="flex-grow w-1/5 p-2">
                    <Navbar />
                </div>
                <div className='w-4/5 border-l-2 border-gray-300'>
                    <UrgencyForm />
                </div>
            </div>
        </div>
    );
}

export default UrgencyPage;