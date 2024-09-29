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
        OFERTA
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
                Monitoring Serwisu
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Nasz program sam wyśle przypomninie od nadchodzącym sweriwse,
                dieki zemu nie muisz już więcej sam sprawadzć ie jeszcze
                otogodzin może przepracwać twój silnik do nstpepnego serwisu.
              </p>
              <button className="w-[100px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="/kontakt"> zamów</a>
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
                Zestawienie Rentowsnosći
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Już dziś dowiedz sięjakie jest zużycie BIO-gazu w porównaniu do
                wytwarzanego prądu i dostosuj swiją BIO-gazownie do najlepszych
                standardów.
              </p>
              <button className="w-[150px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="/oferta">Uzyska ofertę</a>
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
                Sklep Internetowy
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Zdobądź częsci zamienne w najpszych cennach na rynku, z
                ekspresową dostawą -minimalizując koszty!
              </p>
              <button className="w-[100px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="/shop">sklep</a>
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
                Kompleksowy Serwis
              </h2>
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Nasi serwisanci sprostająkażdemu zadnaiu, które postawi twój
                slinik SCANIA. Nie musizs juz szukać specjalistów od każdej
                naprawy. Zostaw to nam!
              </p>
              <button className="w-[150px] bg-[#031124] uppercase px-4 py-2 text-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
                <a href="tel:+49 01545 6532 789" className="">
                  zadzwoń
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
