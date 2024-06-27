import React, { useState, useEffect } from 'react';
import { estate_backend } from 'declarations/estate_backend';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const signOut = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };
  function loadUsers() {
    setProcessing(true);
    estate_backend.getAllUsers().then((accounts) => {
      setUsers(accounts);
    }).catch((error) => {
      console.error('Error loading users', error);
    }).finally(() => {
      setProcessing(false);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fullName = event.target.elements.fullName.value;
    const nationalId = event.target.elements.nationalId.value;
    const sex = event.target.elements.sex.value;
    const district = event.target.elements.district.value;
    const password = event.target.elements.password.value;

    setProcessing(true);

    estate_backend.registerUser(fullName, nationalId, sex, district, password).then((message) => {
      setMessage(message);
      loadUsers();
      clearForm();
    }).catch((error) => {
      console.error('Error registering user', error);
      setMessage('Failed to register user.');
    }).finally(() => {
      setProcessing(false);
    });
  }

  function handleRemoveUser(userId) {
    setProcessing(true);

    estate_backend.deleteUser(userId).then(() => {
      loadUsers();
    }).catch((error) => {
      console.error('Error deleting user', error);
      setMessage('Failed to delete user.');
    }).finally(() => {
      setProcessing(false);
    });
  }

  function handleUpdate(event) {
    event.preventDefault();
    const id = editUser.id;
    const fullName = event.target.elements.fullName.value;
    const sex = event.target.elements.sex.value;
    const district = event.target.elements.district.value;
    const password = event.target.elements.password.value;

    setProcessing(true);

    estate_backend.updateUser(id, fullName, sex, district, password).then((message) => {
      setMessage(message);
      loadUsers();
      setEditing(false);
    }).catch((error) => {
      console.error('Error updating user', error);
      setMessage('Failed to update user.');
    }).finally(() => {
      setProcessing(false);
    });
  }

  function handleEdit(user) {
    setEditUser(user);
    setEditing(true);
  }

  function clearForm() {
    document.getElementById("adminForm").reset();
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-between mb-3">
        <div className="col-auto">
          <h2>Admin Panel</h2>
        </div>
        <div className="col-auto">
          <button className="btn btn-danger" onClick={signOut}>Sign Out</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New User</h5>
          <form id="adminForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input id="fullName" className="form-control" type="text" required />
            </div>
            <div className="mb-3">
              <label htmlFor="nationalId" className="form-label">National ID</label>
              <input id="nationalId" className="form-control" type="text" required />
            </div>
            <div className="mb-3">
              <label htmlFor="sex" className="form-label">Sex</label>
              <input id="sex" className="form-control" type="text" required />
            </div>
            <div className="mb-3">
              <label htmlFor="district" className="form-label">District</label>
              <input id="district" className="form-control" type="text" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input id="password" className="form-control" type="password" required />
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
          </form>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <h2>All Users</h2>
          {users.map((user) => (
            <div className="card mb-3" key={user.id}>
              <div className="card-body">
                <h5 className="card-title">{user.fullName}</h5>
                <p className="card-text">National ID: {user.nationalId}</p>
                <p className="card-text">Sex: {user.sex}</p>
                <p className="card-text">District: {user.district}</p>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editing && editUser && (
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Edit User</h5>
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input id="fullName" className="form-control" type="text" defaultValue={editUser.fullName} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sex" className="form-label">Sex</label>
                    <input id="sex" className="form-control" type="text" defaultValue={editUser.sex} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="district" className="form-label">District</label>
                    <input id="district" className="form-control" type="text" defaultValue={editUser.district} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input id="password" className="form-control" type="password" defaultValue={editUser.password} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Update User</button>
                  <button className="btn btn-secondary ms-2" onClick={() => setEditing(false)}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
