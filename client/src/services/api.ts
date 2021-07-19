import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("@KIT:token")}`
  // }
});

// api.interceptors.response.use(response => {
//   return response;
// }, (error: AxiosError) => {
//   if(error.response?.status === 401) {
//     if(error.response?.data.message === "Invalid token!") {
//       window.location.reload();
//     }
//   }
// });
