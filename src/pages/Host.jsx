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
import At from "../assets/bg.jpg";
import { getGroupType } from "../utils/Types";

export default function FramerAnimation() {
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const [churches, setChurches] = React.useState([]);
  const [team, setTeam] = React.useState("");
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

  const createParticipant = async (e) => {
    e.target.value = "Processing";

    // Validate fields
    if (!host.name || !host.phone || !host.email || !hostImage) {
      Swal.fire({
        title: "Error",
        icon: "warning",
        text: "Please fill all the fields",
      });
      e.target.value = "Submit";
      return; // Stop execution if any field is empty
    } else {
      if (hostImage.size > MAX_IMAGE_SIZE) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "File too large",
        });
        e.target.value = "Submit";
        return;
      }
      const fData = new FormData();
      fData.append("image", hostImage);

      for (const key in host) {
        fData.append(key, host[key]);
      }

      const response = await ApiService.ParticipantCreate(fData);
      if (response.data) {
        setTeam(response.data.group)
        setModalOpen(true);
        downloadPoster();
      } else if (response?.response?.data?.errors) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.response?.data?.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
      }
    }
    e.target.value = "Submit";
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
    <>
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
                  <AiTwotoneHome size={30} className="inline mb-2" />
                </Link>
                <div>Host Registration</div>
              </motion.h1>
            </div>
            <div>
              <form>
                <div className="my-8 flex flex-col  justify-center text-white">
                  <label
                    htmlFor="select-img"
                    className="font-race border-b-2 w-72"
                  >
                    Select image <FaRegImage size={30} className="inline" />
                  </label>
                  {hostPreview && (
                    <img
                      className="w-[100px] h-[100px] mx-auto justify-center"
                      src={hostPreview}
                      alt=""
                    />
                  )}
                  <input
                    onChange={(e) => {
                      setHostImage(e.target.files[0]);
                      setHostPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    className="bg-transparent text-white  justify-center hidden items-center text-sm  font-race font-thin outline-none w-full"
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
                    placeholder="Enter Full name"
                  />
                </div>
                <div className="my-8">
                  <input
                    onChange={(e) =>
                      setHost((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72"
                    type="tel"
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
                    onClick={(e) => {
                      createParticipant(e);
                      playSound;
                    }}
                    className="cursor-pointer bg-gradient-to-r from-orange-500 to-purple-900 text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72"
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
      </motion.div>
      {modalOpen && (
        <div className="bg-gradient-to-r from-[#360023] to-[#0e063a] overflow-x-hidden bg-opacity-50 z-50  flex-col items-center justify-center fixed top-0 left-0 w-screen min-h-full">
          {/* Modal content */}
          <div className="flex justify-around items-center">
            <button className=" font-race" onClick={downloadPoster}>
              <AiOutlineDownload size={30} className="text-white" />
            </button>
            <button className=" font-race" onClick={closeModal}>
              <AiOutlineClose size={30} className="text-white" />
            </button>
          </div>

          <div
            ref={posterRef}
            className="relative md:h-4/5 md:w-1/2 sm:h-4/5 sm:w-4/5 h-full w-full mt-10 mx-auto"
          >
            <img src={Bg} alt="" className="block w-full h-full" />
            <div className="absolute top-0 left-0 w-full h-2/3 flex flex-col items-center justify-center ">
              <div className="mt-4 md:mt-8">
                <img
                  src={hostImage ? URL.createObjectURL(hostImage) : ""}
                  alt="user image"
                  className={`2xl:h-96 2xl:w-96 xl:h-60 xl:w-60 lg:h-52 lg:w-52 md:h-44 md:w-44 sm:h-40 sm:w-40 h-32 w-32 rounded-full object-cover ${
                    hostImage ? "" : "hidden"
                  }`}
                />
              </div>
              <div className=" mt-4 lg:mt-8">
                <p className="text-center text-white uppercase font-medium font-race lg:text-xl  text-sm ">
                  {host.name}
                </p>
                <p className="text-center text-white uppercase font-medium font-race lg:text-xl  text-sm ">
                  #TEAM-{getGroupType(team)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
