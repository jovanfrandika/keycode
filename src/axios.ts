import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.frandika.tech/keycode/"
})

export default axios;