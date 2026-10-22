import { useEffect, useState } from "react";

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
const Modal = ({
  isOpen,
  onClose,
  title = "Form",
  fields = [],
  renderFields,
  initialData = null,
  onSubmit,
  isLoading = false,
}) => {
  const buildEmptyState = () =>
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === "checkbox" ? false : "",
      }),
      {},
    );

  const [formData, setFormData] = useState(buildEmptyState);

  // Popola il form quando si apre in edit mode o si resetta in add mode
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ? { ...buildEmptyState(), ...initialData } : buildEmptyState());
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

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
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="modal-box">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-accent">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {renderFields
            ? renderFields({ formData, handleChange, setFormData })
            : fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label htmlFor={field.name} className="text-sm text-muted">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={handleChange}
                      placeholder={field.placeholder ?? ""}
                      required={field.required ?? false}
                      disabled={isLoading}
                      rows={3}
                      className="modal-input resize-none"
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={handleChange}
                      required={field.required ?? false}
                      disabled={isLoading}
                      className="modal-input"
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
                      className="modal-checkbox"
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type ?? "text"}
                      value={formData[field.name] ?? ""}
                      onChange={handleChange}
                      placeholder={field.placeholder ?? ""}
                      required={field.required ?? false}
                      disabled={isLoading}
                      className="modal-input"
                    />
                  )}
                </div>
              ))}

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="modal-cancel-btn"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="primary-button"
            >
              {isLoading ? "Salvataggio..." : initialData ? "Salva modifiche" : "Aggiungi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
