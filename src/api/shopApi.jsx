import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const shopApi = {
  getAllProduct: async (query) => {
    try {
      const res = await axios.get(`${API}/shop${query}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  findProduct: async (id) => {
    try {
      const res = await axios.get(`${API}/shop/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  editProduct: async (data) => {
    try {
      const res = await axios.put(`${API}/shop/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  createProduct: async (data) => {
    try {
      const res = await axios.post(`${API}/shop/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteProduct: async (data) => {
    try {
      const res = await axios.delete(`${API}/shop/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
