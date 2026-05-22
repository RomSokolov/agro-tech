"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { leadFormSchema, type LeadFormValues } from "@/lib/lead-schema";
import type { LeadType } from "@/lib/types";

type LeadFormProps = {
  type: LeadType;
  equipmentId?: string;
  equipmentName?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

export function LeadForm({ type, equipmentId, equipmentName }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
  });

  async function onSubmit(values: LeadFormValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type, equipmentId, equipmentName }),
      });
      if (!response.ok) throw new Error("Request failed");
      reset();
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-card border border-brand-200 bg-brand-50 px-6 py-10 text-center">
        <CheckCircle2 className="size-10 text-brand-500" />
        <h3 className="mt-3 text-lg font-bold text-ink">Request received</h3>
        <p className="mt-1.5 max-w-sm text-sm text-muted">
          Thank you — a member of our sales team will be in touch within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {equipmentName && (
        <p className="rounded-lg bg-sand-100 px-3.5 py-2.5 text-sm text-muted">
          Enquiry about{" "}
          <span className="font-semibold text-ink">{equipmentName}</span>
        </p>
      )}

      <div>
        <label
          htmlFor="lead-name"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Full name
        </label>
        <Input
          id="lead-name"
          autoComplete="name"
          placeholder="Jane Carter"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-email"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Email
          </label>
          <Input
            id="lead-email"
            type="email"
            autoComplete="email"
            placeholder="jane@farm.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label
            htmlFor="lead-phone"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Phone
          </label>
          <Input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(608) 555-0100"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label
          htmlFor="lead-message"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Message <span className="text-muted">(optional)</span>
        </label>
        <Textarea
          id="lead-message"
          placeholder={
            type === "quote"
              ? "Let us know your timeline, trade-in or finance questions."
              : "How can our team help you?"
          }
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">
          Something went wrong sending your request. Please try again or call
          us directly.
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {type === "quote" ? "Request a quote" : "Send message"}
      </Button>
      <p className="text-center text-xs text-muted">
        We will only use your details to respond to this enquiry.
      </p>
    </form>
  );
}
