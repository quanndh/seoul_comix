interface Props {
  length?: number;
}

const RestaurantListEmptyState: React.FC<Props> = ({ length = 8 }) => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="animate-pulse space-y-1">
              <div className="bg-slate-700 w-full h-[240px] md:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px] 3xl:h-[440px] 4xl:h-[500px] rounded-lg" />
              <div className="h-2 bg-slate-700 rounded w-2/4" />
              <div className="flex justify-between items-center space-x-2">
                <div className="h-3 bg-slate-700 rounded w-9/12" />
                <div className="h-3 bg-slate-700 rounded w-3/12" />
              </div>
              <div className="h-3 bg-slate-700 rounded w-full" />
              <div className="h-3 bg-slate-700 rounded w-9/12" />
            </div>
          );
        })}
    </>
  );
};

export default RestaurantListEmptyState;
