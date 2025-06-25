import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./PlanList.css"; // Optional styling

const fetchPlans = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/plans");
  return res.data;
};

export default function PlanList() {
  const { data: plans = [], isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  if (isLoading) return <p>Loading plans...</p>;
  if (isError) return <p>Error fetching plans.</p>;

  return (
    <div className="plan-list">
      <h2>📦 All Plans</h2>
      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan._id} className={`plan-card ${plan.isActive ? "active" : "inactive"}`}>
            <h3>{plan.name}</h3>
            <p><strong>Price:</strong> ₹{plan.price}</p>
            <p><strong>Billing:</strong> {plan.billingCycle}</p>
            <p><strong>Status:</strong> {plan.isActive ? "✅ Active" : "❌ Inactive"}</p>

            <div className="services">
              <strong>Services:</strong>
              <ul>
                {plan.serviceIds.map((s) => (
                  <li key={s._id}>{s.title}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
