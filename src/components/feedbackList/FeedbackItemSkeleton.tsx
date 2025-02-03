import React from "react";
import { Box, Skeleton } from "@mui/material";

const FeedbackItemSkeleton: React.FC = () => {
  return (
    <Box sx={{ borderBottom: "1px solid #e0e0e0", py: 2 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton variant="circular" width={56} height={56} />
        <Box display="flex" flexDirection="column" gap={1}>
          <Skeleton variant="text" width="150px" height={20} />
          <Skeleton variant="text" width="100px" height={20} />
        </Box>
      </Box>
      <Box mt={2}>
        <Skeleton variant="text" width="200px" height={24} />
        <Skeleton variant="text" width="300px" height={16} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton variant="rectangular" width={24} height={24} />
          <Skeleton variant="text" width="30px" height={20} />
        </Box>
        <Skeleton variant="text" width="100px" height={16} />
      </Box>
    </Box>
  );
};

export default FeedbackItemSkeleton;
