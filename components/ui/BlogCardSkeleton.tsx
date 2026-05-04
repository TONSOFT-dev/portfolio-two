export default function BlogCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-coal h-[240px] sm:h-[280px] md:h-[300px] lg:h-[320px] xl:h-[320px] animate-pulse">
      <div className="absolute inset-0 bg-linear-to-r from-[#08080540] to-[#08080522]" />
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 lg:p-5 xl:p-5 bg-linear-to-t from-noir/90 via-noir/50 to-transparent">
        {/* Top: Category Badge Skeleton */}
        <div className="flex items-start justify-end">
          <div className="h-5 sm:h-6 lg:h-7 xl:h-8 w-16 sm:w-20 lg:w-24 xl:w-24 bg-ashen/30 rounded-full"></div>
        </div>

        {/* Bottom: Title Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-5 sm:h-6 lg:h-7 xl:h-7 w-full sm:w-11/12 lg:w-full xl:w-full bg-ashen/30 rounded" />
          <div className="h-5 sm:h-6 lg:h-7 xl:h-7 w-3/4 sm:w-4/5 lg:w-5/6 xl:w-5/6 bg-ashen/30 rounded" />
        </div>
      </div>
    </div>
  );
}
