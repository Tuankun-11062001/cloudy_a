import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const chapterApi = {
  getAllChapter: async (query) => {
    try {
      const res = await axios.get(`${API}/chapters${query}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  findChapter: async (id) => {
    try {
      const res = await axios.get(`${API}/chapters/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  editChapter: async (data) => {
    try {
      const res = await axios.put(`${API}/chapters/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  createChapter: async (data) => {
    try {
      const res = await axios.post(`${API}/chapters/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteChapter: async (data) => {
    try {
      const res = await axios.delete(`${API}/chapters/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
