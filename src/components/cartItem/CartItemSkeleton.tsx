import { Skeleton, Box } from "@mui/material";

const CartItemSkeleton = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      <Box display="flex" alignItems="center">
        <Skeleton
          variant="rectangular"
          width={100}
          height={100}
          sx={{ marginRight: 2 }}
        />
        <Box>
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>
      </Box>
      <Box>
        <Skeleton variant="text" width={30} height={50} />
      </Box>
    </Box>
  );
};

export default CartItemSkeleton;
