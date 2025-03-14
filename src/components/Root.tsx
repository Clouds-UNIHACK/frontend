import { Box } from "@mui/material";
import React from "react";

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default Root;
