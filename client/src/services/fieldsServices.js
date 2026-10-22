import api from "../api/client";

export const getFields = async () => {
  const response = await api.get("/fields");
  return response.data.data;
};

export const getFieldById = async (id) => {
  const response = await api.get(`/fields/${id}`);
  return response.data.data;
};

export const addNewField = async (field) => {
  const response = await api.post("/fields", field);
  return response.data.data;
};

export const updateField = async (id, field) => {
  const response = await api.put(`/fields/${id}`, field);
  return response.data.data;
};

export const deleteField = async (id) => {
  const response = await api.delete(`/fields/${id}`);
  return response.data.data;
};
