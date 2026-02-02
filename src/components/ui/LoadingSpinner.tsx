export default function LoadingSpinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-primary-500/20 border-t-primary-500 animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="glass-card animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-slate-700/50 rounded w-24 shimmer" />
        <div className="h-6 bg-slate-700/50 rounded-full w-20 shimmer" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700/50 rounded w-full shimmer" />
        <div className="h-4 bg-slate-700/50 rounded w-3/4 shimmer" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-700/50 rounded w-20 shimmer" />
        <div className="h-6 bg-slate-700/50 rounded-full w-16 shimmer" />
      </div>
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
