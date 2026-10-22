const supabase = require("../config/db_connection");

// CREA OPERATORE
const createOperator = async (name, surname, email, hashedPassword, admin) => {
  const { data, error } = await supabase
    .from("ECS_Operators")
    .insert([
      {
        name,
        surname,
        email,
        password: hashedPassword,
        admin
      },
    ])
    .select()
    .single();

  if (error) {
      throw new Error("DATABASE_CREATE_OPERATOR_ERROR");
  }

  return data;
};

// TROVA OPERATORE PER EMAIL
const findOperatorByEmail = async (email) => {
  const { data, error } = await supabase
    .from("ECS_Operators")
    .select("*")
    .eq("email", email)
    .maybeSingle();   // .single genera un errore se non trova righe!

  if (error) {
    throw new Error("DATABASE_FIND_OPERATOR_ERROR");
  }

  return data; // se non trovato = null
};

// TROVA OPERATORE PER ID
const findOperatorById = async (id) => {
  const { data, error } = await supabase
    .from("ECS_Operators")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("DATABASE_FIND_OPERATOR_ERROR");
  }

  return data;
};

module.exports = {
  createOperator,
  findOperatorByEmail,
  findOperatorById,
};
