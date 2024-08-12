import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import {
  getAllProductsApi,
  getAllCategoriesApi,
  getProductsWithCategoryIdApi,
} from "../../apis/Apis";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState(""); // State for storing the search query

  useEffect(() => {
    // Fetch all products
    getAllProductsApi()
      .then((res) => {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products); // Initially show all products
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });

    // Fetch all categories
    getAllCategoriesApi()
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // Handle category selection change
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    if (selected === "all") {
      setFilteredProducts(
        products.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ); // Show all products if "All" is selected
    } else {
      getProductsWithCategoryIdApi(selected)
        .then((res) => {
          setFilteredProducts(
            res.data.products.filter((product) =>
              product.productName
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ) || []
          );
        })
        .catch((err) => {
          console.error("Error fetching products by category:", err);
          setFilteredProducts([]); // Reset filtered products on error
        });
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setFilteredProducts(
      products.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) &&
          (selectedCategory === "all" ||
            product.categoryId === selectedCategory)
      )
    );
  };

  return (
    <div className="tw-pt-14">
      {/* Search Bar */}
      <div className="tw-mb-6 tw-flex tw-justify-center">
        <form className="tw-flex tw-gap-2 tw-items-center tw-w-full tw-max-w-md tw-justify-center">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="font-secondary tw-bg-white tw-border tw-border-white tw-rounded-full tw-px-4 tw-py-2 tw-w-full tw-focus:tw-border-none tw-transition tw-duration-300"
          />
          <button
            type="submit"
            className="tw-bg-pink-600 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-hover:tw-bg-pink-700 tw-transition tw-duration-300"
          >
            <FiSearch className="tw-text-2xl" />
          </button>
        </form>
      </div>

      <div className="tw-container tw-px-10 tw-mb-20 tw-flex tw-flex-col tw-gap-8">
        {/* Main Content */}
        <div className="tw-container tw-flex tw-gap-8">
          {/* Category Filter */}
          <div className="tw-w-1/4">
            <div className="tw-bg-white tw-p-4 tw-shadow-lg tw-rounded-lg">
              <p className="tw-mb-4 font-secondary tw-font-bold">
                Filter by Category
              </p>

              <div className="tw-mb-2">
                <label className="tw-inline-flex tw-items-center">
                  <input
                    type="radio"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={handleCategoryChange}
                    className="tw-form-radio tw-text-pink-600"
                  />
                  <span className="tw-ml-2 font-secondary">All</span>
                </label>
              </div>
              {categories.map((category) => (
                <div key={category._id} className="tw-mb-2">
                  <label className="tw-inline-flex tw-items-center">
                    <input
                      type="radio"
                      value={category._id}
                      checked={selectedCategory === category._id}
                      onChange={handleCategoryChange}
                      className="tw-form-radio tw-text-pink-600"
                    />
                    <span className="tw-ml-2 font-secondary">
                      {category.categoryName}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Product List */}
          <div className="tw-w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/user/dashboard/productDetails/${product.id}`}
                    className="card-link"
                  >
                    <div
                      key={product._id}
                      className="tw-bg-white tw-p-4 tw-shadow-lg tw-rounded-lg tw-flex tw-flex-col tw-h-full"
                    >
                      <div
                        className="tw-w-full tw-h-40 tw-rounded-md"
                        style={{
                          backgroundImage: `url(${
                            product.productImageUrl || "placeholder.jpg"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        aria-label={product.productName || "Product Image"}
                      ></div>
                      <h3 className="tw-text-lg tw-mt-4 tw-mb-2 font-primary">
                        {product.productName}
                      </h3>
                      <div className="tw-flex-grow"></div>{" "}
                      {/* Pushes the price to the bottom */}
                      <p className="tw-text-pink tw-font-bold font-secondary tw-mt-auto">
                        Rs. {product.productPrice}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center font-secondary tw-font-bold">
                No products found for this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
