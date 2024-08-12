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

// Product APIs
export const createProductApi = (formData) =>
  Api.post("/api/products/create_product", formData);
export const getAllProductsApi = () => Api.get("/api/products/get_products");
export const getSingleProductApi = (id) =>
  Api.get(`/api/products/get_product/${id}`);
export const deleteProductApi = (id) =>
  Api.delete(`/api/products/delete_product/${id}`);
export const updateProductApi = (id, formData) =>
  Api.put(`/api/products/update_product/${id}`, formData, config);
export const searchProductsApi = (query) =>
  Api.get(`/api/products/search?query=${query}`);

export const getProductsWithCategoryIdApi = (categoryId) =>
  Api.get(`/api/products/getProductsWithCategoryId/${categoryId}`);

//Wishlist APIs
export const addSaveApi = (data) => Api.post("/api/user/add_save", data);
export const getSavedApi = (id) => Api.get(`/api/user/get_saved/${id}`);
export const removeSavedApi = (id) =>
  Api.delete(`/api/user/remove_saved/${id}`, config);

//Category APIs
export const createCategoryApi = (formData) =>
  Api.post("/api/category/create_category", formData);
export const getAllCategoriesApi = () =>
  Api.get("/api/category/get_categories");
export const getSingleCategoryApi = (id) =>
  Api.get(`/api/category/get_category/${id}`);
export const updateCategoryApi = (id, formData) =>
  Api.put(`/api/category/update_category/${id}`, formData, config);
export const deleteCategoryApi = (id) =>
  Api.delete(`/api/category/delete_category/${id}`, config);
export const searchCategoriesApi = (query) =>
  Api.get(`/api/category/search?query=${query}`);

//Cart APIs
export const createCartApi = (data) => Api.post("/api/cart/create_cart", data);
export const getCartApi = (id) => Api.get(`/api/cart/get_cart/${id}`);
export const deleteCartApi = (id) =>
  Api.delete(`/api/cart/remove_cart/${id}`, config);

//Order APIs
export const orderCategory = (data) => Api.post(`/api/order/create`, data);
export const getOrders = () => Api.get(`/api/order/getOrders`, config);
export const getOrdersByuserId = (userId) =>
  Api.get(`/api/order/getOrdersByUser/${userId}`);
export const updateOrdersApi = (orderId, formData) =>
  Api.put(`/api/order/update_order/${orderId}/status`, formData, config);
