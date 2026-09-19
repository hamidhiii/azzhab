"use client";

import { Consent, FormFoot, FormSection, FormStatus, Input, Select, Textarea } from "./fields";
import { useAzzhabForm } from "./useAzzhabForm";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Amani line sheet request: one block, eight fields. */
export default function WholesaleForm({
  locale,
  form: f,
  ws,
}: {
  locale: Locale;
  form: Dictionary["form"];
  ws: Dictionary["ws"];
}) {
  const { invalid, status, sending, onSubmit, clearField } = useAzzhabForm({
    form: "amani-line-sheet",
    locale,
    required: ["company", "contactName", "email", "phone", "country", "monthlyVolume", "consent"],
    messages: { ok: f.ok, error: f.error, mailto: f.mailto, invalid: f.invalid },
  });

  const bad = (name: string) => invalid.includes(name);

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <FormStatus status={status} />

      <FormSection index={1} title={ws.s1}>
        <Input name="company" label={f.company} required invalid={bad("company")} error={f.err} onClear={clearField} autoComplete="organization" />
        <Input name="contactName" label={f.contact} required invalid={bad("contactName")} error={f.err} onClear={clearField} autoComplete="name" />
        <Input name="email" label={f.email} type="email" required invalid={bad("email")} error={f.err} onClear={clearField} autoComplete="email" />
        <Input name="phone" label={f.phone} type="tel" required invalid={bad("phone")} error={f.err} onClear={clearField} autoComplete="tel" />
        <Input name="country" label={f.country} required invalid={bad("country")} error={f.err} onClear={clearField} autoComplete="country-name" />
        <Select
          name="businessType"
          label={ws.bizType}
          placeholder={f.select}
          options={[
            { value: "Distributor", label: ws.bt1 },
            { value: "Wholesaler", label: ws.bt2 },
            { value: "Retail chain", label: ws.bt3 },
            { value: "E-commerce", label: ws.bt4 },
            { value: "Other", label: ws.bt5 },
          ]}
        />
        <Select
          name="monthlyVolume"
          label={ws.volume}
          required
          invalid={bad("monthlyVolume")}
          error={f.err}
          onClear={clearField}
          full
          placeholder={f.select}
          options={[
            { value: "Under 1000", label: ws.vl1 },
            { value: "1000-5000", label: ws.vl2 },
            { value: "5000+", label: ws.vl3 },
          ]}
        />
        <Textarea name="message" label={f.message} full placeholder={f.messagePh} />
        <Consent label={f.consent} invalid={bad("consent")} error={f.err} onClear={clearField} />
      </FormSection>

      <FormFoot privacy={f.privacy} label={f.submit} sending={sending} sendingLabel={f.sending} />
    </form>
  );
}
