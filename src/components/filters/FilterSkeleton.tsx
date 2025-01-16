// components/FilterSkeleton.tsx
import { Skeleton, Box } from "@mui/material";

const FilterSkeleton = () => (
  <Box sx={{ width: "100%", maxWidth: 300 }}>
    <Skeleton variant="rectangular" height={48} sx={{ mb: 2 }} />

    {/* Brand Skeleton */}
    <Box sx={{ mb: 2 }}>
      <Skeleton variant="rectangular" height={48} />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} height={40} sx={{ my: 1 }} />
      ))}
    </Box>

    {/* Color Skeleton */}
    <Box sx={{ mb: 2 }}>
      <Skeleton variant="rectangular" height={48} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} variant="circular" width={24} height={24} />
        ))}
      </Box>
    </Box>

    {/* Product Types Skeleton */}
    <Box>
      <Skeleton variant="rectangular" height={48} />
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} height={40} sx={{ my: 1 }} />
      ))}
    </Box>
  </Box>
);

export default FilterSkeleton;
