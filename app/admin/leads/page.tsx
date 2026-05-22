import type { Metadata } from "next";
import { Inbox, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getLeads, getLeadStats } from "@/lib/leads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads inbox",
  robots: { index: false },
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminLeadsPage() {
  const [leads, stats] = await Promise.all([getLeads(), getLeadStats()]);

  const summary = [
    { label: "Total leads", value: stats.total },
    { label: "Quote requests", value: stats.quotes },
    { label: "General enquiries", value: stats.general },
  ];

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Inbox className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-ink">Leads inbox</h1>
          <p className="text-sm text-muted">
            Form submissions from the website, newest first.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-card border border-line bg-white p-5"
          >
            <p className="text-sm text-muted">{item.label}</p>
            <p className="mt-1 text-3xl font-bold text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {leads.length === 0 ? (
          <div className="rounded-card border border-dashed border-line bg-sand-50 px-6 py-16 text-center text-sm text-muted">
            No leads yet. Submissions will appear here.
          </div>
        ) : (
          leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-card border border-line bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-bold text-ink">{lead.name}</h2>
                  <Badge tone={lead.type === "quote" ? "brand" : "neutral"}>
                    {lead.type === "quote" ? "Quote request" : "General"}
                  </Badge>
                </div>
                <time className="text-xs text-muted">
                  {dateFormat.format(lead.createdAt)}
                </time>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-brand-600"
                >
                  <Mail className="size-3.5" />
                  {lead.email}
                </a>
                <a
                  href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-1.5 hover:text-brand-600"
                >
                  <Phone className="size-3.5" />
                  {lead.phone}
                </a>
              </div>

              {lead.equipmentName && (
                <p className="mt-2 text-sm text-ink">
                  Equipment:{" "}
                  <span className="font-semibold">{lead.equipmentName}</span>
                </p>
              )}
              {lead.message && (
                <p className="mt-2 rounded-lg bg-sand-50 px-3.5 py-2.5 text-sm text-ink">
                  {lead.message}
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
