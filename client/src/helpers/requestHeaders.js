import { getCookie } from "./localStorage";
const token = getCookie();

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export default headers;
