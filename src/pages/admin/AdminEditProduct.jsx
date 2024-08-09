import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleProductApi,
  updateProductApi,
  getAllCategoriesApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables to hold form data and initial data retrieval
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState(""); // Single value for category
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      const product = res.data.product;
      setProductName(product.productName);
      setProductPrice(product.productPrice);
      setProductDescription(product.productDescription);
      setProductCategory(product.productCategory); // Assuming productCategory is a single ID
      setOldImage(product.productImageUrl);
    });

    getAllCategoriesApi().then((res) => {
      setCategories(res.data.categories || []);
    });
  }, [id]);

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle category selection radio change
  const handleCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory); // Single category value
    if (productImage) {
      formData.append("productImage", productImage);
    }

    updateProductApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/products");
        }
      })
      .catch((err) => {
        console.error("Update Error:", err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <div
      style={{
        padding: "40px 100px",
      }}
    >
      {" "}
      <div className="row">
        {/* Form Column */}
        <div className="col-md-6 bg-white p-4 shadow">
          <p className="text-center fs-4 font-primary mb-4">
            Editing Product - "<span className="text-black">{productName}</span>
            "
          </p>
          <form onSubmit={handleSubmit}>
            <label className="form-label font-primary">Product Name</label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control mb-2 font-secondary"
              type="text"
              placeholder="Enter product name"
            />

            <label className="form-label font-primary">Product Price</label>
            <input
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="form-control mb-2 font-secondary"
              type="text"
              placeholder="Enter product price"
            />

            <label className="form-label font-primary">
              Product Description
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="form-control mb-2 font-secondary"
              rows="3"
              placeholder="Enter product description"
            />

            {/* Category selection */}
            <label className="form-label mt-3 font-primary">Category</label>
            <div className="form-check font-secondary">
              {categories.map((category) => (
                <div key={category._id}>
                  <input
                    type="radio"
                    id={`category-${category._id}`}
                    value={category._id}
                    checked={productCategory === category._id}
                    onChange={handleCategoryChange}
                    className="form-check-input"
                    name="productCategory"
                  />
                  <label
                    htmlFor={`category-${category._id}`}
                    className="form-check-label"
                  >
                    {category.categoryName}
                  </label>
                </div>
              ))}
            </div>

            <button type="submit" className="font-primary btn btn-pink mt-3">
              Update Product
            </button>
          </form>
        </div>

        {/* Image Column */}
        <div className="col-md-6">
          <div className="bg-white p-4 shadow">
            {/* Image upload section */}
            <label className="form-label font-primary">Product Image</label>
            <input
              onChange={handleImageUpload}
              className="form-control mb-2"
              type="file"
              accept="image/*"
            />
            {/* Display old image */}
            {oldImage && (
              <div className="mt-2 font-primary">
                <p>Old Image:</p>
                <img
                  src={oldImage}
                  alt="Old Product Image"
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
            {/* Display new image preview */}
            {previewImage && (
              <div className="mt-2 font-primary">
                <p>New Image Preview:</p>
                <img
                  src={previewImage}
                  alt="New Product Preview"
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
