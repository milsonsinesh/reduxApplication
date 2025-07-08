import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserManagement from './pages/userManagement';
import AddUserModel from './pages/AddUserModel';
import EditUserModel from './pages/EditUserModel';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/addUser" element={<AddUserModel />} />
        <Route path="/editUser" element={<EditUserModel />} />
      </Routes>
    </Router>
  );
}

export default App;