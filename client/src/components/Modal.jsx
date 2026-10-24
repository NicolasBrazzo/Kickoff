import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inputClasses } from "@/components/ui/input-classes";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/**
 * Modal dinamico riutilizzabile per form di aggiunta e modifica.
 *
 * Props:
 * - isOpen      {boolean}  - controlla la visibilità del modal
 * - onClose     {function} - callback per chiudere il modal
 * - title       {string}   - titolo del modal
 * - initialData {object}   - dati iniziali (edit mode); null/undefined per add mode
 * - renderFields {function} - (opzionale) funzione di render che riceve:
 *       ({ formData, handleChange, setFormData }) => JSX
 *     Se presente, viene usata al posto di `fields`.
 * - onSubmit    {function} - callback chiamata con i dati del form: (formData) => void
 * - isLoading   {boolean}  - disabilita il form durante la mutation
 */
// Il contenuto viene montato a ogni apertura: lo stato del form parte sempre dai dati aggiornati
const Modal = ({ isOpen, ...props }) => (isOpen ? <ModalContent {...props} /> : null);

const ModalContent = ({
  onClose,
  title = "Form",
  fields = [],
  renderFields,
  initialData = null,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(() => {
    const emptyState = fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === "checkbox" ? false : "",
      }),
      {},
    );
    return initialData ? { ...emptyState, ...initialData } : emptyState;
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-5 backdrop-blur-[3px] animate-in fade-in duration-200 motion-reduce:animate-none"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground shadow-[0_8px_20px_rgba(18,32,32,.10)] animate-in fade-in slide-in-from-bottom-4 duration-300 motion-reduce:animate-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="font-serif text-2xl">{title}</h2>
          <Button
            type="button"
            variant="quiet"
            size="icon"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Chiudi"
            className="-mr-2"
          >
            <X />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {renderFields
            ? renderFields({ formData, handleChange, setFormData })
            : fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label htmlFor={field.name} className="text-sm font-medium text-ink">
                    {field.label}
                    {field.required && <span className="text-danger ml-1">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={handleChange}
                      placeholder={field.placeholder ?? ""}
                      required={field.required ?? false}
                      disabled={isLoading}
                      rows={3}
                      className="resize-none"
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={handleChange}
                      required={field.required ?? false}
                      disabled={isLoading}
                      className={cn(inputClasses, "h-11")}
                    >
                      <option value="">-- Seleziona --</option>
                      {(field.options ?? []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <input
                      id={field.name}
                      name={field.name}
                      type="checkbox"
                      checked={!!formData[field.name]}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="size-5"
                    />
                  ) : (
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type ?? "text"}
                      value={formData[field.name] ?? ""}
                      onChange={handleChange}
                      placeholder={field.placeholder ?? ""}
                      required={field.required ?? false}
                      disabled={isLoading}
                    />
                  )}
                </div>
              ))}

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
            >
              Annulla
            </Button>
            <Button type="submit" size="sm" disabled={isLoading}>
              {isLoading ? "Salvataggio..." : initialData ? "Salva modifiche" : "Aggiungi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
