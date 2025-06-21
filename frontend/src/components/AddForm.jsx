import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api";
import { toast } from "react-toastify";

const AddUserForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User added");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setForm({ name: "", email: "", password: "" });
    },
    onError: () => toast.error("Failed to add user"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h3>Add New User</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
