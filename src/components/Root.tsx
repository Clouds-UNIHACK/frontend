import { Box } from "@mui/material";
import React from "react";

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#fff8de",
        background: "linear-gradient(180deg, #FFFFFF 0%, #DDF3FF 100%)",
        overflow: "scroll",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default Root;
