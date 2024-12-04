import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const userApi = {
  getAllUser: async () => {
    try {
      const res = await axios.get(`${API}/user`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createUser: async (data) => {
    try {
      const res = await axios.post(`${API}/user/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  changePassword: async (data) => {
    try {
      const res = await axios.put(
        `${API}/user/changePassword/${data.idChanger}`,
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  },

  editUser: async (data) => {
    try {
      const res = await axios.put(`${API}/user/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteUser: async (data) => {
    try {
      const res = await axios.delete(
        `${API}/user/${data.idChanger}?userId=${data._id}`
      );
      return res;
    } catch (error) {
      return error;
    }
  },
};
