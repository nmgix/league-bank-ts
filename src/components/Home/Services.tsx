import React from "react";
import { useState } from "react";

import { SwiperComponent } from "../SwiperComponent";

export const Services: React.FC<{ slides: React.ReactElement[]; buttonSlides: React.ReactElement[]; id: string }> = ({
  slides,
  buttonSlides,
  id,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const CardHolder: React.FC<{ currentPage: number }> = ({ currentPage }) => {
    return slides[currentPage - 1];
  };

  return (
    <div id={id}>
      <SwiperComponent slides={slides} />

      <div className='card-switch'>
        <ul>
          {buttonSlides.map((slide: React.ReactNode, index: number) => (
            <li key={index} onClick={() => setCurrentPage(index + 1)}>
              {slide}
            </li>
          ))}
        </ul>
        <div className='card-holder'>
          <CardHolder currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
};
