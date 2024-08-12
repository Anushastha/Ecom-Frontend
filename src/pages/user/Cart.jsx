import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import {
  deleteCartApi,
  getCartApi,
  getSingleCategoryApi,
  updateCartItemQuantityApi,
  createOrderApi,
  clearCartApi,
} from "../../apis/Apis";
import "../../styles/tailwind.css";

const Cart = ({}) => {
  const [carts, setCart] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = localStorage.getItem("user");
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData._id;

        const cartRes = await getCartApi(userId);
        const cartItems = cartRes.data.cart;
        setCart(cartItems);
        calculateSubtotal(cartItems);

        const categoryPromises = cartItems.map((item) =>
          getSingleCategoryApi(item.product.productCategory).then((res) => ({
            productId: item.product._id,
            categoryName: res.data.category.categoryName,
          }))
        );

        const categoryResponses = await Promise.all(categoryPromises);
        const categoryMap = categoryResponses.reduce(
          (acc, { productId, categoryName }) => {
            acc[productId] = categoryName;
            return acc;
          },
          {}
        );

        setCategoryMap(categoryMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch cart data");
      }
    };

    fetchData();
  }, []);

  const calculateSubtotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += (item.product?.productPrice || 0) * (item.quantity || 0);
    });
    setSubtotal(total);
  };

  const handleDeleteCart = async (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to remove the item from the cart?"
    );
    if (!confirmDialog) {
      return;
    }
    try {
      const res = await deleteCartApi(id);
      if (res.data.success === true) {
        toast.success(res.data.message);
        const updatedCart = carts.filter((item) => item._id !== id);
        setCart(updatedCart);
        calculateSubtotal(updatedCart);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to delete cart item");
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const res = await updateCartItemQuantityApi(itemId, { newQuantity });
      if (res.data.success) {
        toast.success("Quantity updated successfully");
        const updatedCart = carts.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
        calculateSubtotal(updatedCart);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      toast.error("Failed to update cart item quantity");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const storedUserData = localStorage.getItem("user");
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const orderData = {
        userId,
        cartItems: carts.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        subtotal,
        shipping: 100,
        total: subtotal + 100,
      };

      const res = await createOrderApi(orderData);
      console.log("API response:", res.data);

      if (res.data.success) {
        // Clear the cart after placing the order
        await clearCartApi({ userId });

        toast.success("Order placed successfully!");
        setCart([]); // Clear cart state
        setSubtotal(0); // Reset subtotal
      } else {
        toast.error(`Failed to place order: ${res.data.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="container mt-5 bg-white tw-rounded-2xl"
          style={{
            height: "max-content",
            padding: "30px 40px",
            marginBottom: "100px",
            maxWidth: "90%",
            minHeight: "400px",
          }}
        >
          <div className="container">
            <p
              className="mb-3 font-primary text-blue"
              style={{
                fontSize: "30px",
              }}
            >
              My Cart
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "50px",
              }}
            >
              {carts.length > 0 ? (
                carts.map((item) => (
                  <div
                    key={item._id}
                    className="card d-flex flex-row px-4 py-4"
                    style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                      borderRadius: "8px",
                      border: "none",
                      marginBottom: "15px",
                      height: "130px",
                      width: "500px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="col-md-3" style={{ flexShrink: 0 }}>
                      <div
                        style={{
                          backgroundImage: `url(${
                            item.product?.productImageUrl || "placeholder.jpg"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                          height: "80px",
                        }}
                      ></div>
                    </div>
                    <div
                      className="col-md-8"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 10px",
                      }}
                    >
                      <div
                        className="card-body"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                          minHeight: "max-content",
                        }}
                      >
                        <div>
                          <p className="font-primary tw-text-lg">
                            {item.product?.productName || "N/A"}
                          </p>
                          <p className="font-secondary tw-text-gray-600 tw-text-sm">
                            Category: {categoryMap[item.product._id] || "N/A"}
                          </p>
                          <p className="font-secondary tw-text-pink tw-font-bold mb-2 tw-text-sm">
                            Rs. {item.product?.productPrice || "N/A"}
                          </p>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-outline-secondary btn-sm me-2"
                              onClick={() =>
                                item.quantity > 1 &&
                                handleUpdateQuantity(
                                  item._id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <FaMinus />
                            </button>
                            <input
                              type="number"
                              value={item.quantity || 1}
                              min="1"
                              className="form-control me-2 text-center"
                              style={{ width: "50px" }}
                              onChange={(e) =>
                                handleUpdateQuantity(
                                  item._id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-1"
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaTrash
                        onClick={() => handleDeleteCart(item._id)}
                        title="Remove from cart?"
                        style={{ cursor: "pointer" }}
                        className="tw-text-red-500"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="my-5 text-center tw-text-pink tw-font-bold font-secondary">
                  Cart is empty
                </div>
              )}

              {carts.length > 0 && (
                <div>
                  <p className="mb-2 font-primary tw-text-pink tw-text-xl">
                    Order Summary
                  </p>

                  {/* Cart Items Table */}
                  <table className="table table-bordered table-responsive mb-2 font-secondary text-center">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={
                                item.product?.productImageUrl ||
                                "placeholder.jpg"
                              }
                              alt={item.product?.productName || "Product"}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{item.product?.productName || "N/A"}</td>
                          <td>{item.quantity || 1}</td>
                          <td>Rs. {item.product?.productPrice || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Cart Summary Table */}
                  <table className="table table-bordered table-responsive font-secondary">
                    <tbody>
                      <tr>
                        <th>Subtotal:</th>
                        <td>Rs. {subtotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping:</th>
                        <td>Rs. 100</td>
                      </tr>
                      <tr>
                        <th>Total:</th>
                        <td>Rs. {subtotal + 100}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-center mt-4">
                    <button
                      onClick={handlePlaceOrder}
                      className="btn btn-sm btn-black font-primary"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
