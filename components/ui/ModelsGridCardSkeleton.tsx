export default function ModelsGridCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-coal h-[320px] animate-pulse">
      <div className="absolute inset-0 bg-linear-to-r from-[#08080540] to-[#08080522]" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 bg-linear-to-t from-noir/90 via-noir/50 to-transparent">
        {/* Top section skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-ashen/30 rounded" />
          <div className="h-4 w-20 bg-ashen/30 rounded" />
        </div>
        {/* Bottom section skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-6 w-32 bg-ashen/30 rounded" />
          <div className="h-4 w-24 bg-ashen/30 rounded" />
        </div>
      </div>
    </div>
  );
}
