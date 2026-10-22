import api from "../api/client";

export const getClients = async () => {
  const response = await api.get("/clients");
  return response.data.data;
};

export const addNewClient = async (client) => {
  const response = await api.post("/clients", client);
  return response.data.data;
};

export const updateClient = async (id, client) => {
  const response = await api.put(`/clients/${id}`, client);
  return response.data.data;
};

export const deleteClient = async (id) => {
  const response = await api.delete(`/clients/${id}`);
  return response.data.data;
};
