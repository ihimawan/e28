import axios from "axios";

const instance = axios.create({
  baseURL: "https://lammaandalpaca.firebaseio.com/"
});

export default instance;
