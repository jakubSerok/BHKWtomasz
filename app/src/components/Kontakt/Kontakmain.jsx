import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import img from "../../assets/kontakt/kontaktimg.png";

const Kontakmain = () => {
  const form = useRef();
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gtj3g2r", // Your EmailJS service ID
        "template_342jpg4", // Your EmailJS template ID
        form.current,
        "v71Xu0aqy7GD7W7q1" // Your EmailJS public key
      )
      .then(
        () => {
          console.log("SUCCESS!");
          setIsSuccess(true);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="flex flex-col pt-[100px] px-10 justify-center items-center">
      <p className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        Kontakt
      </p>
      <div className="flex md:flex-row flex-col mt-10 gap-10">
        <div className="flex flex-col gap-3">
          <img src={img} alt="Kontakt Image" className="w-[200px]" />
          <p className="text-xl font-bold">BHKW Anlagenservice</p>
          <ul className="list-disc text-xl font-semibold ">
            <li>Christopf Bernhard Strasse 17</li>
            <li>49393 Lohne</li>
            <li>Deutschland</li>
            <li>
              Telefon:
              <a href="tel:+49 01545 6532 789" className="ml-1">
                +49 (0) 1545 6532 789
              </a>
            </li>
            <li>
              Email:
              <a href="mailto:info@scania-bhkw-ersatzteile.de" className="ml-1">
                info@scania-bhkw-ersatzteile.de
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col bg-gray-100 p-6 rounded-md shadow-md w-full md:w-[400px]">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
            <label className="font-semibold text-xl">Name</label>
            <input
              type="text"
              name="user_name"
              className="p-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
            />

            <label className="font-semibold text-xl">Email</label>
            <input
              type="email"
              name="user_email"
              className="p-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
            />

            <label className="font-semibold text-xl">Message</label>
            <textarea
              name="message"
              rows="5"
              className="p-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Schicken
            </button>

            {isSuccess && (
              <p className="text-green-500 font-semibold mt-2">
                Ihre Nachricht wurde erfolgreich gesendet!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Kontakmain;
