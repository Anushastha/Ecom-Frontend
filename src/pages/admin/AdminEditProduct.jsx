import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi, updateProductApi } from "../../apis/Apis";
import { toast } from "react-toastify";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables to hold form data and initial data retrieval
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      const product = res.data.product;
      setProductName(product.productName);
      setProductPrice(product.productPrice);
      setProductDescription(product.productDescription);
      setProductCategory(product.productCategory);
      setOldImage(product.productImageUrl);
      setSelectedCategories(product.productCategory);
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

  // Handle category selection checkbox change
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((categoryId) => categoryId !== value)
      );
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    if (productImage) {
      formData.append("productImage", productImage);
    }

    selectedCategories.forEach((categoryId) => {
      formData.append("productCategory[]", categoryId);
    });

    console.log("Form Data:", formData);
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
    <div className="container mt-4">
      <div className="row">
        {/* Form Column */}
        <div className="col-md-6 bg-white p-4 shadow">
          <p className="text-center fs-4 fw-bold mb-4">
            Editing Product - <span className="text-black">{collegeName}</span>
          </p>
          <form onSubmit={handleSubmit}>
            <label className="form-label">Product Name</label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter product name"
            />

            <label className="form-label">Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="form-control mb-2"
              rows="3"
              placeholder="Enter product description"
            />

            {/* Category selection */}
            <label className="form-label mt-3">Category</label>
            <div className="form-check">
              {categories.map((category) => (
                <div key={category._id}>
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    value={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onChange={handleCategoryChange}
                    className="form-check-input"
                  />
                  <label
                    htmlFor={`course-${course._id}`}
                    className="form-check-label"
                  >
                    {category.categoryName}
                  </label>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Update Product
            </button>
          </form>
        </div>

        {/* Image Column */}
        <div className="col-md-6">
          <div className="bg-white p-4 shadow">
            {/* Image upload section */}
            <label className="form-label">Product Image</label>
            <input
              onChange={handleImageUpload}
              className="form-control mb-2"
              type="file"
              accept="image/*"
            />
            {/* Display old image */}
            {oldImage && (
              <div className="mt-2">
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
              <div className="mt-2">
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
