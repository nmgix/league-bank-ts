import React from "react";
import loaderImage from "../../images/Infinity-1s-200px.gif";

export const Loader: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className='loader'>
      <img src={loaderImage} draggable={false} />
      {text && <span className='loader-text'>{text}</span>}
    </div>
  );
};
