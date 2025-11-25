import React, { useState } from "react";
import "../css/Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "User",
    email: "user@example.com",
    phone: "+91 9876543210",
    image: "https://i.pravatar.cc/150"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, image: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-card">
        <div className="profile-image-wrapper">
          <img src={user.image} alt="User" className="profile-image" />
          {isEditing && (
            <input type="file" onChange={handleImageChange} />
          )}
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
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button className="save-btn" onClick={() => setIsEditing(false)}>
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
