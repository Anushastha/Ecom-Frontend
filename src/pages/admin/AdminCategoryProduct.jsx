import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleCategoryApi,
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

  return (
    <div className="tw-container tw-mx-auto tw-py-10">
      <h1 className="font-primary font-bold mb-3" style={{ fontSize: "30px" }}>
        {categoryName}
      </h1>

      <div className="bg-white p-4 shadow">
        <h2 className="font-primary font-bold mb-3">
          {products.length} Products
        </h2>
        <div className="table-responsive overflow-x-auto">
          <table className="table table-bordered">
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td style={{ textAlign: "center" }}>
                      <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        style={{
                          height: "50px",
                          width: "auto",
                          objectFit: "cover",
                          borderRadius: "5px",
                          display: "block",
                          margin: "0 auto",
                          minWidth: "50px",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "20px",
                        width: "max-content",
                        minWidth: "350px",
                        display: "flex",
                      }}
                    >
                      <p
                        className="text-blue font-secondary"
                        style={{ textAlign: "left" }}
                      >
                        {product.productName}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No products found for this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryProduct;
