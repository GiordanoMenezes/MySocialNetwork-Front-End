import Axios from 'axios';
import UrlBackEnd from './UrlBackEnd';


export const createPost = async (post) => {
  return await Axios.post(`${UrlBackEnd}/create-post`, post);
}
