// src/components/UserDashboard.jsx
import React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser, updateUser, createUser } from "../api";
import { toast } from "react-toastify";


export default function UserDashboard() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editId, setEditId] = useState(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created");
      setForm({ name: "", email: "", password: "" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated");
      setEditId(null);
      setForm({ name: "", email: "", password: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({ name: user.name, email: user.email, password: user.password });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul className="user-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users?.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}