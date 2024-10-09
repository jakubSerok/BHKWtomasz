import React from "react";
import bg from "../../assets/baner.png";

const Mainbanner = () => {
  return (
    <div
      className="w-full h-[500px] flex flex-col justify-end px-5 pb-4 text-white gap-4 bg-cover md:bg-center bg-left"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <h1 className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        BHKW Service, Wartung, Reparatur, Umbau
      </h1>
      <h2 className="uppercase text-xl md:text-2xl lg:text-3xl font-normal font-sans">
        Maximieren Sie Ihre Verfügbarkeit{" "}
      </h2>
    </div>
  );
};

export default Mainbanner;
