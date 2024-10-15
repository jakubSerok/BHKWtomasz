import React from "react";
import bg from "../../assets/baner.png";

const Mainbanner = () => {
  return (
    <div
      className="relative w-full h-[500px] text-white  bg-cover md:bg-center bg-left"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="flex flex-col absolute top-5 right-5 text-center">
        <h1 className=" uppercase font-bold text-6xl md:text-9xl tracking-wider">
          BHKW
        </h1>
        <p className=" font-bold text-[11px] md:text-lg lg:text-xl border-2 uppercase border-white md:absolute md:mt-[100px]">
          SERVICE WARTUNG REPERATUR UMBAU
        </p>
      </div>
      <h2 className="absolute bottom-5 right-5 uppercase text-xl md:text-2xl lg:text-3xl font-normal font-sans">
        Maximieren Sie Ihre Verfügbarkeit
      </h2>
    </div>
  );
};

export default Mainbanner;
