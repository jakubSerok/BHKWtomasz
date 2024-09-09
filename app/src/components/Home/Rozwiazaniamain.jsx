import React from "react";

const Rozwiazaniamain = () => {
  return (
    <div className="flex flex-col gap-10 justify-between items-center pt-[100px]">
      <p className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        nasze rozwiązania
      </p>
      <div className="flex ">
        <p className="hidden sm:block">img</p>
        <div className="">
          <div>
            <p>icon</p>
            <p>tekst1</p>
            <p>tekst2</p>
          </div>
          <div>
            <p>icon</p>
            <p>tekst1</p>
            <p>tekst2</p>
          </div>
          <div>
            <p>icon</p>
            <p>tekst1</p>
            <p>tekst2</p>
          </div>
          <div>
            <p>icon</p>
            <p>tekst1</p>
            <p>tekst2</p>
          </div>
        </div>
      </div>
      <button className="px-5 py-3 rounded-2xl text-white bold bg-slate-600 w-[200px]">
        Przejdz do kontaktu
      </button>
    </div>
  );
};

export default Rozwiazaniamain;
