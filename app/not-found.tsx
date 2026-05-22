import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-28 text-center">
      <p className="text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted">
        The page you are looking for has moved or no longer exists. Try
        browsing our equipment catalog instead.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants("outline", "md")}>
          Back to home
        </Link>
        <Link href="/catalog" className={buttonVariants("primary", "md")}>
          Browse catalog
        </Link>
      </div>
    </div>
  );
}
