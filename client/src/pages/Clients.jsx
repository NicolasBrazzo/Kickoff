import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getClients,
  addNewClient,
  updateClient,
  deleteClient as deleteClientService,
} from "../services/clientsServices";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { queryClient } from "../main";
import { showSuccess } from "../utils/toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const Clients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  // Aggiungi cliente
  const { mutate: addClient, isPending: isAdding } = useMutation({
    mutationFn: addNewClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      showSuccess("Cliente aggiunto con successo");
      setModalOpen(false);
    },
  });

  // Modifica cliente
  const { mutate: editClient, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      showSuccess("Cliente modificato con successo");
      setModalOpen(false);
    },
  });

  // elimina cliente
  const { mutate: deleteClient, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteClientService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      showSuccess("Cliente eliminato con successo");
    },
  });
  // Apri il Modal per aggiungere un cliente
  const openAddModal = () => {
    setSelectedClient(null);
    setModalOpen(true);
  };

  // Apri il Modal per modificare un cliente
  const openEditModal = (client) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  // Callback "all'indietro": il Modal restituisce i dati e qui decidiamo se add o edit
  const handleSubmit = (formData) => {
    if (selectedClient) {
      editClient({ id: selectedClient.id, data: formData });
    } else {
      addClient(formData);
    }
  };

  if (error) return <div>Errore: {error.message}</div>;

  return (
    <div className="mx-10 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h1>Clienti</h1>

        <Button variant="secondary" onClick={openAddModal}>
          + Aggiungi cliente
        </Button>

      </div>

      {isLoading ?
        <Loader />
      : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((client) => (
            <div key={client.id} className="box flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h2>
                  {client.name} {client.surname}
                </h2>
                <button
                  className="mt-3 self-start text-xs"
                  onClick={() => {
                    if (window.confirm("Sei sicuro di voler eliminare questo cliente?")) {
                      deleteClient(client.id);
                    }
                  }}
                >
                  <Trash2 />
                </button>
              </div>
              <p>{client.phone}</p>
              <p>{client.email}</p>
              <p className="text-sm opacity-60">
                {client.note || "Nessuna nota"}
              </p>
              <Button variant="secondary"
                className="mt-3"
                onClick={() => openEditModal(client)}
              >
                Modifica
              </Button>
            </div>
          ))}
        </div>
      }

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedClient ? "Modifica cliente" : "Nuovo cliente"}
        initialData={selectedClient}
        onSubmit={handleSubmit}
        isLoading={isAdding || isEditing}
        renderFields={({ formData, handleChange }) => (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm text-muted">
                Nome
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name ?? ""}
                onChange={handleChange}
                placeholder="Mario"
                required
                disabled={isAdding || isEditing}
                // className="modal-input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="surname" className="text-sm text-muted">
                Cognome
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                id="surname"
                name="surname"
                type="text"
                value={formData.surname ?? ""}
                onChange={handleChange}
                placeholder="Rossi"
                required
                disabled={isAdding || isEditing}
                // className="modal-input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm text-muted">
                Telefono
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone ?? ""}
                onChange={handleChange}
                placeholder="333 1234567"
                disabled={isAdding || isEditing}
                // className="modal-input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-muted">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                placeholder="mario@example.com"
                disabled={isAdding || isEditing}
                // className="modal-input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="note" className="text-sm text-muted">
                Note
              </label>
              <Textarea
                id="note"
                name="note"
                value={formData.note ?? ""}
                onChange={handleChange}
                placeholder="Note aggiuntive..."
                disabled={isAdding || isEditing}
                rows={3}
                // className="modal-input resize-none"
              />
            </div>
          </>
        )}
      />
    </div>
  );
};
