import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const supportApi = {
  getAllSupport: async () => {
    try {
      const res = await axios.get(`${API}/support`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createSupport: async (data) => {
    try {
      const res = await axios.post(`${API}/support/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  editSupport: async (data) => {
    try {
      const res = await axios.put(`${API}/support/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
};
