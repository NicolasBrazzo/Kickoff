import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getFields,
  addNewField,
  updateField,
  deleteField as deleteFieldService,
} from "../services/fieldsServices";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { queryClient } from "../main";
import { showSuccess } from "../utils/toast";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Fields = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["fields"],
    queryFn: getFields,
  });

  // Aggiungi campo
  const { mutate: addField, isPending: isAdding } = useMutation({
    mutationFn: addNewField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      showSuccess("Campo aggiunto con successo");
      setModalOpen(false);
    },
  });

  // Modifica campo
  const { mutate: editField, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }) => updateField(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      showSuccess("Campo modificato con successo");
      setModalOpen(false);
    },
  });

  // elimina campo
  const { mutate: deleteField, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteFieldService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      showSuccess("Campo eliminato con successo");
    },
  });
  // Apri il Modal per aggiungere un campo
  const openAddModal = () => {
    setSelectedField(null);
    setModalOpen(true);
  };

  // Apri il Modal per modificare un campo
  const openEditModal = (field) => {
    setSelectedField(field);
    setModalOpen(true);
  };

  // Callback "all'indietro": il Modal restituisce i dati e qui decidiamo se add o edit
  const handleSubmit = (formData) => {
    console.log(formData);
    if (selectedField) {
      editField({ id: selectedField.id, data: formData });
    } else {
      addField(formData);
    }
  };

  if (error) return <div>Errore: {error.message}</div>;

  return (
    <div className="mx-10 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h1>Campi</h1>
        <Button onClick={openAddModal}>
          <Plus data-icon="inline-start" />
          Aggiungi campo
        </Button>
      </div>

      {isLoading ?
        <Loader />
      : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((field) => (
            <div key={field.id} className="flex flex-col gap-1 rounded-lg border bg-card p-5">
              <div className="flex items-center justify-between">
                <h2>
                  {field.name}
                </h2>
                <Button
                  variant="quiet"
                  size="icon"
                  aria-label="Elimina campo"
                  disabled={isDeleting}
                  className="-mr-2"
                  onClick={() => {
                    if (window.confirm("Sei sicuro di voler eliminare questo campo?")) {
                        deleteField(field.id);
                    }
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
              <p>{field.type}</p>
              <p>{field.isCover ? "Copertura" : "Non copertura"}</p>
              <p>{field.hourPrice} €/h</p>
              <p>{field.isActive ? "Attivo" : "Non attivo"}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 self-start"
                onClick={() => openEditModal(field)}
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
        title={selectedField ? "Modifica campo" : "Nuovo campo"}
        initialData={selectedField}
        onSubmit={handleSubmit}
        isLoading={isAdding || isEditing}
        renderFields={({ formData, handleChange }) => (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-ink">
                Nome
                <span className="text-danger ml-1">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name ?? ""}
                onChange={handleChange}
                placeholder="Campo 1"
                required
                disabled={isAdding || isEditing}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="text-sm font-medium text-ink">
                Tipo
                <span className="text-danger ml-1">*</span>
              </label>
              <Input
                id="type"
                name="type"
                type="text"
                value={formData.type ?? ""}
                onChange={handleChange}
                placeholder="Es. campo, piscina, tennis..."
                required
                disabled={isAdding || isEditing}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isCover"
                name="isCover"
                type="checkbox"
                checked={!!formData.isCover}
                onChange={handleChange}
                disabled={isAdding || isEditing}
                className="size-5"
              />
              <label htmlFor="isCover" className="text-sm font-medium text-ink">
                Copertura
              </label>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="hourPrice" className="text-sm font-medium text-ink">
                Prezzo orario
                <span className="text-danger ml-1">*</span>
              </label>
              <Input
                id="hourPrice"
                name="hourPrice"
                type="number"
                value={formData.hourPrice ?? ""}
                onChange={handleChange}
                placeholder="10"
                required
                disabled={isAdding || isEditing}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={!!formData.isActive}
                onChange={handleChange}
                disabled={isAdding || isEditing}
                className="size-5"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-ink">
                Attivo
              </label>
            </div>
          </>
        )}
      />
    </div>
  );
};
