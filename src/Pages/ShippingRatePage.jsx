
import Navbar from "../components/Navbar";
import ShippingRates from "../components/ShippingRate/shippingRate";

const ShippingRatePage = () => {
    return (
        <div>
            <div className="flex">
                <div className="flex-grow w-1/5 p-2">
                    <Navbar />
                </div>
                <div className='w-4/5 border-l-2 border-gray-300'>
                    <ShippingRates />
                </div>
            </div>
        </div>
    );
}

export default ShippingRatePage;