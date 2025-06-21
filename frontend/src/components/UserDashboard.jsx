// src/components/UserDashboard.jsx
import React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser, updateUser } from "../api";
import { toast } from "react-toastify";
import "./UserDashboard.css"; // We'll create this next

export default function UserDashboard() {
  const [editId, setEditId] = useState(null);
const [editData, setEditData] = useState({ name: "", email: "" });
const[searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted");
    },
    onError: () => toast.error("Failed to delete user"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

 const handleEdit = (user) => {
  setEditId(user._id);
  setEditData({ name: user.name, email: user.email });
};

const handleCancel = () => {
  setEditId(null);
  setEditData({ name: "", email: "" });
};
const handleSave = (id) => {
  if (!editData.name || !editData.email) {
    toast.error("Please fill all fields");
    return;
  }
  updateMutation.mutate({ id, data: editData });
  setEditId(null);
};


  //update mutation
  const updateMutation = useMutation({
   mutationFn: (data) => updateUser(editId, data),
   onsuccess: () => {
     queryClient.invalidateQueries({ queryKey: ["users"] });
     toast.success("User updated");
     setEditId(null);
     setEditData({ name: "", email: "" });
   }
  })

  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  return (
    <div className="dashboard-container">
      <h2>👤 User Dashboard</h2>
      <input
        type="text" 
         placeholder="🔍 Search users..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
       <tbody>
  {filteredUsers?.map((user) => (
    <tr key={user._id}>
      {editId === user._id ? (
        <>
          <td>
            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
          </td>
          <td className="actions-column">
<button onClick={() => {
  console.log("Saving user with ID:", user._id, "and data:", editData);
  handleSave(user._id);
}}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="actions-column">
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete ❌</button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
