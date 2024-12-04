import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const singerApi = {
  getAllSinger: async (query) => {
    try {
      const res = await axios.get(`${API}/lyrics/singer`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createSinger: async (data) => {
    try {
      const res = await axios.post(`${API}/lyrics/singer/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteSinger: async (data) => {
    try {
      const res = await axios.delete(`${API}/lyrics/singer/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
