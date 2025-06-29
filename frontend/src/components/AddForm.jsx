import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {useCreatePlan} from "../hooks/usePlan";
import PlanForm from "./Planform";

const AddUserForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
 const queryClient = useQueryClient();
  const mutation = useCreatePlan(queryClient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
   <PlanForm  form={form} setForm={setForm} handleSubmit={handleSubmit} isEdit={handleChange}   />
  );
};

export default AddUserForm;
