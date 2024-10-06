import React, { useState } from "react";
import chlop from "../../assets/chlop.png";
import { LuCalendarClock } from "react-icons/lu";
import icon1 from "../../assets/icons/icon1.png";
import icon2 from "../../assets/icons/icon2.png";
import icon3 from "../../assets/icons/icon3.png";
import icon4 from "../../assets/icons/icon4.png";
import VisibilitySensor from "react-visibility-sensor";
import Reveal from "../Animation/Reveal";

const Rozwiazaniamain = () => {
  const [visible, setVisible] = useState(false);

  const onChange = (isVisible) => {
    if (isVisible) {
      setVisible(true);
    }
  };
  return (
    <Reveal>
      <VisibilitySensor onChange={onChange}>
        <div className="flex flex-col gap-10 justify-between items-center pt-[100px]">
          <p className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
            Unsere Lösungen
          </p>
          <div className="flex px-5">
            <img className="hidden md:block" src={chlop} alt="" />
            <div className="grid sm:grid-cols-2 gap-x-2 gap-y-4 grid-cols-1 ">
              <div className="text-white bg-[#031124] rounded-3xl w-full h-full flex text-center flex-col items-center justify-center gap-5 p-3">
                <img src={icon4} className="w-[100px] h-[100px]" alt="" />
                <p className="text-2xl font-semibold">Website-Überwachung</p>
                <p className="font-semibold text-lg w-[80%]">
                  Unser Programm sendet automatisch eine Erinnerung an den
                  bevorstehenden Service. Vielen Dank, warum Sie es nicht mehr
                  selbst überprüfen müssen Motorstunden können Ihren Motor bis
                  zum nächsten laufen lassen Service.
                </p>
              </div>
              <div className="p-3 w-full h-full flex text-center flex-col items-center justify-center gap-5 bg-white rounded-3xl">
                <img src={icon3} className="w-[100px] h-[100px]" alt="" />
                <p className="text-2xl font-semibold">Rentenabrechnung</p>
                <p className="font-semibold text-lg w-[80%]">
                  Erfahren Sie noch heute, wie hoch der BIO-Gasverbrauch im
                  Vergleich ist an den erzeugten Strom anpassen und ihre
                  BIO-Gasanlagen daran anpassen die besten Standards.
                </p>
              </div>
              <div className="p-3 w-full h-full flex text-center flex-col items-center justify-center gap-5 bg-white rounded-3xl">
                <img src={icon2} className="w-[100px] h-[100px]" alt="" />
                <p className="text-2xl font-semibold">Internetshop</p>
                <p className="font-semibold text-lg w-[80%]">
                  Erhalten Sie Ersatzteile zu den besten Preisen auf dem Markt
                  mit Expressversand - Kosten minimieren!
                </p>
              </div>
              <div className="p-3 bg-[#031124] rounded-3xl text-white w-full h-full flex text-center flex-col items-center justify-center gap-5">
                <img src={icon1} className="w-[100px] h-[100px]" alt="" />
                <p className="text-2xl font-semibold">Umfassender Service</p>
                <p className="font-semibold text-lg w-[80%]">
                  Unsere Servicetechniker meistern jede Ihrer Herausforderungen
                  SCANIA-Motor. Sie müssen nicht mehr für jeden einzelnen
                  Spezialisten suchen Reparaturen. Überlassen Sie es uns!
                </p>
              </div>
            </div>
          </div>
          <button className="px-5 py-3 rounded-2xl text-white bold bg-[#031124] w-[200px]  hover:scale-105 transition-transform duration-200 ease-in-out">
            <a href="/kontakt">Gehen Sie zu Kontakt</a>
          </button>
        </div>
      </VisibilitySensor>
    </Reveal>
  );
};

export default Rozwiazaniamain;
