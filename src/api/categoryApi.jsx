import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const categoryApi = {
  getAllCategory: async (query) => {
    try {
      const res = await axios.get(`${API}/category?q=${query}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createCategory: async (data) => {
    try {
      const res = await axios.post(`${API}/category/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteCategory: async (data) => {
    try {
      const res = await axios.delete(`${API}/category/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
