import axios from "axios";

const instance = axios.create({
  baseURL: `http://127.0.0.1:3000`,
  headers: {
    "Content-Type": "application/json",
  }
});


const dashboard = {
  setConfig: (body:any) => instance.post("/elastic/set-config", body),
};


const api = {
    dashboard,

};

export default api;
