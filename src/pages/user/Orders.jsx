import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrdersByUserIdApi } from "../../apis/Apis";
import { FaClock } from "react-icons/fa";

const OrdersPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersByUserIdApi(user._id);
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders");
      }
    };

    fetchOrders();
  }, [userId]);

  const calculateTotalCost = (items) => {
    return items.reduce((total, item) => {
      if (item.productId) {
        return total + item.productId.productPrice * item.quantity;
      }
      return total; // If productId is null, skip adding to total
    }, 0);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="container mt-5 bg-white tw-rounded-2xl"
          style={{
            height: "max-content",
            padding: "30px 20px",
            marginBottom: "100px",
            maxWidth: "90%",
            minHeight: "400px",
          }}
        >
          <div className="container">
            <p
              className="mb-3 font-primary"
              style={{
                fontSize: "30px",
              }}
            >
              My Orders
            </p>
            <table className="table table-bordered table-responsive">
              <thead
                className="font-primary"
                style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
              >
                <tr>
                  <th>Order ID</th>
                  <th>Product Image</th>
                  <th>Product Details</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Total Cost</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                </tr>
              </thead>
              <tbody className="font-secondary">
                {orders.map((order) => {
                  const totalCost = calculateTotalCost(order.items);
                  return (
                    <React.Fragment key={order._id}>
                      {order.items.map((item, index) => (
                        <tr
                          key={item._id}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#ffffff" : "#f2f2f2",
                          }}
                        >
                          {index === 0 && (
                            <td
                              rowSpan={order.items.length}
                              style={{ verticalAlign: "middle" }}
                            >
                              {order?.orderId}
                            </td>
                          )}
                          <td>
                            {item.productId ? (
                              <div
                                style={{
                                  width: "100px",
                                  height: "80px",
                                  backgroundImage: `url(${item.productId?.productImageUrl})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  borderRadius: "4px",
                                  border: "1px solid #dee2e6",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                                title={item.productId?.productName}
                              ></div>
                            ) : (
                              <div
                                style={{
                                  width: "100px",
                                  height: "80px",
                                  backgroundColor: "#e0e0e0",
                                }}
                              >
                                Product Image Not Available
                              </div>
                            )}
                          </td>
                          <td>
                            {item.productId ? (
                              <div>
                                <strong>Product Name:</strong>{" "}
                                {item?.productId?.productName}
                                <br />
                                <strong>Description:</strong>{" "}
                                {item?.productId?.productDescription}
                              </div>
                            ) : (
                              <div>
                                <strong>Product Unavailable</strong>
                              </div>
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.quantity}
                          </td>
                          {index === 0 && (
                            <td
                              rowSpan={order.items.length}
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              {`Rs.${totalCost}`}
                            </td>
                          )}
                          {index === 0 && (
                            <td
                              rowSpan={order.items.length}
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                              }}
                            >
                              <span
                                className="badge rounded-pill bg-warning text-white"
                                style={{ display: "flex", gap: "5px" }}
                              >
                                <FaClock />
                                {order?.status}
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
