import axios from "axios";

axios.defaults.baseURL = "http://10.188.243.19:8000";

export const GetCourses = async (token, payload) => {
  try {
    const response = await axios.get(`/api/course`, {
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

export const GetCourseById = async (id, token) => {
  try {
    const response = await axios.get(`/api/course/${id}`, {
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

export const EnrollCourse = async (token, id) => {
  try {
    const response = await axios.post(`/api/course/subscribe/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const createCourse = async (token, formData) => {
  try {
    if (!formData || formData.size === 0) {
      throw "No data provided";
    }
    const response = await axios.post(`/api/course`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.log("Error:", JSON.stringify(error));
  }
};
