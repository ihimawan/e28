import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-json-server.typicode.com/ihimawan/e28JsonServer"
});

export default instance;
