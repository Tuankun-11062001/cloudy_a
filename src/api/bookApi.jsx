import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const bookApi = {
  getAllBook: async (query) => {
    try {
      const res = await axios.get(`${API}/books${query}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  findBook: async (id) => {
    try {
      const res = await axios.get(`${API}/books/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  editBook: async (data) => {
    try {
      const res = await axios.put(`${API}/books/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  createBook: async (data) => {
    try {
      const res = await axios.post(`${API}/books/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteBook: async (data) => {
    try {
      const res = await axios.delete(`${API}/books/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
