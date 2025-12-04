import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    // Hardcoded user ID for now
    const userId = 1;
    axios
      .get(`/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

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
    // Hardcoded user ID
    const userId = 1;
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
            src={user.image ? `http://localhost:5000/${user.image}` : "https://i.pravatar.cc/150"}
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
