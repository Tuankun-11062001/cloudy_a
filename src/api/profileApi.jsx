import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const profileApi = {
  getAllProfile: async () => {
    try {
      const res = await axios.get(`${API}/profile`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createProfile: async (data) => {
    try {
      const res = await axios.post(`${API}/profile/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  editProfile: async (data) => {
    try {
      const res = await axios.put(`${API}/profile/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
};
