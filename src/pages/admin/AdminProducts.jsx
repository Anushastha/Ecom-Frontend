import React, { useState, useEffect } from "react";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  getAllCategoriesApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllProductsApi().then((res) => {
      console.log("Products API response:", res.data.products);
      setProducts(res.data.products);
    });

    getAllCategoriesApi().then((res) => {
      setCategories(res.data.categories || []);
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProductCategory([...productCategory, value]);
    } else {
      setProductCategory(
        productCategory.filter((categoryId) => categoryId !== value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    productCategory.forEach((category) => {
      formData.append("productCategory[]", category);
    });
    formData.append("productImage", productImage);

    createProductApi(formData)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setProducts([...products, res.data.product]);
          setProductName("");
          setProductPrice("");
          setProductDescription("");
          setProductCategory([]);
          setProductImage(null);
          setPreviewImage(null);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    console.log("Product ID to delete:", id); // Verify the ID being passed
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductApi(id)
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setProducts(products.filter((product) => product._id !== id));
          }
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          toast.error("Internal Server Error!");
        });
    }
  };

  return (
    <div
      style={{
        padding: "40px 100px",
      }}
    >
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <p className="font-primary font-bold" style={{ fontSize: "30px" }}>
          All Products
        </p>
        <button
          className="btn-black px-4 py-2 me-1 font-primary"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          style={{ borderRadius: "8px" }}
        >
          Add Product
        </button>
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-black text-white">
                <h1 className="modal-title fs-5" id="productModalLabel">
                  Add a new product
                </h1>
              </div>
              <div className="modal-body">
                <label className="mb-2 font-primary">Product Name</label>
                <input
                  onChange={(e) => setProductName(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Enter product name"
                />
                <label className="mb-2 font-primary">Product Description</label>
                <textarea
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Enter product description"
                  cols="4"
                  rows="4"
                ></textarea>

                <label className="mb-2 font-primary">
                  Add or select categories
                </label>
                <div className="mb-2">
                  {categories.map((category) => (
                    <div key={category._id}>
                      <input
                        type="checkbox"
                        id={category._id}
                        value={category._id}
                        onChange={handleCategoryChange}
                        checked={productCategory.includes(category._id)}
                      />
                      <label htmlFor={category._id} className="ms-2">
                        {category.categoryName}
                      </label>
                    </div>
                  ))}
                </div>
                <label className="mb-2 font-primary">
                  Upload Product Image
                </label>
                <input
                  onChange={handleImageUpload}
                  className="form-control mb-2"
                  type="file"
                />
                {previewImage && (
                  <div>
                    <img
                      src={previewImage}
                      alt="Product Preview Image"
                      className="img-thumbnail mb-2"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-black"
                  onClick={handleSubmit}
                >
                  Add product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center font-primary">
              <tr>
                <th scope="col">Product Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.productImage}</td>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.productCategory}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Link
                          to={`/admin/products/editProduct/${product.id}`}
                          type="button"
                          className="btn btn-pink"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
