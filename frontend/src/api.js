// src/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/users";
const T_BASE_URL = "http://localhost:3000/api/v1/services";
const P_BASE_URL = "http://localhost:3000/api/v1/plans";
export const fetchUsers = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/${id}`).then((res) => res.data);


export const createUser = (user) =>
  axios.post(BASE_URL, user).then((res) => res.data); 


export const updateUser=(id, user) =>
  axios.patch(`${BASE_URL}/${id}`, user).then((res) => res.data);

//services
export const fetchServices = async () => {
  const res = await axios.get(T_BASE_URL);
  return res.data;
};

export const createService = async (data) => {
  const res = await axios.post(T_BASE_URL, data);
  return res.data;
};

export const updateService = async ({ id, data }) => {
  const res = await axios.patch(`${T_BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await axios.delete(`${T_BASE_URL}/${id}`);
  return res.data;
};

//plans
export const createPlan = async (data) =>
  axios.post(`${P_BASE_URL}`, data).then((res) => res.data);
