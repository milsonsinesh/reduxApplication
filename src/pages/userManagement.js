import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { addUser, updateUser, deleteUser } from '../features/userSlice';
import './UserManagement.css';


function AddUserModal({ onClose, onSubmit, initialData, isEdit }) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(initialData?.status || 'Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && (isEdit || password.length >= 8)) {
      onSubmit({
        ...initialData,
        name,
        email,
        password: password || initialData?.password,
        role: 'Admin',
        status,
      });
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? 'Edit Admin' : 'Add Admin'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Name*</label>
          <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required />
          <label>Email*</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isEdit} />
          <label>{isEdit ? 'New Password*' : 'Password*'}</label>
          <input type="password" placeholder={isEdit ? "Create a new password" : "Create a password"} value={password} onChange={e => setPassword(e.target.value)} required={!isEdit} />
          <div className="modal-hint">Must be at least 8 characters.</div>
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="confirm-btn">{isEdit ? 'Save Changes' : 'Confirm'}</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}


export default function UserManagement() {
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const users = useSelector((state) => state.users.users);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const dispatch = useDispatch();

  if (!loggedIn) return <Navigate to='/' />;

  const handleAddUser = (user) => {
    dispatch(addUser(user));
  };

  const handleEditUser = (user) => {
    dispatch(updateUser(user));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="user-management-container">
      <div className="admin-users-header">
        <h2>Admin Users</h2>
        <button className="add-btn" onClick={() => { setEditUser(null); setShowModal(true); }}>+ Add User</button>
      </div>
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onSubmit={editUser ? handleEditUser : handleAddUser}
          initialData={editUser}
          isEdit={!!editUser}
        />
      )}
      <div className="user-table-controls">
        <input className="search-input" placeholder="Search" />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span className={`badge ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button className="edit-btn" onClick={() => { setEditUser(user); setShowModal(true); }}>✏️</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>{'<'}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <span>...</span>
        <button>40</button>
        <button>{'>'}</button>
      </div>
    </div>
  );
}


