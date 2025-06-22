// src/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/users";

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

export const updateService = ({ id, data }) =>
  axios.patch(`${BASE_URL}/services/${id}`, data).then((res) => res.data);

export const deleteService = (id) =>
  axios.delete(`${BASE_URL}/services/${id}`).then((res) => res.data);
