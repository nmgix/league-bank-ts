import React from "react";
import { Calculator } from "../components/Home/Calculator";
import { Map } from "../components/Home/Map";
import { Services } from "../components/Home/Services";

export const Home: React.FC = () => {
  return (
    <div className='main-wrapper'>
      <div className='slider'></div>
      <div className='main-content background-limit'>
        <Services />
        <Calculator />
        <Map />
      </div>
    </div>
  );
};
