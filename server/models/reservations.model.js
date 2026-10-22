const supabase = require("../config/db_connection");

// Recupera tutte le prenotazioni
const getAllReservations = async () => {
  const { data, error } = await supabase.from("ECS_Reservations").select("*");

  if (error) {
    throw new Error("DATABASE_GET_RESERVATIONS_ERROR");
  }

  return data;
};

// Trova prenotazione per id
const getReservationById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Reservations")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // .single genera un errore se non trova righe!

  if (error) {
    throw new Error("DATABASE_GET_RESERVATION_BY_ID_ERROR");
  }

  return data; // se non trovato = null
};

// Aggiungi un nuovo prenotazione
const addNewReservation = async (
  date,
  start_hour,
  end_hour,
  status,
  reservation_code,
  client_id,
  field_id,
) => {
  const { data, error } = await supabase
    .from("ECS_Reservations")
    .insert([
      {
        date,
        start_hour,
        end_hour,
        status,
        reservation_code,
        client_id,
        field_id,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_ADD_NEW_RESERVATION_ERROR");
  }

  return data;
};

// Modifica un prenotazione
const updateReservationById = async (
  id,
  date,
  start_hour,
  end_hour,
  status,
  reservation_code,
  client_id,
  field_id,
) => {
  const { data, error } = await supabase
    .from("ECS_Reservations")
    .update({
      date,
      start_hour,
      end_hour,
      status,
      reservation_code,
      client_id,
      field_id,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_UPDATE_RESERVATION_ERROR");
  }

  return data;
};

// Elimina un prenotazione
const deleteReservationById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Reservations")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_DELETE_RESERVATION_ERROR");
  }

  return data;
};

// Recupero dei dati di una prenotazione tramite id
// per utenti (senza autenticazione)
const getReservationForUsers = async (reservation_code) => {
  const { data, error } = await supabase
    .from("ECS_Reservations")
    .select("*, ECS_Clients(name, surname), ECS_Fields(name)")
    .eq("reservation_code", reservation_code);

  if (error) {
    throw new Error("DATABASE_GET_RESERVATION_FOR_USERS_ERROR");
  }

  return data;
};

module.exports = {
  getAllReservations,
  getReservationById,
  addNewReservation,
  updateReservationById,
  deleteReservationById,
  getReservationForUsers,
};
