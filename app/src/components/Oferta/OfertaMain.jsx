import React, { useState } from "react";
import img1 from "../../assets/ofertaImg/obraz.png";
import img2 from "../../assets/ofertaImg/obraz2.png";
import img3 from "../../assets/ofertaImg/obraz3.png";
import img4 from "../../assets/ofertaImg/obraz4.png";
import VisibilitySensor from "react-visibility-sensor";
import Reveal from "../Animation/Reveal";

const OfertaMain = () => {
  const [visible, setVisible] = useState(false);

  const onChange = (isVisible) => {
    if (isVisible) {
      setVisible(true);
    }
  };
  return (
    <div className="px-10 flex flex-col items-center justify-center pt-[100px] gap-10">
      <h1 className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        ANGEBOT
      </h1>
      <Reveal>
        <VisibilitySensor onChange={onChange}>
          <div className="flex md:flex-row flex-col  p-3 ">
            <img
              src={img1}
              alt=""
              className="h-[300px] md:h-[400px] rounded-t-2xl rounded-l-none md:rounded-t-none md:rounded-l-2xl"
            />

            <div className="flex flex-col gap-4 bg-slate-100  rounded-b-2xl  md:rounded-l-none md:rounded-r-2xl p-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                Wartungsüberwachung
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Unser Programm sendet automatisch Erinnerungen für bevorstehende
                Wartungen, sodass Sie nicht mehr selbst überprüfen müssen, wie
                viele Stunden Ihr Motor bis zur nächsten Wartung noch arbeiten
                kann.
              </p>
              <button className="w-[100px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="/kontakt"> Bestellung</a>
              </button>
            </div>
          </div>
        </VisibilitySensor>
      </Reveal>
      <Reveal>
        <VisibilitySensor onChange={onChange}>
          <div className="flex md:flex-row flex-col-reverse p-3 ">
            <div className="flex flex-col gap-4 bg-slate-100  rounded-b-2xl  md:rounded-r-none md:rounded-l-2xl p-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                Rentabilitätsanalyse
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Erfahren Sie noch heute, wie der Verbrauch von Biogas im
                Vergleich zur erzeugten Energie aussieht und passen Sie Ihre
                Biogasanlage an die besten Standards an.
              </p>
              <button className="w-[150px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="/oferta"> Angebot erhalten</a>
              </button>
            </div>{" "}
            <img
              src={img2}
              alt=""
              className="h-[300px] md:h-[400px]  rounded-t-2xl rounded-r-none md:rounded-t-none md:rounded-r-2xl"
            />
          </div>
        </VisibilitySensor>
      </Reveal>
      <Reveal>
        <VisibilitySensor onChange={onChange}>
          <div className="flex md:flex-row flex-col p-3 ">
            <img
              src={img3}
              alt=""
              className="h-[300px] md:h-[400px]  rounded-t-2xl rounded-l-none md:rounded-t-none md:rounded-l-2xl"
            />
            <div className="flex flex-col gap-4 bg-slate-100  rounded-b-2xl  md:rounded-l-none md:rounded-r-2xl  p-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                Online-Shop
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Erhalten Sie Ersatzteile zu den besten Preisen auf dem Markt,
                mit Expresslieferung – minimieren Sie die Kosten!
              </p>
              <button className="w-[100px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="/shop">Shop</a>
              </button>
            </div>
          </div>
        </VisibilitySensor>
      </Reveal>
      <Reveal>
        <VisibilitySensor onChange={onChange}>
          <div className="flex md:flex-row flex-col-reverse  p-3 ">
            <div className="flex flex-col gap-4 bg-slate-100 rounded-b-2xl  md:rounded-r-none md:rounded-l-2xl p-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                Umfassender Service
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Unsere Techniker meistern jede Aufgabe, die Ihr SCANIA-Motor
                stellt. Sie müssen nicht mehr nach Spezialisten für jede
                Reparatur suchen. Überlassen Sie das uns!
              </p>
              <button className="w-[150px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="tel:+49 01545 6532 789" className="">
                  Anrufen
                </a>
              </button>
            </div>{" "}
            <img
              src={img4}
              alt=""
              className="h-[300px] md:h-[400px]   rounded-t-2xl rounded-r-none md:rounded-t-none md:rounded-r-2xl"
            />
          </div>
        </VisibilitySensor>
      </Reveal>
    </div>
  );
};

export default OfertaMain;
