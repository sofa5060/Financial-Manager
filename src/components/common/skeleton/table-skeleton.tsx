import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="w-full h-[40px] rounded-md" />
        ))}
    </div>
  );
};

export default TableSkeleton;
