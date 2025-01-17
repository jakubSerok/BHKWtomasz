import React from "react";

const Footer = () => {
  return (
    <footer className="p-10 mt-20 border-t border-neutral-700 flex flex-col gap-8 text-white bg-gray-800">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5">
        <div>
          <h1 className="mb-4 font-semibold text-lg">Kontaktdaten</h1>
          <ul className="space-y-2">
            <li>NIP: DE845645213</li>
            <li>Address: Hopener Straße 5, 49393 Lohne</li>
            <li>
              Email:
              <a href="mailto:info@scania-bhkw-ersatzteile.de" className="px-1">
                info@scania-bhkw-ersatzteile.de
              </a>
            </li>
            <li>
              Tel:
              <a href="tel:+49 152 2755 1845" className="px-1">
                +49 152 2755 1845
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-lg">Links</h3>
          <ul className="flex flex-col justify-between  gap-2">
            <li className="hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/shop">SHOP</a>
            </li>
            <li className="hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/">Home</a>
            </li>
            <li className="hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/blogs">Blogs</a>
            </li>
            <li className="hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/about"> Über uns</a>
            </li>
            <li className="hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/kontakt">Kontakt</a>
            </li>
            <li className="hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/oferta">Angebot</a>
            </li>
          </ul>
        </div>
      </div>
      <div className=" text-center  ">
        <span>© 2024 Copyright </span>
        <a className="font-semibold " href="./">
          BHKW Anlagenservice GbR
        </a>
        <br />
        <a
          className="font-semibold "
          href="https://www.hyperbaystudio.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          DESIGNED & POWERED BY HYPERBAY
        </a>
      </div>
    </footer>
  );
};

export default Footer;
