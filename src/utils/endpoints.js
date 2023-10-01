const baseURL = "https://api.csmcgethsemanehq.com/api/youthweek/";

export default {
    login:              {url: baseURL + 'login',        method: "POST", auth: false},
    churchList:         {url: baseURL + 'churches',     method: "GET",  auth: false},
    churchCreate:       {url: baseURL + 'churches',     method: "POST", auth: false},
    participantCreate:  {url: baseURL + 'participants', method: "POST", auth: false},

}