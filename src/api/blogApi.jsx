import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const blogApi = {
  getAllBlogs: async (query) => {
    try {
      const res = await axios.get(`${API}/blogs${query}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  findBlogs: async (id) => {
    try {
      const res = await axios.get(`${API}/blogs/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  editBlogs: async (data) => {
    try {
      const res = await axios.put(`${API}/blogs/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  createBlogs: async (data) => {
    try {
      const res = await axios.post(`${API}/blogs/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteBlogs: async (data) => {
    try {
      const res = await axios.delete(`${API}/blogs/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
