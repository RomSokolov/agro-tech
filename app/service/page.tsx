import type { Metadata } from "next";
import { ClipboardCheck, ShieldCheck, Wrench } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Service & warranty",
  description:
    "Every machine is workshop-inspected and backed by warranty, servicing and in-house technical support.",
};

const SERVICES = [
  {
    icon: ClipboardCheck,
    title: "Pre-sale inspection",
    text: "Every used machine goes through a multi-point workshop inspection before it is listed, with findings documented.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty coverage",
    text: "New equipment carries full manufacturer warranty; used machines include a dealer warranty on major components.",
  },
  {
    icon: Wrench,
    title: "Servicing & parts",
    text: "Our workshop handles scheduled servicing, repairs and genuine parts long after the sale.",
  },
];

const FAQ = [
  {
    q: "What warranty comes with a used machine?",
    a: "Used equipment is sold with a dealer warranty covering the engine, transmission and hydraulics. The exact term is confirmed on each listing before purchase.",
  },
  {
    q: "Can you service the machine after delivery?",
    a: "Yes. Our in-house workshop provides scheduled servicing and repairs, and we stock genuine parts for the brands we sell.",
  },
  {
    q: "Do you offer inspections before I buy?",
    a: "Every listing can be inspected in person or by a booked video walk-through. We can also arrange a working demonstration.",
  },
];

export default function ServicePage() {
  return (
    <div>
      <PageHeader
        title="Service & warranty"
        description="Buying the machine is only the start. We inspect, warrant and support every unit we sell."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <div className="h-full rounded-card border border-line bg-white p-7">
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <service.icon className="size-6" />
                </span>
                <h2 className="mt-5 text-lg font-bold text-ink">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{service.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
            {FAQ.map((item) => (
              <div key={item.q} className="p-6">
                <h3 className="font-bold text-ink">{item.q}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
