export default function Loading() {
  return (
    <div className="container-site py-6" data-frame="wide" aria-busy="true" aria-label="Loading component">
      <div className="flex gap-6">
        <div className="hidden w-[240px] shrink-0 animate-pulse flex-col gap-2 lg:flex">
          <div className="h-8 rounded-[9px] bg-accent" />
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-5 rounded-[6px] bg-accent/70" style={{ width: `${60 + ((i * 17) % 35)}%` }} />
          ))}
        </div>
        <div className="min-w-0 flex-1 animate-pulse rounded-[18px] border border-border bg-background px-8 py-9">
          <div className="h-4 w-48 rounded-full bg-accent" />
          <div className="mt-6 h-9 w-64 rounded-[8px] bg-accent" />
          <div className="mt-3 h-4 w-80 max-w-full rounded-full bg-accent" />
          <div className="mt-8 h-9 w-40 rounded-[10px] bg-accent" />
          <div className="mt-3 h-[340px] rounded-[14px] border border-border bg-page" />
        </div>
      </div>
    </div>
  );
}
