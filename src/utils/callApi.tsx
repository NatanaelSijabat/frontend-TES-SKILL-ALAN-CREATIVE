/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_API}`;

// const headersSetting = {
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
//   Accept: "application/json",
// };

const API_URL = axios.create({
  baseURL: baseURL,
});

export { API_URL };
