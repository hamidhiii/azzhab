"use client";

import { Consent, FormFoot, FormSection, FormStatus, Input, Select, Textarea } from "./fields";
import { useAzzhabForm } from "./useAzzhabForm";
import type { Dictionary, Locale } from "@/lib/i18n";

/** First-contact brief: one block, eight fields. The rest is settled on the call. */
export default function BriefForm({
  locale,
  form: f,
  pl,
}: {
  locale: Locale;
  form: Dictionary["form"];
  pl: Dictionary["pl"];
}) {
  const { invalid, status, sending, onSubmit, clearField } = useAzzhabForm({
    form: "private-label",
    locale,
    required: ["company", "contactName", "email", "phone", "country", "quantity", "consent"],
    messages: { ok: f.ok, error: f.error, mailto: f.mailto, invalid: f.invalid },
  });

  const bad = (name: string) => invalid.includes(name);

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <FormStatus status={status} />

      <FormSection index={1} title={pl.s1}>
        <Input name="company" label={f.company} required invalid={bad("company")} error={f.err} onClear={clearField} autoComplete="organization" />
        <Input name="contactName" label={f.contact} required invalid={bad("contactName")} error={f.err} onClear={clearField} autoComplete="name" />
        <Input name="email" label={f.email} type="email" required invalid={bad("email")} error={f.err} onClear={clearField} autoComplete="email" />
        <Input name="phone" label={f.phone} type="tel" required invalid={bad("phone")} error={f.err} onClear={clearField} autoComplete="tel" />
        <Input name="country" label={f.country} required invalid={bad("country")} error={f.err} onClear={clearField} autoComplete="country-name" />
        <Select
          name="productType"
          label={pl.productType}
          placeholder={f.select}
          options={[
            { value: "Eau de parfum", label: pl.pt1 },
            { value: "Extrait", label: pl.pt2 },
            { value: "Oud or attar oil", label: pl.pt3 },
            { value: "Home fragrance", label: pl.pt4 },
            { value: "Gift set", label: pl.pt5 },
            { value: "Not decided", label: pl.pt6 },
          ]}
        />
        <Select
          name="quantity"
          label={pl.qty}
          required
          invalid={bad("quantity")}
          error={f.err}
          onClear={clearField}
          full
          placeholder={f.select}
          options={[
            { value: "1000-5000", label: pl.q1o },
            { value: "5000-20000", label: pl.q2o },
            { value: "20000+", label: pl.q3o },
          ]}
        />
        <Textarea name="message" label={f.message} full placeholder={pl.messagePh} />
        <Consent label={f.consent} invalid={bad("consent")} error={f.err} onClear={clearField} />
      </FormSection>

      <FormFoot privacy={f.privacy} label={f.submit} sending={sending} sendingLabel={f.sending} />
    </form>
  );
}
