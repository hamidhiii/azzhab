"use client";

import { Chips, Consent, FormFoot, FormSection, FormStatus, Input, Select, Textarea } from "./fields";
import { useAzzhabForm } from "./useAzzhabForm";
import type { Dictionary, Locale } from "@/lib/i18n";

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
    form: "wholesale-price-list",
    locale,
    required: [
      "company",
      "contactName",
      "email",
      "phone",
      "country",
      "businessType",
      "monthlyVolume",
      "consent",
    ],
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
        <Input name="website" label={f.website} autoComplete="url" />
      </FormSection>

      <FormSection index={2} title={ws.s2}>
        <Select
          name="businessType"
          label={ws.bizType}
          required
          invalid={bad("businessType")}
          error={f.err}
          onClear={clearField}
          placeholder={f.select}
          options={[
            { value: "Distributor", label: ws.bt1 },
            { value: "Wholesaler", label: ws.bt2 },
            { value: "Retail chain", label: ws.bt3 },
            { value: "E-commerce", label: ws.bt4 },
            { value: "Travel retail", label: ws.bt5 },
            { value: "Other", label: ws.bt6 },
          ]}
        />
        <Input name="yearsActive" label={ws.years} type="number" min={0} />
        <Input name="markets" label={ws.markets} full placeholder={ws.marketsPh} />
        <Chips
          name="categories"
          label={ws.cats}
          options={[
            { value: "Eau de parfum", label: ws.ct1 },
            { value: "Oud / attar oils", label: ws.ct2 },
            { value: "Body mist", label: ws.ct3 },
            { value: "Home fragrance", label: ws.ct4 },
            { value: "Gift sets", label: ws.ct5 },
            { value: "White label", label: ws.ct6 },
          ]}
        />
      </FormSection>

      <FormSection index={3} title={ws.s3}>
        <Select
          name="monthlyVolume"
          label={ws.volume}
          required
          invalid={bad("monthlyVolume")}
          error={f.err}
          onClear={clearField}
          placeholder={f.select}
          options={[
            { value: "Under 1000", label: ws.vl1 },
            { value: "1000-5000", label: ws.vl2 },
            { value: "5000-20000", label: ws.vl3 },
            { value: "Container", label: ws.vl4 },
          ]}
        />
        <Select
          name="incoterms"
          label={ws.inco}
          placeholder={f.select}
          options={[
            { value: "EXW Dubai", label: ws.ic1 },
            { value: "FOB Jebel Ali", label: ws.ic2 },
            { value: "CIF", label: ws.ic3 },
            { value: "DAP", label: ws.ic4 },
            { value: "Advise us", label: ws.ic5 },
          ]}
        />
        <Select
          name="exclusivity"
          label={ws.excl}
          placeholder={f.select}
          options={[
            { value: "Yes", label: ws.ex1 },
            { value: "No", label: ws.ex2 },
            { value: "To discuss", label: ws.ex3 },
          ]}
        />
        <Textarea name="message" label={f.message} full placeholder={f.messagePh} />
        <Consent label={f.consent} invalid={bad("consent")} error={f.err} onClear={clearField} />
      </FormSection>

      <FormFoot privacy={f.privacy} label={f.submit} sending={sending} sendingLabel={f.sending} />
    </form>
  );
}
