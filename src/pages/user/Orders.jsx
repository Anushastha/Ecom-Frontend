import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrdersByUserIdApi } from "../../apis/Apis";

const OrdersPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        getOrdersByUserIdApi(user._id).then((response) => {
          if (response.data.success) {
            setOrders(response.data.orders);
          } else {
            toast.error("Failed to fetch orders");
          }
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders");
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="container mt-5 bg-white tw-rounded-2xl"
          style={{
            height: "max-content",
            padding: "30px 40px 30px 40px",
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
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product Details</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) =>
                  order.items.map((item, index) => (
                    <tr key={item._id}>
                      {index === 0 && (
                        <td rowSpan={order?.items.length}>{order?.orderId}</td>
                      )}
                      <td>
                        Product Name: {item?.productId?.productName}
                        <br />
                        Price: Rs.{item?.productId?.productPrice}
                        <br />
                        Description: {item?.productId?.productDescription}
                        <br />
                        Category:{" "}
                        {item?.productId?.productCategory?.categoryName}
                        <br />
                      </td>
                      <td>{item.quantity}</td>
                      {index === 0 && (
                        <td rowSpan={order?.items.length}>{order?.status}</td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
