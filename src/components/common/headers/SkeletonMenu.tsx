interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SkeletonMenu = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
      {...props}
    />
  );
};
