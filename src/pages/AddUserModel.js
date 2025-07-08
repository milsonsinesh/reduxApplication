import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";

export default function AddUserModel({onClose}) {
    const [form, setform] = useState({ name: '', email: '', role: 'Admin', status: 'Active'})
    const dispatch = useDispatch();
    
    const handleSubmit = () => {
        dispatch(addUser(form));
        onClose();
    }

  return (
      <div className="modal">
          <h3>Add Admin</h3>
          <input placeholder="Name" onChange={e => setform({ ...form, name: e.target.value })}></input>
          <input placeholder="Email" onChange={e => setform({ ...form, email: e.target.value })}></input>

          <select onChange={e => setform({ ...form, role: e.target.value })} >
              <option>Admin</option><option>Super Admin</option>
          </select>
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
    </div>
  );
}