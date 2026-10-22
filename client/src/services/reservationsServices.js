import api from "../api/client";

export const getAllReservations = async () => {
  const response = await api.get("/reservations");
  return response.data.data;
};

export const getReservationById = async (id) => {
  const response = await api.get(`/reservations/${id}`);
  return response.data.data;
};

export const addNewReservation = async (reservation) => {
  console.log("ooooo", reservation);
  const response = await api.post("/reservations", reservation);
  return response.data.data;
};

export const updateReservation = async (id, reservation) => {
  const response = await api.put(`/reservations/${id}`, reservation);
  return response.data.data;
};

export const deleteReservation = async (id) => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data.data;
};

export const verifyReservation = async (reservation_code) => {
  const response = await api.get(`/reservations/verify-reservation/${reservation_code}`);
  return response.data.data;
};