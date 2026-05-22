import { Check, ClipboardCheck, Search, Truck } from "lucide-react";
import { EquipmentVisual } from "@/components/equipment/equipment-visual";
import { Reveal } from "@/components/motion/reveal";

const BENEFITS = [
  "Every machine is workshop-inspected before it is listed",
  "Transparent engine hours and service history on used units",
  "Flexible finance, leasing and trade-in options",
  "Nationwide delivery with on-farm handover and setup",
];

const STEPS = [
  {
    icon: Search,
    title: "Browse & shortlist",
    text: "Filter the catalog by category, power and budget to find the right fit.",
  },
  {
    icon: ClipboardCheck,
    title: "Inspect or demo",
    text: "Book an inspection or a working demonstration with our sales team.",
  },
  {
    icon: Truck,
    title: "Delivered & supported",
    text: "We deliver, hand over the machine and stay on call for service.",
  },
];

export function ValueProps() {
  return (
    <section className="container-page py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-30px_rgba(22,52,32,0.45)]">
            <EquipmentVisual
              category="harvesters"
              seed="why-us"
              label="Harvester in the field"
              className="aspect-[4/3] w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              A straightforward way to buy serious machinery
            </h2>
            <p className="mt-4 text-muted">
              We keep the buying process simple and honest — clear pricing,
              documented condition and a team that knows the equipment. No
              surprises between the listing and your field.
            </p>
            <ul className="mt-6 space-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm text-ink">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08}>
            <div className="relative rounded-card border border-line bg-sand-50 p-7">
              <span className="absolute right-6 top-6 text-4xl font-bold text-sand-300">
                {index + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
