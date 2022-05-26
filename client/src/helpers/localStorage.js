export const setCookie = (data) => {
  return localStorage.setItem("user", JSON.stringify(data));
};

export const getCookie = () => {
  const data = localStorage.getItem("user");
  return JSON.parse(data)?.token;
};

export const deleteCookie = () => {
  return localStorage.removeItem("user");
};
