import {
    Skeleton
} from "@mui/material";

export default function ProductCardSkeleton() {
    return (
        <div
      className={`dark:bg-slate-800 bg-white group cursor-pointer rounded-xl p-3 space-y-4`}
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        {/* <Skeleton variant="rectangular" width={100} height={100} /> */}

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            {/* Replace IconButton with Skeleton */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </div>
        </div>
      </div>

      {/* Description of Product */}
      <div>
        {/* Replace product name with Skeleton */}
        <Skeleton width={120} height={24} />

        {/* Replace product type with Skeleton */}
        <Skeleton width={80} height={16} />
      </div>

      {/* Price */}
      <div className="flex items-center justify-between font-semibold">
        {/* Replace Currency component with Skeleton */}
        <Skeleton width={60} height={20} />
      </div>
    </div>
    )
}