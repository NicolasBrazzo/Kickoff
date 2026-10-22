const supabase = require("../config/db_connection");

// Recupera tutti i clienti
const getClients = async () => {
  const { data, error } = await supabase
    .from("ECS_Clients")
    .select("*")

  if (error) {
      throw new Error("DATABASE_GET_CLIENTS_ERROR");
  }

  return data;
};

// Trova cliente per id
const getClientById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();   // .single genera un errore se non trova righe!

  if (error) {
    throw new Error("DATABASE_GET_CLIENT_BY_ID_ERROR");
  }

  return data; // se non trovato = null
};

// Aggiungi un nuovo cliente
const addNewClient = async (name, surname, phone, email, note) => {
  const { data, error } = await supabase
    .from("ECS_Clients")
    .insert([
      {
        name,
        surname,
        phone,
        email,
        note
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_ADD_NEW_CLIENT_ERROR");
  }

  return data;
};

// Modifica un cliente 
const updateClientById = async (id, name, surname, phone, email, note) => {
  const { data, error } = await supabase
    .from("ECS_Clients")
    .update({ name, surname, phone, email, note })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_UPDATE_CLIENT_ERROR");
  }

  return data;
};

// Elimina un cliente
const deleteClientById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Clients")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_DELETE_CLIENT_ERROR");
  }

  return data;
};  

module.exports = {
  getClients,
  getClientById,
  addNewClient,
  updateClientById,
  deleteClientById,
};
