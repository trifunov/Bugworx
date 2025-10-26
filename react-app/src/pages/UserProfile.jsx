import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '../utils/localStorage';

const UserProfile = () => {
  const [user, setUserState] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const stored = getCurrentUser();
    if (stored) {
      setUserState({
        name: stored.name || '',
        email: stored.email || '',
        phone: stored.phone || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    // If user is attempting to change password
    const attemptingPasswordChange = currentPassword || newPassword || confirmPassword;
    if (attemptingPasswordChange) {
      if (!currentPassword) {
        setMessage('Please enter your current password to change it.');
        return;
      }
      if (newPassword.length < 6) {
        setMessage('New password must be at least 6 characters.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage('New password and confirmation do not match.');
        return;
      }

      // update password
      const updated = { ...user, password: newPassword };
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('Profile and password updated successfully.');
      setUserState({ name: updated.name, email: updated.email, phone: updated.phone });

      return;
    }

    // No password change requested — just update profile while preserving password
    const updated = { ...user };
    setMessage('Profile updated successfully.');
    setUserState({ name: updated.name, email: updated.email, phone: updated.phone });
    updateCurrentUser(updated);
  };

  return (
    <div className="container">
      <h1>User Profile</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        <hr />

        <h5>Change Password</h5>
        <p className="text-muted">Leave fields blank if you don't want to change your password.</p>

        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfile;