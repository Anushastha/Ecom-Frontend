import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleCategoryApi,
  deleteProductApi,
  getProductsWithCategoryIdApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";

const AdminCategoryProduct = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getSingleCategoryApi(id).then((res) => {
      const categoryData = res.data.category;
      setCategoryName(categoryData.categoryName);
    });

    getProductsWithCategoryIdApi(id).then((res) => {
      setProducts(res.data.products || []);
    });
  }, [id]);

  const handleDelete = (productId) => {
    console.log("Product ID to delete:", productId);
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductApi(productId)
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setProducts(
              products.filter((product) => product._id !== productId)
            );
          }
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          toast.error("Internal Server Error!");
        });
    }
  };

  return (
    <div className="tw-container tw-mx-auto tw-py-10">
      <h1 className="font-primary font-bold mb-3" style={{ fontSize: "30px" }}>
        {categoryName}
      </h1>

      <div className="bg-white p-4 shadow">
        <h2
          className="font-primary mb-3"
          style={{
            fontSize: "20px",
          }}
        >
          <span className="text-pink tw-font-bold">{products.length}</span>{" "}
          Products under this category
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className="card px-5 py-3 mb-4"
                style={{
                  width: "80%",
                  boxShadow:
                    "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                  borderRadius: "0px",
                  border: "none",
                }}
                key={product._id}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="product-image"
                    style={{
                      backgroundImage: `url(${
                        product.productImageUrl || "placeholder.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "5px",
                      height: "100px",
                      width: "100px",
                    }}
                    aria-label={product.productName || "Product Image"}
                  ></div>

                  <div
                    style={{
                      flex: 1,
                      marginLeft: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      className="font-primary text-blue"
                      style={{ fontSize: "18px", margin: 0 }}
                    >
                      {product.productName || "N/A"}
                    </p>
                  </div>
                  <button
                    className="btn btn-danger font-primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{ textAlign: "center", width: "100%", padding: "20px" }}
            >
              No products found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryProduct;
