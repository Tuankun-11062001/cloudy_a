import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const adsApi = {
  getAllAds: async () => {
    try {
      const res = await axios.get(`${API}/ads`);
      return res;
    } catch (error) {
      return error;
    }
  },

  findAds: async () => {
    try {
      const res = await axios.get(`${API}/ads/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createAds: async (data) => {
    try {
      const res = await axios.post(`${API}/ads/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  editAds: async (data) => {
    try {
      const res = await axios.put(`${API}/ads/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteAds: async (data) => {
    try {
      const res = await axios.delete(`${API}/ads/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
