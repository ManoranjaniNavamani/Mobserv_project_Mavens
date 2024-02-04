import axios from "axios";

axios.defaults.baseURL = "http://10.188.243.19:8000";

export const userLogin = async (payload) => {
  try {
    const response = await axios.post(`/api/user/login`, payload);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
export const userSignUp = async (payload) => {
  try {
    const response = await axios.post("/api/user/register", payload);

    if (response.status == 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
export const forgotpassword = async (payload) => {
  try {
    const response = await axios.post(`/api/user/forgot-password`, payload);

    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
export const resetpassword = async (payload) => {
  try {
    const response = await axios.post(`/api/user/reset-password`, payload);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
export const getUsers = async (token, searchText) => {
  try {
    const response = await axios.get(`/api/user`, {
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
export const statusUpdater = async (token) => {
  try {
    await axios.post(`/api/user/online`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (token, id) => {
  try {
    const response = await axios.get(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      return response.data.data;
    }
  } catch (error) {
    throw error;
  }
};
