import React from "react";
import chlop from "../../assets/chlop.png";
import { LuCalendarClock } from "react-icons/lu";
import icon1 from "../../assets/icons/icon1.png";
import icon2 from "../../assets/icons/icon2.png";
import icon3 from "../../assets/icons/icon3.png";
import icon4 from "../../assets/icons/icon4.png";

const Rozwiazaniamain = () => {
  return (
    <div className="flex flex-col gap-10 justify-between items-center pt-[100px]">
      <p className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
        nasze rozwiązania
      </p>
      <div className="flex px-5">
        <img className="hidden md:block" src={chlop} alt="" />
        <div className="grid sm:grid-cols-2 gap-x-2 gap-y-4 grid-cols-1 ">
          <div className="text-white bg-[#031124] rounded-3xl w-full h-full flex text-center flex-col items-center justify-center gap-5 p-3">
            <img src={icon4} className="w-[100px] h-[100px]" alt="" />
            <p className="text-2xl font-semibold">Monitoring Serwisu</p>
            <p className="font-semibold text-lg w-[80%]">
              Nasz program sam wyśle prypomninie o nadchodzącym serwise, dieki
              czemu nie musisz juz więcej sam sprawdzać ile jeszcze motogodzin
              może przepracować twój silnik do następnego serwisu.
            </p>
          </div>
          <div className="p-3 w-full h-full flex text-center flex-col items-center justify-center gap-5">
            <img src={icon3} className="w-[100px] h-[100px]" alt="" />
            <p className="text-2xl font-semibold">Zestawienie Rentowsnosći</p>
            <p className="font-semibold text-lg w-[80%]">
              Już dziś dowiedz sięjakie jest zużycie BIO-gazu w porównaniu do
              wytwarzanego prądu i dostosuj swiją BIO-gazownie do najlepszych
              standardów.
            </p>
          </div>
          <div className="p-3 w-full h-full flex text-center flex-col items-center justify-center gap-5">
            <img src={icon2} className="w-[100px] h-[100px]" alt="" />
            <p className="text-2xl font-semibold">Sklep Internetowy</p>
            <p className="font-semibold text-lg w-[80%]">
              Zdobądź częsci zamienne w najpszych cennach na rynku, z ekspresową
              dostawą -minimalizując koszty!
            </p>
          </div>
          <div className="p-3 bg-[#031124] rounded-3xl text-white w-full h-full flex text-center flex-col items-center justify-center gap-5">
            <img src={icon1} className="w-[100px] h-[100px]" alt="" />
            <p className="text-2xl font-semibold">Kompleksowy Serwis</p>
            <p className="font-semibold text-lg w-[80%]">
              Nasi serwisanci sprostająkażdemu zadnaiu, które postawi twój
              slinik SCANIA. Nie musizs juz szukać specjalistów od każdej
              naprawy. Zostaw to nam!
            </p>
          </div>
        </div>
      </div>
      <button className="px-5 py-3 rounded-2xl text-white bold bg-[#031124] w-[200px]">
        Przejdz do kontaktu
      </button>
    </div>
  );
};

export default Rozwiazaniamain;
