import Link from "next/link";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-sand-50">
      <div className="container-page py-10 lg:py-14">
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-brand-600">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink">{eyebrow ?? title}</span>
        </nav>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
