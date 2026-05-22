export default function CatalogLoading() {
  return (
    <div>
      <div className="border-b border-line bg-sand-50">
        <div className="container-page py-10 lg:py-12">
          <div className="h-4 w-32 rounded bg-sand-200" />
          <div className="mt-4 h-9 w-72 rounded bg-sand-200" />
          <div className="mt-3 h-4 w-full max-w-xl rounded bg-sand-200" />
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[260px_1fr] lg:py-12">
        <div className="hidden h-96 rounded-card border border-line bg-sand-50 lg:block" />
        <div>
          <div className="h-11 w-full rounded-lg bg-sand-100" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-card border border-line"
              >
                <div className="aspect-[16/10] w-full bg-sand-200" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-20 rounded bg-sand-200" />
                  <div className="h-4 w-40 rounded bg-sand-200" />
                  <div className="h-10 w-full rounded bg-sand-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
