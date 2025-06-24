import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchServices, createPlan } from "../api";
import { toast } from "react-toastify";
import "./AddPlan.css";

export default function AddPlan() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    price: "",
    billingCycle: "",
    isActive: true,
    serviceIds: [],
  });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const mutation = useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      toast.success("Plan created successfully!");
      setForm({ name: "", price: "", billingCycle: "", isActive: true, serviceIds: [] });
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: () => toast.error("Failed to create plan"),
  });

  const handleCheckboxChange = (id) => {
    setForm((prevForm) => {
      const isSelected = prevForm.serviceIds.includes(id);
      return {
        ...prevForm,
        serviceIds: isSelected
          ? prevForm.serviceIds.filter((sid) => sid !== id)
          : [...prevForm.serviceIds, id],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="plan-container">
      <h2>📦 Add New Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plan Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <select name="billingCycle" value={form.billingCycle} onChange={handleChange} required>
          <option value="">Select Billing Cycle</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <div className="services-section">
          <h4>Select Services:</h4>
          {isLoading ? (
            <p>Loading services...</p>
          ) : (
            services.map((service) => (
              <label key={service._id}>
                <input
                  type="checkbox"
                  checked={form.serviceIds.includes(service._id)}
                  onChange={() => handleCheckboxChange(service._id)}
                />
                {service.title}
              </label>
            ))
          )}
        </div>

        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
}
