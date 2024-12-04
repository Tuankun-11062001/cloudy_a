import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const lyricsApi = {
  getAllLyrics: async (query) => {
    try {
      const res = await axios.get(`${API}/lyrics${query}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  findLyrics: async (id) => {
    try {
      const res = await axios.get(`${API}/lyrics/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  editLyrics: async (data) => {
    try {
      const res = await axios.put(`${API}/lyrics/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  createLyrics: async (data) => {
    try {
      const res = await axios.post(`${API}/lyrics/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteLyrics: async (data) => {
    try {
      const res = await axios.delete(`${API}/lyrics/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
