import { Skeleton } from 'components/shared/ui/Skeleton';

const BenefitAccordionSkeleton = () => {
  return (
    <div className="bg-gray-800 gap-3 xl:border xl:border-gray-700 p-4 rounded-xl">
      <div className="flex items-center gap-3 w-full">
        <Skeleton className="w-14 h-14 bg-gray-700 rounded-xl" />
        <div className="flex flex-col gap-2 items-start grow">
          <Skeleton className="h-4 w-[105px] rounded-xl" />
          <Skeleton className="h-[18px] bg-gray-700 w-[62px] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default BenefitAccordionSkeleton;
