import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../api";
import { toast } from "react-toastify";
import "./ManageServices.css";

export default function ManageServices() {
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    logoUrl: "",
  });

  const { data: services, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      toast.success("Service created");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setForm({ title: "", description: "", price: "", logoUrl: "" });
    },
    onError: () => toast.error("Failed to create"),
  });

  const updateMutation = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      toast.success("Service updated");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setEditId(null);
      setForm({ title: "", description: "", price: "", logoUrl: "" });
    },
    onError: () => toast.error("Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      toast.success("Service deleted");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => toast.error("Failed to delete"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (service) => {
    setEditId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
      logoUrl: service.logoUrl,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this service?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="manage-services">
      <h2>🛠️ Manage Services</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Service Name"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="logoUrl"
          placeholder="Logo URL"
          value={form.logoUrl}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Update" : "Add"} Service</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Price</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan="5">Error loading services</td>
            </tr>
          ) : (
            services?.map((service) => (
              <tr key={service._id}>
                <td>{service.title}</td>
                <td>{service.description}</td>
                <td>₹{service.price}</td>
                <td>
                  <img src={service.logoUrl} alt={service.title} width="50" />
                </td>
                <td>
                  <button onClick={() => handleEdit(service)}>Edit</button>
                  <button onClick={() => handleDelete(service._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
