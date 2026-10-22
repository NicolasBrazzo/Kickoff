const supabase = require("../config/db_connection");

// Recupera tutti i campi
const getAllFields = async () => {
  const { data, error } = await supabase.from("ECS_Fields").select("*");

  if (error) {
    throw new Error("DATABASE_GET_FIELDS_ERROR");
  }

  return data;
};

// Trova campo per id
const getFieldById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Fields")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // .single genera un errore se non trova righe!

  if (error) {
    throw new Error("DATABASE_GET_FIELD_BY_ID_ERROR");
  }

  return data; // se non trovato = null
};

// Aggiungi un nuovo campo
const addNewField = async (name, type, isCover, hourPrice, isActive) => {
  const { data, error } = await supabase
    .from("ECS_Fields")
    .insert([
      {
        name,
        type,
        isCover,
        hourPrice,
        isActive,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_ADD_NEW_FIELD_ERROR");
  }

  return data;
};

// Modifica un campo
const updateFieldById = async (
  id,
  name,
  type,
  isCover,
  hourPrice,
  isActive,
) => {
  const { data, error } = await supabase
    .from("ECS_Fields")
    .update({ name, type, isCover, hourPrice, isActive })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_UPDATE_FIELD_ERROR");
  }

  return data;
};

// Elimina un campo
const deleteFieldById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Fields")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_DELETE_FIELD_ERROR");
  }

  return data;
};

module.exports = {
  getAllFields,
  getFieldById,
  addNewField,
  updateFieldById,
  deleteFieldById,
};
