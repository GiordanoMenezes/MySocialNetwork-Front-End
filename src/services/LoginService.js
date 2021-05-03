import Axios from "axios";
import UrlBackEnd from "./UrlBackEnd";

export const loginUser = async (userdata) => {
  const response = await Axios.post(`${UrlBackEnd}/login`, userdata);
  if (response.data) {
    localStorage.setItem("complexapp-username", response.data.username);
    localStorage.setItem("complexapp-token", response.data.token);
    localStorage.setItem("complexapp-avatar", response.data.avatar);
  } else {
    throw Error("Invalid Username or Password");
  }
}