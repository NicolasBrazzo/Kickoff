import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addNewReservation,
  getAllReservations,
  updateReservation,
} from "../services/reservationsServices";
import Loader from "../components/Loader";
import { useState } from "react";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getClients } from "../services/clientsServices";
import { getFields } from "../services/fieldsServices";
import { queryClient } from "../main";
import { showSuccess } from "../utils/toast";

export const Reservations = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Apri il Modal per aggiungere una prenotazione
  const openAddModal = () => {
    setSelectedReservation(null);
    setModalOpen(true);
  };

  // Apri il Modal per modificare una prenotazione
  const openEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  // Callback "all'indietro": il Modal restituisce i dati e qui decidiamo se add o edit
  const handleSubmit = (formData) => {
    const payload = {
      ...formData,
      client_id: formData.client_id ? Number(formData.client_id) : undefined,
      field_id: formData.field_id ? Number(formData.field_id) : undefined,
    };

    if (selectedReservation) {
      editReservation({ id: selectedReservation.id, data: payload });
    } else {
      addReservation(payload);
    }
  };
  // get all reservations
  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: getAllReservations,
  });

  // Aggiungi prenotazione
  const { mutate: addReservation, isPending: isAdding } = useMutation({
    mutationFn: addNewReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      showSuccess("Prenotazione aggiunta con successo");
      setModalOpen(false);
    },
  });

  // Modifica prenotazione
  const { mutate: editReservation, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }) => updateReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      showSuccess("Prenotazione modificata con successo");
      setModalOpen(false);
    },
  });

  const isSaving = isAdding || isEditing;

  // get All clients
  const { data: clients, isPending: isPendingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    enabled: modalOpen,
  });
  // get All Fields
  const { data: fields, isPending: isPendingFields } = useQuery({
    queryKey: ["fields"],
    queryFn: getFields,
    enabled: modalOpen,
  });

  if (error) return <div>Errore: {error.message}</div>;

  if (!isLoading && !data) {
    return (
      <div className="mx-10 mt-5">
        <h1>Prenotazioni</h1>
        <p>Nessuna prenotazione trovata</p>
      </div>
    );
  }

  return (
    <div className="mx-10 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h1>Prenotazioni</h1>
        <Button onClick={openAddModal}>
          <Plus data-icon="inline-start" />
          Aggiungi prenotazione
        </Button>
      </div>
      {isLoading ?
        <Loader />
      : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((reservation) => (
            <div key={reservation.id} className="flex flex-col gap-1 rounded-lg border bg-card p-5">
              <div className="flex items-center justify-between">
                <h2>{reservation.name}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(reservation)}
                >
                  Modifica
                </Button>
              </div>
            </div>
          ))}
        </div>
      }

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          selectedReservation ? "Modifica prenotazione" : "Nuova prenotazione"
        }
        initialData={selectedReservation}
        onSubmit={handleSubmit}
        isLoading={isSaving}
        renderFields={({ formData, handleChange, setFormData }) => (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="date" className="text-sm font-medium text-ink">
                Data
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date ?? ""}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="start_hour" className="text-sm font-medium text-ink">
                Ora inizio
                <span className="text-danger ml-1">*</span>
              </label>
              <Input
                id="start_hour"
                name="start_hour"
                type="time"
                value={formData.start_hour ?? ""}
                onChange={handleChange}
                placeholder="Mario"
                required
                disabled={isSaving}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="end_hour" className="text-sm font-medium text-ink">
                Ora fine
                <span className="text-danger ml-1">*</span>
              </label>
              <Input
                id="end_hour"
                name="end_hour"
                type="time"
                value={formData.end_hour ?? ""}
                onChange={handleChange}
                placeholder="Rossi"
                required
                disabled={isSaving}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-sm font-medium text-ink">
                Stato
              </label>
              <Select
                value={formData.status ?? ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value,
                  }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Stato della prenotazione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="prenotata">prenotata</SelectItem>
                    <SelectItem value="confermata">confermata</SelectItem>
                    <SelectItem value="annullata">annullata</SelectItem>
                    <SelectItem value="completata">completata</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="client_id">Seleziona un cliente</label>
              <Select
                value={formData.client_id ? String(formData.client_id) : ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    client_id: value,
                  }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleziona un cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isPendingClients ? (
                      <Loader />
                    ) : (
                      clients.map((client) => (
                        <SelectItem key={client.id} value={String(client.id)}>
                          {client.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="field_id">Seleziona un campo</label>
              <Select
                value={formData.field_id ? String(formData.field_id) : ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    field_id: value,
                  }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleziona un campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isPendingFields ? (
                      <Loader />
                    ) : (
                      fields.map((field) => (
                        <SelectItem key={field.id} value={String(field.id)}>
                          {field.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      />
    </div>
  );
};
