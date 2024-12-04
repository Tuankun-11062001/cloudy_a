import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const authApi = {
  login: async (data) => {
    try {
      const res = await axios.post(`${API}/auth/login`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
  findAdmin: async (id) => {
    try {
      const res = await axios.get(`${API}/user/find/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
