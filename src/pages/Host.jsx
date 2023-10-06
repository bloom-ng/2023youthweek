/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  AiOutlineClose,
  AiOutlineDownload,
  AiTwotoneHome,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import ApiService from "../services/ApiService";
import soundFile from "../assets/sound.mp3";
import Swal from "sweetalert2";
import { FaRegImage } from "react-icons/fa";
import html2canvas from "html2canvas";
import Bg from "../assets/background.png";

export default function FramerAnimation() {
  const [churches, setChurches] = React.useState([]);
  const [newChurch, setNewChurch] = React.useState({ name: "" });
  const [hostImage, setHostImage] = React.useState(null);
  const [hostPreview, setHostPreview] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const posterRef = React.useRef(null);
  const [host, setHost] = React.useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    type: 0,
    church_id: 1,
  });

  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const fetchChurches = async () => {
    try {
      let res = await ApiService.ChurchList();
      setChurches(res);
    } catch (error) {
      throw new Error(error);
    }
  };

  const createParticipant = async (e) => {
    try {
      e.target.value = "Processing";
      const fData = new FormData();
      fData.append("image", hostImage);
      for (const key in host) {
        fData.append(key, host[key]);
      }
      const response = await ApiService.ParticipantCreate(fData);
      if (response.data) {
        setModalOpen(true);
      } else if (response.errors) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An Error Occured please try again later.",
        });
      }
    } catch (error) {
      e.target.value = "Submit";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      throw new Error(error);
    }
    e.target.value = "Submit";
  };

  const downloadPoster = () => {
    html2canvas(posterRef.current, {
      backgroundColor: "transparent",
      // scale: "5",
      allowTaint: true,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      console.log(dataURL);
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    // closeModal();
  };

  const closeModal = () => {
    // Close the modal
    setModalOpen(false);

    // Clear the form fields
    setHost({
      name: "",
      email: "",
      phone: "",
      gender: "",
      type: 0,
      church_id: 1,
    });
    setHostImage(null);
    setHostPreview(null);
    window.location.reload();
  };

  React.useEffect(() => {
    (async () => {
      await fetchChurches();
    })();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-10 md:px-20 flex flex-col justify-center items-center bg-gradient-to-r from-[#360023] to-[#0e063a] h-screen w-screen">
        <div className=" flex-col flex justify-center items-center py-4 ">
          <div className="text-center text-white text-2xl font-bold uppercase py-2 font-race">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                duration: "2",
                delay: "0.5",
              }}
            >
              <Link to="/">
                <AiTwotoneHome size={30} className="inline mr-2" />
              </Link>
              Host Registration
            </motion.h1>
          </div>
          <div>
            <form>
              <div className="my-8 flex flex-col border-2 justify-center text-white">
                <label htmlFor="select-img" className="font-race">
                  Select image <FaRegImage size={30} className="inline" />
                </label>
                {hostPreview && (
                  <img
                    className="w-[100px] h-[100px] justify-center"
                    src={hostPreview}
                    alt=""
                  />
                )}
                <input
                  onChange={(e) => {
                    setHostImage(e.target.files[0]);
                    setHostPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  className="bg-transparent text-white border justify-center hidden items-center border-t-0 border-x-0 border-b-1 text-sm  font-race font-thin outline-none w-full"
                  accept="image/*"
                  id="select-img"
                  type="file"
                />
              </div>
              <div className="my-8">
                <input
                  onChange={(e) =>
                    setHost((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72"
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Full name"
                />
              </div>
              <div className="my-8">
                <input
                  onChange={(e) =>
                    setHost((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72"
                  type="number"
                  name=""
                  id=""
                  placeholder="Enter Phone number"
                />
              </div>

              <div className="my-8">
                <input
                  onChange={(e) =>
                    setHost((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72"
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                />
              </div>
              <div className="my-8">
                <input
                  onClick={createParticipant}
                  className=" bg-gradient-to-r from-orange-500 to-purple-900 text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72"
                  type="button"
                  value="Submit"
                />
              </div>

              <a
                href="/register"
                className="flex justify-center items-center font-race text-white text-center"
                style={{ color: "white" }}
                onClick={playSound}
              >
                Are You A Guest? Click Here
              </a>
            </form>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="bg-gray-800 bg-opacity-50 flex  flex-col items-center justify-center absolute top-0 left-0 w-screen h-screen">
          {/* Modal content */}
          <div className="flex justify-center items-center gap-52 z-10">
            <button className="mb-20" onClick={downloadPoster}>
              <AiOutlineDownload size={30} className="text-white" />
            </button>
            <button className="mb-20" onClick={closeModal}>
              <AiOutlineClose size={30} className="text-white" />
            </button>
          </div>

          <div className="modal-content" ref={posterRef}>
            {/* Add your modal content here */}
            {/* <User image={URL.createObjectURL(guestImage)} name={guest.name} /> */}

            <div className="flex flex-col justify-center items-center w-80 h-80">
              <img src={Bg} className="absolute" alt="" />
              <div className="relative top-[-36px]">
                <img
                  src={URL.createObjectURL(hostImage)}
                  alt="user image"
                  className=" w-40 h-40 rounded-full object-cover"
                />
              </div>
              <div className="relative top-[-35px]">
                <p className="text-center text-white uppercase font-medium font-race ">
                  {host.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
