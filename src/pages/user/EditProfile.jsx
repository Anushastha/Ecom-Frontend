import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfileApi, updateUserProfileApi } from "../../apis/Apis";
import { jwtDecode } from "jwt-decode";
import "../../styles/tailwind.css";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found. Please log in.");
        }

        const decodedUserId = decodeTokenAndGetUserId(token);
        if (!decodedUserId) {
          throw new Error(
            "Unable to verify your identity. Please log in again."
          );
        }

        if (id !== decodedUserId) {
          throw new Error("You are not authorized to edit this profile.");
        }

        const response = await getUserProfileApi(id);
        if (response.data.success) {
          setUserData(response.data.userProfile);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const decodeTokenAndGetUserId = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", userData.fullName);
      formData.append("email", userData.email);
      formData.append("phoneNumber", userData.phoneNumber);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await updateUserProfileApi(id, formData);
      if (response.data.success) {
        toast.success("Profile updated successfully");
        setUserData({
          ...userData,
          profileImage: response.data.userProfile.profileImage,
        });

        // Store the updated profile image URL in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            profileImage: response.data.userProfile.profileImage,
          })
        );
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating user profile");
    }
  };

  if (loading) {
    return <p className="loading-text">Loading user data...</p>;
  }

  if (!userData) {
    return (
      <p className="error-text">
        Unable to fetch user data. Please try again later.
      </p>
    );
  }

  return (
    <div
      className="container flex items-center justify-center min-h-screen"
      style={{
        overflow: "hidden",
        width: "max-content",
      }}
    >
      <div
        className="tw-bg-white tw-p-8 tw-max-w-4xl tw-mx-4 md:tw-mx-auto tw-relative"
        style={{
          marginTop: "60px",
        }}
      >
        <p className="tw-font-primary tw-text-blue tw-text-center tw-text-3xl tw-mb-5">
          <u>Profile</u>
        </p>
        <div
          id="info"
          className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-20 tw-p-4 tw-mb-4"
        >
          <div
            id="img-container"
            className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-4 md:tw-mb-0"
          >
            {previewImage ? (
              <div
                className="profile-image-preview tw-rounded-full"
                style={{
                  backgroundImage: `url(${previewImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "200px",
                  height: "200px",
                }}
                alt="Profile Preview"
              />
            ) : userData.profileImage ? (
              <div
                className="tw-rounded-full"
                style={{
                  backgroundImage: `url(${userData.profileImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "200px",
                  height: "200px",
                }}
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
            <label
              htmlFor="file-upload"
              className="btn btn-outline-black btn-sm tw-mt-4 font-primary"
            >
              <span>Update Image</span>
              <input
                id="file-upload"
                type="file"
                className="tw-hidden"
                onChange={handleProfileImageUpload}
              />
            </label>
          </div>

          <div id="profile-details">
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
                  value={userData.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                />
                <div
                  className="bg-gray-100"
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
                  type="email"
                  className="tw-border-none tw-p-2 focus:tw-outline-none"
                  style={{
                    backgroundColor: "#F3F4F4",
                    color: "#A8AAAA",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <div
                  className="bg-gray-100"
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
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
                />
                <div
                  className="bg-gray-100"
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn btn-black font-primary"
            onClick={handleSaveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
