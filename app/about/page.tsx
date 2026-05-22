import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { EquipmentVisual } from "@/components/equipment/equipment-visual";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/motion/reveal";
import { IconBox } from "@/components/ui/icon-box";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About & contact",
  description:
    "Learn about AgriField and get in touch with our agricultural equipment sales team.",
};

const VALUES = [
  {
    title: "Honest condition reporting",
    text: "Documented hours and inspection findings on every used machine — no surprises.",
  },
  {
    title: "Equipment-first advice",
    text: "Our team works the catalog daily and recommends what fits your acreage, not the biggest invoice.",
  },
  {
    title: "Support after the sale",
    text: "Warranty, servicing and parts from an in-house workshop that knows the machines.",
  },
];

const CONTACT = [
  { icon: MapPin, label: "Visit us", value: SITE.address },
  { icon: Phone, label: "Call", value: SITE.phone },
  { icon: Mail, label: "Email", value: SITE.email },
  { icon: Clock, label: "Opening hours", value: SITE.hours },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="About AgriField"
        description="A specialist dealer of new and pre-owned agricultural machinery, built around honest information and dependable support."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line">
              <EquipmentVisual
                category="tractors"
                seed="about-story"
                label="AgriField equipment"
                className="aspect-[4/3] w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="heading-section sm:text-3xl">
                Machinery you can trust, from people who know it
              </h2>
              <p className="mt-4 text-muted">
                AgriField connects farmers with the right equipment for the
                job. We keep a broad inventory across six categories, inspect
                everything before it is listed, and stay involved long after
                delivery with service, parts and warranty support.
              </p>
              <p className="mt-3 text-muted">
                Whether you are scaling up, replacing an ageing machine or
                buying your first tractor, our team helps you make a confident,
                well-informed decision.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <div className="h-full rounded-card border border-line bg-sand-50 p-6">
                <h3 className="font-bold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-sand-50 py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading-section sm:text-3xl">Get in touch</h2>
            <p className="mt-3 text-muted">
              Have a question about a machine, delivery or finance? Send us a
              message and our team will get back to you within one business
              day.
            </p>
            <ul className="mt-8 space-y-5">
              {CONTACT.map((item) => (
                <li key={item.label} className="flex items-start gap-3.5">
                  <IconBox className="size-10 rounded-lg bg-white shadow-sm">
                    <item.icon className="size-5" />
                  </IconBox>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-ink">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 lg:p-8">
            <h3 className="text-lg font-bold text-ink">Send us a message</h3>
            <p className="mt-1 text-sm text-muted">
              We will only use your details to respond to this enquiry.
            </p>
            <div className="mt-5">
              <LeadForm type="general" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
