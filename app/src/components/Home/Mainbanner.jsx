import React from "react";
import bg from "../../assets/obraz6.png";

const Mainbanner = () => {
  return (
    <div
      className="w-full h-[500px] flex flex-col justify-end px-5 pb-4 text-white gap-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        obsluga i naprawa
      </h1>
      <h2 className="uppercase text-xl md:text-2xl lg:text-3xl font-normal font-sans">
        maksymalizuj swoja dyspozyjność
      </h2>
    </div>
  );
};

export default Mainbanner;
