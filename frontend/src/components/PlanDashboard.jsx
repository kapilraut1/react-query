import { updatePlan, deletePlan, fetchPlans } from "../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import "./PlanDashboard.css";

export default function PlanDashboard() {
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    billingCycle: "",
    
    serviceIds: [],
  });

  const { data: plans = [] } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  const updateMutation = useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      toast.success("Plan updated");
      setEditId(null);
      setForm({ name: "", price: "", billingCycle: "", isActive: true, serviceIds: [] });
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      toast.success("Plan deleted");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  const handleEdit = (plan) => {
    setEditId(plan._id);
    setForm({
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      isActive: plan.isActive,
      serviceIds: plan.serviceIds.map((s) => s._id), // convert populated objects to IDs
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, data: form });
    }
  };

  return (
    <div className="plan-list">
      <h2>📦 Plans</h2>

      {editId && (
        <form onSubmit={handleSubmit} className="edit-form">
          <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input name="price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <select name="billingCycle" value={form.billingCycle} onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <label>
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            Active
          </label>
          <button type="submit">Save</button>
        </form>
      )}

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan._id} className="plan-card">
            <h3>{plan.name}</h3>
            <p>₹{plan.price} • {plan.billingCycle}</p>
            <p>{plan.isActive ? "✅ Active" : "❌ Inactive"}</p>
            <ul>
              {plan.serviceIds.map((s) => (
                <li key={s._id}>{s.title}</li>
              ))}
            </ul>
            <button onClick={() => handleEdit(plan)}>Edit</button>
            <button onClick={() => handleDelete(plan._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
