import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, MapPin, PackageCheck, Truck } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";

export const metadata: Metadata = {
  title: "Nationwide delivery",
  description:
    "Door-to-door transport of agricultural machinery, scheduled within 48 hours of a confirmed order.",
};

const STEPS = [
  {
    icon: PackageCheck,
    title: "Order confirmed",
    text: "Once your purchase is finalized, the machine is prepared and inspected for transport.",
  },
  {
    icon: CalendarCheck,
    title: "Dispatch in 48h",
    text: "We schedule a specialized carrier and confirm a delivery window with you directly.",
  },
  {
    icon: Truck,
    title: "In transit",
    text: "Equipment is moved on appropriate low-loader or flatbed transport, fully insured.",
  },
  {
    icon: MapPin,
    title: "On-farm handover",
    text: "The machine is unloaded at your location with a handover walk-through.",
  },
];

export default function DeliveryPage() {
  return (
    <div>
      <PageHeader
        title="Nationwide delivery"
        description="We move equipment to your farm anywhere in the country — on insured transport and on a schedule that works for your season."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07}>
              <Card className="h-full p-6">
                <IconBox>
                  <step.icon className="size-6" />
                </IconBox>
                <h2 className="mt-4 font-bold text-ink">{step.title}</h2>
                <p className="mt-1.5 text-sm text-muted">{step.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 grid gap-8 rounded-2xl border border-line bg-sand-50 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <h2 className="heading-section">What delivery includes</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                {[
                  "Fully insured transport for the full journey",
                  "Loading and unloading handled by the carrier",
                  "Live delivery window confirmed in advance",
                  "On-farm handover and basic operating walk-through",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:border-l lg:border-line lg:pl-8">
              <h2 className="heading-section">Costs &amp; timing</h2>
              <p className="mt-4 text-sm text-muted">
                Delivery is quoted per order based on distance and machine
                size, and confirmed before you commit. Most deliveries are
                completed within five business days of dispatch.
              </p>
              <Link
                href="/catalog"
                className={`${buttonVariants("primary", "md")} mt-6`}
              >
                Browse equipment
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
