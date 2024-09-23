import React from "react";
import { LuCalendarClock } from "react-icons/lu";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import icon from "../../assets/icons/icon5.png";

const Servicemain = () => {
  return (
    <div className="flex flex-col justify-between gap-10 items-center px-10 py-5 text-center">
      <p className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
        serwis silników scania <br />
        bio gaz
      </p>
      <p className="text-md lg:text-xl xl:text-2xl">
        Świadczymy kompleksowe usługi serwisowe dla silniików SCANIA
        wykorzystywanych przy pracy BIO-gazowni. Posiadamy własny sklep oraz
        profesjonalną kadrę.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-around w-full ">
        <div className="flex flex-col gap-5 items-center bg-white rounded-3xl p-4">
          <LuCalendarClock size={100} />
          <p className="font-bold text-3xl">
            Monitoring <br /> Serwisu
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center bg-white rounded-3xl p-4">
          <HiOutlineWrenchScrewdriver size={100} />
          <p className="font-bold text-3xl">
            Kompleksowy <br />
            Serwis
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center bg-white rounded-3xl p-4">
          <img src={icon} className="w-[100px] h-[100px]" alt="" />
          <p className="font-bold text-3xl">
            Zestawienie <br /> Rentowności
          </p>
        </div>
      </div>
    </div>
  );
};

export default Servicemain;
