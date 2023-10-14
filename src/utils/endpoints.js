const baseURL = "https://api.csmcgethsemanehq.com/api/youthweek/";

export default {
  login: {
    url: "https://api.csmcgethsemanehq.com/api/login/",
    method: "POST",
    auth: false,
  },
  churchList: { url: baseURL + "churches", method: "GET", auth: true },
  participantList: { url: baseURL + "participants", method: "GET", auth: true },
  participantInfo: {
    url: baseURL + "participants/info",
    method: "GET",
    auth: true,
  },
  churchCreate: { url: baseURL + "churches", method: "POST", auth: false },
  participantCreate: {
    url: baseURL + "participants",
    method: "POST",
    auth: false,
  },
  churchParticipantCreate: {
    url: baseURL + "church-participants",
    method: "POST",
    auth: false,
  },
};
