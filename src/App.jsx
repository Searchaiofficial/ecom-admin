import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import LoginPage from './Pages/LoginPage'
import Protected from "./Features/Protected";
import AdminPanel from "./Pages/AdminPanel";

import AdminProductFormPage from './Pages/AdminProductFormPage';
import ImageChangerForm from './components/homepage/MidInfoSection/ImageChangerForm';
import HeaderInfoForm from './components/homepage/HeaderInfoSection/HeaderInfoForm';
import ImageSectionForm from './components/homepage/ImagesSection/ImageSectionForm';
import TeamMembersForm from './components/homepage/TeamMembers/TeamMembersForm';
import SliderForm from './components/homepage/Slider/SliderForm';
import ImgGridForm from './components/homepage/ImgGrid/ImgGridForm';
import MapForm from './components/homepage/MapSection/MapForm';
import CatDesciptionForm from './components/homepage/catDescription/catDescriptionForm';
import ImagechangerForm from './components/homepage/imgChanger/ImagechangerForm';
import HomePageLinks from './components/HomePageLinks';
import Slider from './components/homepage/Slider/Slider';
import MidInfoSection from './components/homepage/MidInfoSection/MidInfoSection';
import HeaderInfoSection from './components/homepage/HeaderInfoSection/HeaderInfoSection';
import ImagesSection from './components/homepage/ImagesSection/ImagesSection';
import TeamMembers from './components/homepage/TeamMembers/TeamMembers';
import ImgGrid from './components/homepage/ImgGrid/ImgGrid';
import MapDetails from './components/homepage/MapSection/MapDetails';
import CatDescription from './components/homepage/catDescription/catDescription';
import ImageChanger from './components/homepage/imgChanger/Imagechanger';
import Review from './components/homepage/review/Review';

import ProductDisplay from './components/product/ProductDisplay';
import OrderDetails from './components/dashboard/OrderDetails';
import TransactionPage from './components/dashboard/TransactionPage';
import InStoreOrder from './components/dashboard/InStoreOrder';
import FreeSampling from './components/dashboard/FreeSampling';
import FreeDesign from './components/dashboard/FreeDesign';
import BuyNow from './components/dashboard/BuyNow';



export default function App() {

  const [width, setWidth] = useState(window.innerWidth);

  const handleSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<div>Page not found</div>}></Route>
        <Route exact path="/" element={<LoginPage />}></Route>
        <Route exact path="/admin" element={
          <Protected>
            <AdminPanel currentWidth={width} />
         </Protected>
        }>
        </Route>
        <Route exact path="/create-product" element={
          <Protected>
            <AdminProductFormPage />
          </Protected>
        }>
        </Route>
        <Route exact path="/homePage" element={
          <Protected>
            <HomePageLinks currentWidth={width} />
          </Protected>
        }>
        </Route>

        {/* --------- 🧨🧨🧨 home page ---------- 🧨🧨🧨 */}

        <Route exact path='/update-home-page/slider-section' element={
          <Protected>
            <Slider />
          </Protected>
        }></Route>

        <Route exact path='/update-home-page/mid-info-section-(image-changer)' element={
          <Protected>
            <MidInfoSection />
          </Protected>
        }></Route>

        <Route exact path='/update-home-page/header-info-section' element={
          <Protected>
            <HeaderInfoSection />
          </Protected>
        }></Route>

        <Route exact path='/update-home-page/image-section' element={
          <Protected>
            <ImagesSection />
          </Protected>
        }></Route>

        <Route exact path='/update-home-page/team-memebers' element={
          <Protected>
            <TeamMembers />
         </Protected>
        }></Route>

        <Route exact path='/update-home-page/image-grid' element={
          <Protected>
            <ImgGrid />
          </Protected>
        }></Route>

        <Route exact path='/update-home-page/map-detail' element={
          <Protected>
            <MapDetails />
         </Protected>
        }></Route>

        <Route exact path='/update-home-page/category-description' element={
          <Protected>
            <CatDescription />
          </Protected>
        }></Route>

        <Route exact path='/update-home-page/image-changer-(multiple-images)' element={
          <Protected>
            <ImageChanger />
          </Protected>
        }></Route>

        <Route exact path='/update-home-page/reviews' element={
          <Protected>
            <Review />
          </Protected>
        }></Route>


        {/* ---------🎈🎈🎈🎈 Forms -------------- 🎈🎈🎈🎈 */}

        <Route exact path='/homePage/create-slider-section' element={
          <Protected>
            <SliderForm />
          </Protected>
        }></Route>

        <Route exact path='/homePage/create-mid-info-section' element={
          <Protected>
            <ImageChangerForm />
          </Protected>
        }></Route>

        <Route exact path='/homePage/create-header-info-section' element={
          <Protected>
            <HeaderInfoForm />
          </Protected>
        }></Route>

        <Route exact path='/homePage/create-image-section' element={
          <Protected>
            <ImageSectionForm />
           </Protected>
        }></Route>

        <Route exact path='/homePage/create-team-members-section' element={
          <Protected>
            <TeamMembersForm />
          </Protected>
        }></Route>

        <Route exact path='/homePage/create-imgGrid-section' element={
          <Protected>
            <ImgGridForm />
          </Protected>
        }></Route>

        <Route exact path='/homePage/create-map-section' element={
          <Protected>
            <MapForm />
          </Protected>
        }></Route>

        <Route exact path='/homePage/create-category-description' element={
          <Protected>
            <CatDesciptionForm />
          </Protected>
        }></Route>

        <Route exact path='/homePage/create-image-changer' element={
          <Protected>
            <ImagechangerForm />
          </Protected>
        }></Route>

        {/* Dashboard routes */}

        <Route exact path='/product-display' element={
          <Protected>
            <ProductDisplay />
          </Protected>
        }></Route>

        <Route exact path='/orderdetails' element={
          <Protected>
            <OrderDetails />
          </Protected>
        }></Route>
        <Route exact path='/transaction' element={
          <Protected>
            <TransactionPage />
          </Protected>
        }></Route>
        <Route exact path='/store-order' element={
          <Protected>
            <InStoreOrder />
          </Protected>
        }></Route>
        <Route exact path='/free-sampling' element={
          <Protected>
            <FreeSampling />
          </Protected>
        }></Route>
        <Route exact path='/free-design' element={
          <Protected>
            <FreeDesign />
          </Protected>
        }></Route>
        <Route exact path='/buy-now' element={
          <Protected>
            <BuyNow />
          </Protected>
        }></Route>

        


        


      </Routes>
    </>
  )
}