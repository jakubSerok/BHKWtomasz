import React, { useEffect, useState } from "react";

import logo from "../assets/logo.png"

const Navbar = () => {

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
      };
    
  return (
    <nav className="w-full h-[140px] flex flex-col">
        <div className="lg:hidden">
            <div className='h-[60%] border-b-2 border-black flex justify-between px-6 items-center'>
                <img src={logo} alt="" className='w-[100px] h-full'/>
                <div>2</div>
            </div>
            <div className='h-[40%] items-center justify-between flex px-4'>
                <div className='md:text-[20px] sm:text-[15px] text-black bold uppercase'>sklep</div>
                <div className='md:text-[20px] sm:text-[15px] text-black bold uppercase'>home</div>
                <div className='md:text-[20px] sm:text-[15px] text-black bold uppercase'>blogi</div>
                <div className='md:text-[20px] sm:text-[15px] text-black bold uppercase'>o nas</div>
                <div className='md:text-[20px] sm:text-[15px] text-black bold uppercase'>kontakt</div>
                <div className='md:text-[20px] sm:text-[15px] text-black bold uppercase'>oferta</div>
                <div className='md:text-[20px] sm:text-[15px] text-black bold uppercase'>nasze rozwiazania</div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar