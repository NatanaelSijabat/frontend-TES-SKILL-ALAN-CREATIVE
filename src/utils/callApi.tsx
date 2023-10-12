/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_API}`;

const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const API_URL = axios.create({
  baseURL: baseURL,
  headers: headersSetting,
});

export { API_URL };
