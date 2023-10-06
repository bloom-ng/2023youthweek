/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineClose, AiOutlineDownload } from "react-icons/ai";
import Bg from "../assets/background.png";
import html2canvas from "html2canvas";
function User({ image, name, closeModal }) {
  const posterRef = React.useRef(null);
  const downloadPoster = () => {
    html2canvas(posterRef.current, {
      backgroundColor: "transparent",
    }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      closeModal();
    });
  };
  return (
    <div
      ref={posterRef}
      className="flex flex-col justify-center items-center w-full h-full md:w-full md:h-full"
    >
      <img src={Bg} className="absolute w-80 h-80" alt="" />
      <div className="flex justify-between ">
        <button onClick={downloadPoster}>
          <AiOutlineDownload
            size={30}
            className="text-white relative right-28 -top-[100px] md:hidden "
          />
        </button>
        <button onClick={() => closeModal()}>
          <AiOutlineClose
            size={30}
            className="text-white relative left-28 -top-[100px] md:hidden"
          />
        </button>
      </div>

      <div className="relative top-[-36px]">
        <img
          src={image}
          alt="user image"
          className=" w-40 h-40 rounded-full object-cover"
        />
      </div>
      <div className="relative top-[-35px]">
        <p className="text-center text-white uppercase font-medium font-race ">
          {name}
        </p>
      </div>
    </div>

    // </div>
  );
}

export default User;
