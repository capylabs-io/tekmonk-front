import React from "react";

export const NotificationSkeleton = () => {
  return (
    <div className="pl-6 pr-4 py-4 flex justify-between items-center relative animate-pulse">
      <div className="flex gap-x-3 items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-48" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
      </div>
      <div className="text-right space-y-2">
        <div className="h-3 bg-gray-200 rounded w-16" />
        <div className="h-5 w-5 bg-gray-200 rounded ml-auto" />
      </div>
    </div>
  );
};

export const NotificationSkeletonList = ({ count = 5 }: { count?: number }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          <NotificationSkeleton />
          {index + 1 !== count && <hr className="border-t border-gray-200" />}
        </React.Fragment>
      ))}
    </div>
  );
};
