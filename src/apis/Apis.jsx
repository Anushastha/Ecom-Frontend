import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
//configuration for axios

// const config = {
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// };

// Request interceptor to add the token to every request
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Auth APIs
export const loginApi = (data) => Api.post("/api/user/login", data);
export const registerApi = (data) => Api.post("/api/user/create", data);
export const sendEmailApi = (data) =>
  Api.post("/api/user/reset_password", data);
export const verifyCodeApi = (data) => Api.post("/api/user/reset_code", data);
export const updatePasswordApi = (data) =>
  Api.post("/api/user/update_password", data);
export const expiredPasswordChangeApi = (data) =>
  Api.post("/api/user/expired_password_change", data);
export const verifyEmailCodeApi = (data) =>
  Api.post("/api/user/email_code", data);

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
  return Api.get("/api/user/get_profile");
};
export const updateUserProfileApi = (userId, formData) =>
  Api.put(`/api/user/update_profile/${userId}`, formData);

// Product APIs
export const createProductApi = (formData) =>
  Api.post("/api/products/create_product", formData);
export const getAllProductsApi = () => Api.get("/api/products/get_products");
export const getSingleProductApi = (id) =>
  Api.get(`/api/products/get_product/${id}`);
export const deleteProductApi = (id) =>
  Api.delete(`/api/products/delete_product/${id}`);
export const updateProductApi = (id, formData) =>
  Api.put(`/api/products/update_product/${id}`, formData);
export const searchProductsApi = (query) =>
  Api.get(`/api/products/search?query=${query}`);

export const getProductsWithCategoryIdApi = (categoryId) =>
  Api.get(`/api/products/getProductsWithCategoryId/${categoryId}`);

//Wishlist APIs
export const addSaveApi = (data) => Api.post("/api/user/add_save", data);
export const getSavedApi = (id) => Api.get(`/api/user/get_saved/${id}`);
export const removeSavedApi = (id) =>
  Api.delete(`/api/user/remove_saved/${id}`);

//Category APIs
export const createCategoryApi = (formData) =>
  Api.post("/api/category/create_category", formData);
export const getAllCategoriesApi = () =>
  Api.get("/api/category/get_categories");
export const getSingleCategoryApi = (id) =>
  Api.get(`/api/category/get_category/${id}`);
export const updateCategoryApi = (id, formData) =>
  Api.put(`/api/category/update_category/${id}`, formData);
export const deleteCategoryApi = (id) =>
  Api.delete(`/api/category/delete_category/${id}`);
export const searchCategoriesApi = (query) =>
  Api.get(`/api/category/search?query=${query}`);

//Cart APIs
export const createCartApi = (data) => Api.post("/api/cart/create_cart", data);
export const getCartApi = (id) => Api.get(`/api/cart/get_cart/${id}`);
export const deleteCartApi = (id) => Api.delete(`/api/cart/remove_cart/${id}`);
export const updateCartItemQuantityApi = (itemId, data) =>
  Api.put(`/api/cart/update_cart/${itemId}`, data);
export const clearCartApi = (data) => Api.post("/api/cart/clear", data);

// Order APIs
export const createOrderApi = (orderData) =>
  Api.post("/api/orders/create", orderData);
export const updateOrderStatusApi = (orderId, status) =>
  Api.put(`/api/orders/update_order/${orderId}/status`, { status });
export const getOrdersByUserIdApi = (userId) =>
  Api.get(`/api/orders/getOrdersByUser/${userId}`);

//Logs APIs
export const getLogsApi = () => Api.get("/api/logs/logs");
