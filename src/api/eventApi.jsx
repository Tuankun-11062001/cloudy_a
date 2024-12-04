import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const eventApi = {
  getAllEvent: async () => {
    try {
      const res = await axios.get(`${API}/event`);
      return res;
    } catch (error) {
      return error;
    }
  },

  findEvent: async () => {
    try {
      const res = await axios.get(`${API}/event/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createEvent: async (data) => {
    try {
      const res = await axios.post(`${API}/event/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  editEvent: async (data) => {
    try {
      const res = await axios.put(`${API}/event/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteEvent: async (data) => {
    try {
      const res = await axios.delete(`${API}/event/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
