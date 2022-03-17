import React from "react";

export const BackgorundBlackout: React.FC<{ zIndex: number; opacity: number /*blur?: number*/ }> = ({
  zIndex,
  opacity,
  /*blur,*/
}) => {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  // @ https://www.stackfinder.ru/questions/1145850/how-to-get-height-of-entire-document-with-javascript#:~:text=Самый%20простой%20способ%20получить%20правильную,var%20height%20%3D%20Math.max(body.scrollHeight%2C%20body.offsetHeight

  return (
    <div
      style={{
        zIndex: zIndex,
        opacity: `${opacity}%`,
        // filter: blur !== 0 ? `blur(${blur}px)` : "none",
        height: height /* + height * 0.01*/,
      }}
      className='background-blackout'></div>
  );
};
