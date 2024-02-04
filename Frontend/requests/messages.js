import axios from "axios";

axios.defaults.baseURL = "http://10.188.243.19:8000";

export const getMessages = async (token, users) => {
  try {
    const response = await axios.get(
      `/api/message/chat?users=${users[0]}&users=${users[1]}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      return response.data.data;
    }
    if (response.status === 404) {
      return response.data.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (token, payload) => {
  try {
    const response = await axios.post(`/api/message`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
