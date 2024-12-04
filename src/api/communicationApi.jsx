import axios from "axios";

const API = "https://cloudy-s.vercel.app";

export const communicationApi = {
  getAllCommunication: async () => {
    try {
      const res = await axios.get(`${API}/communication`);
      return res;
    } catch (error) {
      return error;
    }
  },
  createCommunication: async (data) => {
    try {
      const res = await axios.post(`${API}/communication/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
  updateCommunication: async (data) => {
    try {
      const res = await axios.put(
        `${API}/communication/update/${data._id}`,
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  },
  deleteCommunication: async (id) => {
    try {
      const res = await axios.delete(`${API}/communication/delete/${id}`);

      return res;
    } catch (error) {
      return error;
    }
  },
};
