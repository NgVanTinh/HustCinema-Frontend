import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/auth`;

// export const register = async (firstName, lastName, gender, phoneNumber, email, userName, password) => {
//   const url = `${baseUrl}/user/`;
//   const body = {
//     firstName,
//     lastName,
//     gender,
//     phoneNumber,
//     email,
//     userName,
//     password,
//   };
//   return axios({
//     url, 
//     body
//   });
// };

export const login = (userName, password) => {
  const url = `${baseUrl}/login`;
  return axios.post(
    url,
    { 
      userName: userName, 
      password: password
    },
  );
};

export const logout = (token, controller) => {
  const url = `${baseUrl}/logout`;
  const body = null;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, body, config);
};