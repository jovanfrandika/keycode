import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.stevenhansel.com"
})

export default axios;