import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfileApi } from "../../apis/Apis";
import "../../styles/tailwind.css";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  // const [previewProfileImage, setPreviewProfileImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not found. Please log in.");
      setLoading(false);
      return;
    }

    const userId = decodeTokenAndGetUserId(token);
    if (!userId) {
      toast.error("Unable to verify your identity. Please log in again.");
      setLoading(false);
      return;
    }

    getUserProfileApi(userId)
      .then((res) => {
        if (res.data.success === true) {
          setUserData(res.data.userProfile);
          console.log("User ID:", res.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching user profile");
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("User ID:", userData?._id);
  }, []);

  const decodeTokenAndGetUserId = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  };

  // const handleProfileImageUpload = (event) => {
  //     const file = event.target.files[0];
  //     setProfileImage(file);
  //     setPreviewProfileImage(URL.createObjectURL(file));
  // };

  return (
    <div
      className="container flex items-center justify-center min-h-screen"
      style={{
        overflow: "hidden",
        width: "max-content",
      }}
    >
      {loading ? (
        <p className="loading-text">Loading user data...</p>
      ) : userData ? (
        <div
          className="tw-bg-white tw-p-8 tw-w-full tw-max-w-4xl tw-mx-4 md:tw-mx-auto tw-relative"
          style={{
            marginTop: "60px",
          }}
        >
          <p className="tw-font-primary tw-text-blue tw-text-center tw-text-3xl tw-mb-5">
            <u>Profile</u>
          </p>

          <div
            id="info"
            className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-20 tw-p-4 tw-mb-8"
          >
            <div
              id="img-container"
              className="tw-flex tw-justify-center tw-items-center tw-mb-4 md:tw-mb-0"
            >
              {userData.profileImage ? (
                <div
                  className="tw-rounded-full"
                  style={{
                    backgroundImage: `url(${userData.profileImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "200px",
                    height: "200px",
                  }}
                  alt="Profile Image"
                />
              ) : (
                <div
                  className="tw-rounded-full tw-font-secondary tw-font-bold tw-bg-black tw-text-white tw-flex tw-items-center tw-justify-center"
                  style={{ width: "200px", height: "200px", fontSize: "100px" }}
                >
                  {userData.fullName
                    ? userData.fullName.charAt(0).toUpperCase()
                    : ""}
                </div>
              )}
            </div>

            <div id="profile-details font-secondary">
              <div className="tw-mb-4">
                <p className="tw-text-blue tw-font-secondary">Full name</p>
                <div className="tw-flex tw-items-center">
                  <input
                    className="tw-border-none tw-p-2 focus:tw-outline-none"
                    style={{
                      backgroundColor: "#F3F4F4",
                      color: "#A8AAAA",
                      border: "none",
                      marginRight: "2px",
                      padding: "3px 10px",
                      width: "250px",
                    }}
                    readOnly
                    value={userData.fullName}
                  />
                  <div
                    className="tw-bg-gray-100"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#F3F4F4",
                      padding: "5px",
                    }}
                  >
                    <FaUser size={20} />
                  </div>
                </div>
              </div>
              <div className="tw-mb-4">
                <p className="tw-text-blue tw-font-secondary">Email address</p>
                <div className="tw-flex tw-items-center">
                  <input
                    className="tw-border-none tw-p-2 focus:tw-outline-none"
                    style={{
                      backgroundColor: "#F3F4F4",
                      color: "#A8AAAA",
                      border: "none",
                      marginRight: "2px",
                      padding: "3px 10px",
                      width: "250px",
                    }}
                    readOnly
                    value={userData.email}
                  />
                  <div
                    className="tw-bg-gray-100"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#F3F4F4",
                      padding: "5px",
                    }}
                  >
                    <FaEnvelope size={20} />
                  </div>
                </div>
              </div>
              <div className="tw-mb-4">
                <p className="tw-text-blue tw-font-secondary">Phone number</p>
                <div className="tw-flex tw-items-center">
                  <input
                    className="tw-border-none tw-p-2 focus:tw-outline-none"
                    style={{
                      backgroundColor: "#F3F4F4",
                      color: "#A8AAAA",
                      border: "none",
                      marginRight: "2px",
                      padding: "3px 10px",
                      width: "250px",
                    }}
                    readOnly
                    value={userData.phoneNumber}
                  />
                  <div
                    className="tw-bg-gray-100"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#F3F4F4",
                      padding: "5px",
                    }}
                  >
                    <FaPhone size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            className="tw-flex tw-justify-center tw-mt-6"
            to={`/user/editProfile/${userData.id}`}
          >
            <button className="btn btn-black font-primary">Edit Profile</button>
          </Link>
        </div>
      ) : (
        <p className="error-text">
          Unable to fetch user data. Please try again later.
        </p>
      )}
    </div>
  );
};

export default UserProfile;
