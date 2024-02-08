import React from 'react';
import AdminNavbar from './AdminNavbar';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';

const HomePageLinks = () => {
    const sectionTitles = [
        "Slider section",
        "Mid Info Section (Image Changer)",
        "Header Info Section",
        "Image section",
        "Team Memebers",
        "Image Grid",
        "Map Detail",
        "Category Description",
        "Image Changer (Multiple Images)",
        "Reviews"
    ];

    return (
        <>
            <div className="flex" style={{minHeight:'728px'}}>
             <div className="flex-grow w-1/5 p-2">
                <Navbar />
            </div>
            <div className='w-4/5 border-l-2 border-gray-300'>
            <div className='mb-8 mx-4 text-center py-6 homepagelinks'>
                <div className='mt-6'>
                    {sectionTitles.map((title, index) => (
                        <h4 key={index}>
                            <NavLink to={`/update-home-page/${title.toLowerCase().replace(/\s+/g, '-')}`}>
                                {title}
                            </NavLink>
                        </h4>
                    ))}
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default HomePageLinks;
