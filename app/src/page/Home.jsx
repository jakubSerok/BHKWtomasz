import React from "react";
import Mainbanner from "../components/Home/Mainbanner";
import Servicemain from "../components/Home/Servicemain";
import Rozwiazaniamain from "../components/Home/Rozwiazaniamain";

const Home = () => {
  return (
    <div>
      <Mainbanner />
      <Servicemain />
      <Rozwiazaniamain />
    </div>
  );
};

export default Home;
