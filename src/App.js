import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserManagement from './pages/userManagement';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userManagement" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;