import React from "react";

export const ImagePlacholder: React.FC<{ width: number; height: number; rounded?: boolean; src?: string }> = ({
  width,
  height,
  rounded,
  src,
}) => {
  if (src) {
    return (
      <img src={src} style={{ width: width, height: height, borderRadius: rounded ? "50%" : "" }} draggable={false} />
    );
  } else {
    return (
      <div
        className='img-placeholder'
        style={{ width: width, height: height, borderRadius: rounded ? "50%" : "" }}></div>
    );
  }
};
