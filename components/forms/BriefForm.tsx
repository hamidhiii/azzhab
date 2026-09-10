"use client";

import { Chips, Consent, FormFoot, FormSection, FormStatus, Input, Select, Textarea } from "./fields";
import { useAzzhabForm } from "./useAzzhabForm";
import type { Dictionary, Locale } from "@/lib/i18n";

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
        <Input name="city" label={f.city} autoComplete="address-level2" />
        <Input name="position" label={f.position} autoComplete="organization-title" />
        <Input name="website" label={f.website} autoComplete="url" />
      </FormSection>

      <FormSection index={2} title={pl.s2}>
        <Chips
          name="productType"
          label={pl.productType}
          options={[
            { value: "Eau de parfum", label: pl.pt1 },
            { value: "Extrait de parfum", label: pl.pt2 },
            { value: "Oud / attar oil", label: pl.pt3 },
            { value: "Body mist", label: pl.pt4 },
            { value: "Home fragrance", label: pl.pt5 },
            { value: "Gift set", label: pl.pt6 },
          ]}
        />
        <Select
          name="volume"
          label={pl.volume}
          placeholder={f.select}
          options={[
            { value: "3-12 ml", label: pl.v1 },
            { value: "30 ml", label: pl.v2 },
            { value: "50 ml", label: pl.v3 },
            { value: "100 ml", label: pl.v4 },
            { value: "Other", label: pl.v5 },
          ]}
        />
        <Select
          name="quantity"
          label={pl.qty}
          required
          invalid={bad("quantity")}
          error={f.err}
          onClear={clearField}
          placeholder={f.select}
          options={[
            { value: "500-1000", label: pl.q1o },
            { value: "1000-5000", label: pl.q2o },
            { value: "5000-20000", label: pl.q3o },
            { value: "20000+", label: pl.q4o },
          ]}
        />
        <Input name="skuCount" label={pl.skus} type="number" min={1} />
        <Input name="targetMarket" label={pl.market} placeholder={pl.marketPh} />
        <Input name="launchDate" label={pl.launch} type="month" />
      </FormSection>

      <FormSection index={3} title={pl.s3}>
        <Chips
          name="direction"
          label={pl.direction}
          options={[
            { value: "Oriental / amber", label: pl.d1 },
            { value: "Woody / oud", label: pl.d2 },
            { value: "Floral", label: pl.d3 },
            { value: "Fresh / citrus", label: pl.d4 },
            { value: "Gourmand", label: pl.d5 },
            { value: "Musk", label: pl.d6 },
          ]}
        />
        <Select
          name="concentration"
          label={pl.conc}
          placeholder={f.select}
          options={[
            { value: "EDT 8-12%", label: pl.c1 },
            { value: "EDP 18-22%", label: pl.c2 },
            { value: "Extrait 25-30%", label: pl.c3 },
            { value: "Advise us", label: pl.c4 },
          ]}
        />
        <Input name="references" label={pl.refs} placeholder={pl.refsPh} />
      </FormSection>

      <FormSection index={4} title={pl.s4}>
        <Select
          name="bottleSupply"
          label={pl.bottle}
          placeholder={f.select}
          options={[
            { value: "Azzhab sources", label: pl.b1 },
            { value: "Client supplies", label: pl.b2 },
            { value: "Undecided", label: pl.b3 },
          ]}
        />
        <Select
          name="artwork"
          label={pl.art}
          placeholder={f.select}
          options={[
            { value: "Print ready", label: pl.a1o },
            { value: "Design support needed", label: pl.a2o },
            { value: "Not started", label: pl.a3o },
          ]}
        />
        <Chips
          name="packaging"
          label={pl.pack}
          options={[
            { value: "Rigid box", label: pl.pk1 },
            { value: "Folding carton", label: pl.pk2 },
            { value: "Cellophane only", label: pl.pk3 },
            { value: "Custom insert", label: pl.pk4 },
          ]}
        />
      </FormSection>

      <FormSection index={5} title={pl.s5}>
        <Select
          name="budget"
          label={pl.budget}
          full
          placeholder={f.select}
          options={[
            { value: "Under 10 USD", label: pl.bd1 },
            { value: "10-25 USD", label: pl.bd2 },
            { value: "25-50 USD", label: pl.bd3 },
            { value: "Above 50 USD", label: pl.bd4 },
          ]}
        />
        <Textarea name="message" label={f.message} full placeholder={f.messagePh} hint={pl.filesHint} />
        <Consent label={f.consent} invalid={bad("consent")} error={f.err} onClear={clearField} />
      </FormSection>

      <FormFoot privacy={f.privacy} label={f.submit} sending={sending} sendingLabel={f.sending} />
    </form>
  );
}
