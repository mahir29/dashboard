import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 76,
        p: 3,
        marginLeft: 8,
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
