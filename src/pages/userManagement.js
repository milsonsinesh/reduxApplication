import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, toggleUserStatus } from '../features/userSlice';

export default function UserManagement() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Admin Users</h3>
      <button>Add User</button>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
              <td><button onClick={() => dispatch(toggleUserStatus(user.id))}>{user.status}</button></td>
              <td>
                <button>Edit</button>
                <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}