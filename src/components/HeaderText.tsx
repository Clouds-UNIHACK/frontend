import { Box, Typography } from "@mui/material";

interface HeaderTextProps {
  page: string;
}

export const HeaderText : React.FC<HeaderTextProps> = ({ page }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingY: "24px",
        minHeight: "auto",
        height: "auto",
      }}
    >
      <Box sx={{ maxWidth: "1800px" }}>
        <Typography
          variant="h4"
          align="left"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: { xs: "1.2rem", md: "1.6rem", lg: "60px" },
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: "#008eb3", // Light green color
          }}
        >
          {page}
        </Typography>
      </Box>
    </Box>
  );
};
