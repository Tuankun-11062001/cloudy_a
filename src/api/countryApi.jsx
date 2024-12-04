import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const countryApi = {
  getAllCountry: async (query) => {
    try {
      const res = await axios.get(`${API}/lyrics/country`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createCountry: async (data) => {
    try {
      const res = await axios.post(`${API}/lyrics/country/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteCountry: async (data) => {
    try {
      const res = await axios.delete(`${API}/lyrics/country/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
