import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const partnerApi = {
  getAllPartner: async () => {
    try {
      const res = await axios.get(`${API}/partner`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createPartner: async (data) => {
    try {
      const res = await axios.post(`${API}/partner/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deletePartner: async (data) => {
    try {
      const res = await axios.delete(`${API}/partner/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
