import endpoints from "../utils/endpoints";
import axios from "axios";

const ApiService = {};

const Request = axios.create({
  baseURL: "",
  timeout: 15000,
  headers: {
    "X-Powered-By": "Bloom",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

ApiService.Login = async (email, password) => {
  try {
    let res = await Request.post(endpoints.login.url, {
      email: email,
      password: password,
    });
    if (res.data.status == "error") {
      throw new Error(res.message);
    }
    return res.data;
  } catch (error) {
    // throw new Error(error);
    return error;
  }
};

ApiService.ChurchList = async (url) => {
  try {
    let res = await Request.get(url ? url : endpoints.churchList.url);
    return res.data.data;
  } catch (error) {
    checkAuth(error);
    // return error;
    throw new Error(error);
  }
};

ApiService.ParticipantsList = async (url) => {
  try {
    let res = await Request.get(url ? url : endpoints.participantList.url);
    return res.data;
  } catch (error) {
    checkAuth(error);
    // return error;
    throw new Error(error);
  }
};

ApiService.ParticipantCreate = async (data) => {
  try {
    let res = await Request.post(endpoints.participantCreate.url, data);
    return res.data;
  } catch (error) {
    checkAuth(error);
    // throw new Error(error);
    return error;
  }
};

ApiService.ChurchParticipantsCreate = async (data) => {
  try {
    let res = await Request.post(endpoints.churchParticipantCreate.url, data);
    return res.data;
  } catch (error) {
    checkAuth(error);
    throw new Error(error);
  }
};

ApiService.ChurchCreate = async (data) => {
  try {
    let res = await Request.post(endpoints.churchCreate.url, data);
    return res.data;
  } catch (error) {
    checkAuth(error);
    throw new Error(error);
  }
};

function checkAuth(error) {
  if (error?.response?.status == 401 || error?.response?.status == 403) {
    return (window.location.href = "/login");
  }
}

export default ApiService;
