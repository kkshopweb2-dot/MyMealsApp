import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/authSlice";
import { imageBaseURL } from '../api/baseURL';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState(currentUser);
  const [newImage, setNewImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setUser({ ...user, image: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    if (!user) return;
    const userId = user.id;
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    if (newImage) {
      formData.append("image", newImage);
    }

    axios
      .put(`/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(updateUser(response.data));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-image-wrapper">
          <img
            src={user.image ? (user.image.startsWith('blob:') ? user.image : `${imageBaseURL}${user.image}`) : "https://i.pravatar.cc/150"}
            alt="User"
            className="profile-image"
          />
          {isEditing && <input type="file" onChange={handleImageChange} />}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>
              Save Profile
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
