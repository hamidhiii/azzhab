"use client";

import type { ReactNode } from "react";

import type { Status } from "./useAzzhabForm";

type Base = {
  name: string;
  label: string;
  required?: boolean;
  invalid?: boolean;
  error?: string;
  hint?: string;
  full?: boolean;
  onClear?: (name: string) => void;
};

function wrapper({ full, invalid }: { full?: boolean; invalid?: boolean }) {
  return ["field", full ? "field--full" : "", invalid ? "is-invalid" : ""].filter(Boolean).join(" ");
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id}>
      <span>{label}</span> {required && <span className="req">*</span>}
    </label>
  );
}

export function Input({
  name,
  label,
  required,
  invalid,
  error,
  hint,
  full,
  onClear,
  type = "text",
  placeholder,
  autoComplete,
  min,
}: Base & {
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  min?: number;
}) {
  const id = `f-${name}`;
  return (
    <div className={wrapper({ full, invalid })}>
      <Label id={id} label={label} required={required} />
      <input
        className="input"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        onChange={() => onClear?.(name)}
      />
      {hint && <span className="hint">{hint}</span>}
      {error && <span className="err">{error}</span>}
    </div>
  );
}

export function Textarea({
  name,
  label,
  required,
  invalid,
  error,
  hint,
  full,
  onClear,
  placeholder,
}: Base & { placeholder?: string }) {
  const id = `f-${name}`;
  return (
    <div className={wrapper({ full, invalid })}>
      <Label id={id} label={label} required={required} />
      <textarea
        className="textarea"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={() => onClear?.(name)}
      />
      {hint && <span className="hint">{hint}</span>}
      {error && <span className="err">{error}</span>}
    </div>
  );
}

export function Select({
  name,
  label,
  required,
  invalid,
  error,
  full,
  onClear,
  placeholder,
  options,
}: Base & { placeholder: string; options: { value: string; label: string }[] }) {
  const id = `f-${name}`;
  return (
    <div className={wrapper({ full, invalid })}>
      <Label id={id} label={label} required={required} />
      <select
        className="select"
        id={id}
        name={name}
        defaultValue=""
        onChange={() => onClear?.(name)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="err">{error}</span>}
    </div>
  );
}

/** Multi-select chips backed by checkboxes. */
export function Chips({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="field field--full">
      <label>{label}</label>
      <div className="choices">
        {options.map((option) => (
          <label className="choice" key={option.value}>
            <input type="checkbox" name={name} value={option.value} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function Consent({
  label,
  invalid,
  error,
  onClear,
}: {
  label: string;
  invalid?: boolean;
  error: string;
  onClear?: (name: string) => void;
}) {
  return (
    <div className={wrapper({ full: true, invalid })}>
      <label className="check">
        <input type="checkbox" name="consent" onChange={() => onClear?.("consent")} />
        <span>{label}</span>
      </label>
      <span className="err">{error}</span>
    </div>
  );
}

export function FormSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="form__section">
      <legend className="form__head">
        <span className="num">{String(index).padStart(2, "0")}</span>{" "}
        <span className="h4">{title}</span>
      </legend>
      <div className="fields">{children}</div>
    </fieldset>
  );
}

export function FormStatus({ status }: { status: Status }) {
  const className =
    status.kind === "ok"
      ? "form-status is-ok"
      : status.kind === "error"
        ? "form-status is-err"
        : "form-status";
  return (
    <div className={className} role="status" aria-live="polite">
      {status.text}
    </div>
  );
}

export function FormFoot({
  privacy,
  label,
  sending,
  sendingLabel,
}: {
  privacy: string;
  label: string;
  sending: boolean;
  sendingLabel: string;
}) {
  return (
    <div className="form__foot">
      <p className="small w-46">{privacy}</p>
      <button className="btn btn--solid" type="submit" disabled={sending}>
        {sending ? sendingLabel : label}
      </button>
    </div>
  );
}
