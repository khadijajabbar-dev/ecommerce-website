import { useState } from "react";
import Icon from "./Icon";

// A single profile field shown as read-only text with a pencil icon.
// Clicking the pencil turns just that field into an inline input with
// Save/Cancel icon buttons. `onSave` should return a Promise and throw
// (with a `.message`) on failure so the field can show an inline error.
const EditableField = ({
  label,
  value,
  onSave,
  as = "input", // "input" | "textarea" | "select"
  type = "text",
  options = [], // for as="select": [{ value, label }]
  placeholder = "",
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startEditing = () => {
    setDraft(value || "");
    setError("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setError("");
    setEditing(false);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#f6fbfb] px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
          <p className="mt-0.5 truncate text-sm font-black text-[#17233f]">
            {value || <span className="font-medium text-slate-400">Not set</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={startEditing}
          aria-label={`Edit ${label}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#178f95] transition hover:bg-[#dff3f2]"
        >
          <Icon name="edit" className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#178f95]/30 bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>

      <div className="mt-2 flex items-start gap-2">
        {as === "textarea" ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder={placeholder}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[#17233f] outline-none focus:border-[#178f95]"
            autoFocus
          />
        ) : as === "select" ? (
          <select
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[#17233f] outline-none focus:border-[#178f95]"
            autoFocus
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[#17233f] outline-none focus:border-[#178f95]"
            autoFocus
          />
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          aria-label="Save"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#178f95] text-white transition hover:bg-[#12757a] disabled:opacity-50"
        >
          <Icon name="check" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={cancelEditing}
          disabled={saving}
          aria-label="Cancel"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
};

export default EditableField;