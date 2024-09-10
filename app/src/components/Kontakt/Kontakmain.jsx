import React from "react";
import img from "../../assets/kontakt/kontaktimg.png";

const Kontakmain = () => {
  return (
    <div className="flex flex-col pt-[100px] px-10 justify-center items-center">
      <p className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        O nas
      </p>
      <div className="flex md:flex-row flex-col">
        <div className="flex flex-col gap-3">
          <img src={img} alt="" className="w-[200px]" />
          <p className="text-xl font-bold"> BHKW Anlagenservice</p>
          <ul className="list-disc text-xl font-semibold ">
            <li>Christopf Bernhard Strasse 17</li>
            <li>493945 Lohne</li>
            <li>Deutschland</li>
            <li>
              Telefon:
              <a href="tel:+49 01545 6532 789" className="">
                +49 (0) 1545 6532 789
              </a>
            </li>

            <li>
              Email:
              <a href="mailto:info@scania-bhkw-ersatzteile.de" className="">
                info@scania-bhkw-ersatzteile.de
              </a>
            </li>
          </ul>
        </div>
        <div>as</div>
      </div>
    </div>
  );
};

export default Kontakmain;
