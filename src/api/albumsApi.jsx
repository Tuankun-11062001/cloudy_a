import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const albumsApi = {
  getAllAlbums: async () => {
    try {
      const res = await axios.get(`${API}/lyrics/album`);
      return res;
    } catch (error) {
      return error;
    }
  },

  createAlbum: async (data) => {
    try {
      const res = await axios.post(`${API}/lyrics/album/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteAlbum: async (data) => {
    try {
      const res = await axios.delete(`${API}/lyrics/album/${data._id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
