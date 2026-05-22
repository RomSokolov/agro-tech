import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HomeCta() {
  return (
    <section className="bg-sand-50 py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-brand-800 px-8 py-14 text-center lg:px-16">
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to find your next machine?
              </h2>
              <p className="mt-4 text-sand-200">
                Browse the full catalog or talk directly to our sales team —
                we will help you match the right equipment to your acreage and
                budget.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/catalog"
                  className={buttonVariants("accent", "lg")}
                >
                  Browse the catalog
                  <ArrowRight className="size-4.5" />
                </Link>
                <a
                  href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
                  className={cn(
                    buttonVariants("outline", "lg"),
                    "border-white/40 bg-white/5 text-white hover:bg-white/10",
                  )}
                >
                  <Phone className="size-4.5" />
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
