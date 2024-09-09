import React from "react";
import { LuCalendarClock } from "react-icons/lu";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

const Servicemain = () => {
  return (
    <div className="flex flex-col justify-between gap-10 items-center px-10 py-5 text-center">
      <p className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        serwis silników scania <br />
        bio gaz
      </p>
      <p>
        Świadczymy kompleksowe usługi serwisowe dla silniików SCANIA
        wykorzystywanych przy pracy BIO-gazowni. Posiadamy własny sklep oraz
        profesjonalną kadrę.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-around w-full">
        <div className="flex flex-col gap-5 items-center">
          <LuCalendarClock size={100} />
          <p>
            Monitoring <br /> Serwisu
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <HiOutlineWrenchScrewdriver size={100} />
          <p>
            Kompleksowy <br />
            Serwis
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <HiOutlineWrenchScrewdriver size={100} />
          <p>
            Zestawienie <br /> Rentowności
          </p>
        </div>
      </div>
    </div>
  );
};

export default Servicemain;
