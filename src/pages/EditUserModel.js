import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/userSlice";

export default function AddUserModel({user, onClose}) {
    const [form, setform] = useState({ ...user })
    const dispatch = useDispatch();
    
    const handleSubmit = () => {
        dispatch(updateUser(form));
        onClose();
    }

  return (
      <div className="modal">
          <h3>Edit Admin</h3>
          <input value={form.name} onChange={e => setform({...form, name: e.target.value})}></input>
          <input value={form.email} onChange={e => setform({ ...form, email: e.target.value })}></input>
          
          <select value={form.role} onChange={e =>setform({...form, role: e.target.value})} >
              <option>Admin</option><option>Super Admin</option>
          </select>
          <button onClick={handleSubmit}>Update</button>
          <button onClick={onClose}>Cancel</button>
    </div>
  );
}