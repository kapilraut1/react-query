import React from "react";

export default function PlanForm({ form, setForm, handleSubmit, isEdit }) {
  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        placeholder="Plan Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <select
        value={form.billingCycle}
        onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
        />
        Active
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />
      <button type="submit">{isEdit ? "Update Plan" : "Create Plan"}</button>
    </form>
  );
}
