const supabase = require("../config/db_connection");

// Recupera tutti gli operatori
const getOperators = async () => {
  const { data, error } = await supabase.from("ECS_Operators").select("*");

  if (error) {
    throw new Error("DATABASE_GET_OPERATORS_ERROR");
  }

  return data;
};

// Trova operatore per id
const getOperatorById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Operators")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // .single genera un errore se non trova righe!

  if (error) {
    throw new Error("DATABASE_GET_OPERATOR_BY_ID_ERROR");
  }

  return data; // se non trovato = null
};

// Trova operatore per email
const findOperatorByEmail = async (email) => {
  const { data, error } = await supabase
    .from("ECS_Operators")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error("DATABASE_FIND_OPERATOR_ERROR");
  }

  return data; // se non trovato = null
};

// Aggiungi un nuovo operatore (password già hashata)
const addNewOperator = async (name, surname, email, hashedPassword, admin) => {
  const { data, error } = await supabase
    .from("ECS_Operators")
    .insert([
      {
        name,
        surname,
        email,
        password: hashedPassword,
        admin,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_ADD_NEW_OPERATOR_ERROR");
  }

  return data;
};

// Modifica un operatore (password già hashata se presente)
const updateOperatorById = async (
  id,
  name,
  surname,
  email,
  password,
  admin,
) => {
  const payload = {
    name,
    surname,
    email,
    admin,
  };

  if (password) {
    payload.password = password;
  }

  const { data, error } = await supabase
    .from("ECS_Operators")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_UPDATE_OPERATOR_ERROR");
  }

  return data;
};

// Elimina un operatore
const deleteOperatorById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Operators")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("DATABASE_DELETE_OPERATOR_ERROR");
  }

  return data;
};

module.exports = {
  getOperators,
  getOperatorById,
  findOperatorByEmail,
  addNewOperator,
  updateOperatorById,
  deleteOperatorById,
};
