import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
//configuration for axios

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//Auth APIs
export const loginApi = (data) => Api.post("/api/user/login", data);
export const registerApi = (data) => Api.post("/api/user/create", data);
export const sendEmailApi = (data) =>
    Api.post("/api/user/reset_password", data);
  export const verifyCodeApi = (data) =>
    Api.post("/api/user/reset_code", data, config);
  export const updatePasswordApi = (data) =>
    Api.post("/api/user/update_password", data);
  
  export const changePassword = async (data, token) => {
    try {
      const response = await Api.post("/api/user/change_password", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const getUserProfileApi = () => {
    return Api.get("/api/user/get_profile", config);
  };
  export const updateUserProfileApi = (userId, formData) =>
    Api.put(`/api/user/update_profile/${userId}`, formData, config);
  