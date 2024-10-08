import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSavedApi, removeSavedApi } from "../../apis/Apis";
import "../../styles/tailwind.css";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const [save, setSaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = localStorage.getItem("user");
        if (!storedUserData) {
          throw new Error("No user data found in local storage.");
        }
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData._id;

        const res = await getSavedApi(userId);
        setSaves(res.data.save || []); // Ensure save is always an array
      } catch (error) {
        console.error("Error fetching user saves:", error);
        toast.error("Failed to fetch user saves");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRemoveSave = async (id) => {
    try {
      const res = await removeSavedApi(id);
      if (res.data.success === true) {
        toast.success(res.data.message);
        setSaves((prevSaves) => prevSaves.filter((item) => item._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error removing saved item:", error);
      toast.error("Failed to remove saved item");
    }
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
              My Wishlist
            </p>
            {loading ? (
              <div className="my-5 text-center tw-text-pink tw-font-bold font-secondary">
                Loading...
              </div>
            ) : save.length > 0 ? (
              save.map((item) => (
                <div
                  key={item._id}
                  className="card d-flex flex-column px-5 py-3"
                  style={{
                    height: "100%",
                    boxShadow:
                      "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                    borderRadius: "0px",
                    border: "none",
                    marginBottom: "20px",
                  }}
                >
                  <div className="row g-0">
                    <div className="col-md-2">
                      <div
                        style={{
                          backgroundImage: `url(${
                            item.product?.productImageUrl || "placeholder.jpg"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                    <div className="col-md-8">
                      <div
                        className="card-body"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            flex: "start",
                            marginLeft: "10px",
                            marginRight: "10px",
                          }}
                        >
                          <p className="font-primary text-blue tw-text-xl">
                            {item.product?.productName || "N/A"}
                          </p>
                        </div>
                        <div
                          style={{
                            flex: "end",
                          }}
                        >
                          <FaHeart
                            size={20}
                            onClick={() => handleRemoveSave(item._id)}
                            title="Remove from wishlist ?"
                            style={{ cursor: "pointer" }}
                            className="tw-text-pink"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="my-5 text-center tw-text-pink tw-font-bold font-secondary">
                Wishlist is empty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
