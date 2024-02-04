import axios from "axios";

axios.defaults.baseURL = "http://10.188.243.19:8000";

export const GetLatestRequest = async (token) => {
  try {
    const response = await axios.get(`/api/teach-request/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const GetTeachRequests = async (token) => {
  try {
    const response = await axios.get(`/api/teach-request`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { filter: { status: "pending" } },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const PostTeachRequest = async (token, payload) => {
  try {
    const response = await axios.post("/api/teach-request", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const AcceptTeachRequest = async (token, id) => {
  try {
    const response = await axios.patch(
      `/api/teach-request/accept/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const DeclineTeachRequest = async (token, id) => {
  try {
    const response = await axios.patch(
      `/api/teach-request/decline/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
