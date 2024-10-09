import React, { useState } from "react";
import { LuCalendarClock } from "react-icons/lu";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import icon from "../../assets/icons/icon5.png";
import VisibilitySensor from "react-visibility-sensor";
import Reveal from "../Animation/Reveal";

const Servicemain = () => {
  const [visible, setVisible] = useState(false);

  const onChange = (isVisible) => {
    if (isVisible) {
      setVisible(true);
    }
  };
  return (
    <Reveal>
      {" "}
      <VisibilitySensor onChange={onChange}>
        <div className="flex flex-col justify-between gap-10 items-center px-10 py-5 text-center">
          <p className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
            BHKW Service SCANIA/MAN
          </p>
          <p className="text-md lg:text-xl xl:text-2xl">
            Wir bieten umfassende Wartungsdienstleistungen für SCANIA-Motoren
            werden beim Betrieb von BIO-Gasanlagen eingesetzt. Wir haben unseren
            eigenen Laden und professionelles Personal.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 justify-around w-full ">
            <div className="flex flex-col gap-5 items-center bg-white rounded-3xl p-4">
              <LuCalendarClock size={100} className="" />
              <p className="font-bold text-3xl">Website-Überwachung</p>
            </div>
            <div className="flex flex-col gap-5 items-center bg-white rounded-3xl p-4">
              <HiOutlineWrenchScrewdriver size={100} className="" />
              <p className="font-bold text-3xl">
                Umfassender
                <br />
                Service
              </p>
            </div>
            <div className="flex flex-col gap-5 items-center bg-white rounded-3xl p-4">
              <img src={icon} className="h-[100px] " alt="" />
              <p className="font-bold text-3xl">
                Zusammenfassung der Rentabilität
              </p>
            </div>
          </div>
        </div>
      </VisibilitySensor>
    </Reveal>
  );
};

export default Servicemain;
