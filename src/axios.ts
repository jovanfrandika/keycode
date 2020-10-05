import Axios from "axios";

const axios = Axios.create({
  // baseURL: "https://localhost:4000"
  baseURL: "http://128.199.142.144/"
});

export default axios;