"use client";

import { Consent, FormFoot, FormSection, FormStatus, Input, Select, Textarea } from "./fields";
import { useAzzhabForm } from "./useAzzhabForm";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function EnquiryForm({
  locale,
  form: f,
  contact,
}: {
  locale: Locale;
  form: Dictionary["form"];
  contact: Dictionary["contact"];
}) {
  const { invalid, status, sending, onSubmit, clearField } = useAzzhabForm({
    form: "general-enquiry",
    locale,
    required: ["contactName", "email", "message", "consent"],
    messages: { ok: f.ok, error: f.error, mailto: f.mailto, invalid: f.invalid },
  });

  const bad = (name: string) => invalid.includes(name);

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <FormStatus status={status} />

      <FormSection index={1} title={contact.formTitle}>
        <Input name="contactName" label={contact.name} required invalid={bad("contactName")} error={f.err} onClear={clearField} autoComplete="name" />
        <Input name="company" label={f.company} autoComplete="organization" />
        <Input name="email" label={f.email} type="email" required invalid={bad("email")} error={f.err} onClear={clearField} autoComplete="email" />
        <Input name="phone" label={f.phone} type="tel" autoComplete="tel" />
        <Select
          name="subject"
          label={contact.subject}
          full
          placeholder={f.select}
          options={[
            { value: "Private label", label: contact.sj1 },
            { value: "Wholesale", label: contact.sj2 },
            { value: "Quality and documentation", label: contact.sj3 },
            { value: "Factory visit", label: contact.sj4 },
            { value: "Other", label: contact.sj5 },
          ]}
        />
        <Textarea
          name="message"
          label={contact.messageReq}
          required
          invalid={bad("message")}
          error={f.err}
          onClear={clearField}
          full
          placeholder={f.messagePh}
        />
        <Consent label={f.consent} invalid={bad("consent")} error={f.err} onClear={clearField} />
      </FormSection>

      <FormFoot privacy={f.privacy} label={f.submit} sending={sending} sendingLabel={f.sending} />
    </form>
  );
}
