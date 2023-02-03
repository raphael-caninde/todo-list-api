import axios from "axios";
import { localStg } from "../utils/handleLocalStorage";

const getToken = localStg.get.token();

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${getToken}`,
  }
});
