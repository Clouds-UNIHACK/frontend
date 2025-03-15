import { Box, Typography, Button } from "@mui/material";

type NavItem = {
  title: string;
};

const navItems: NavItem[] = [
  { title: "Home" },
  { title: "Swapping" },
  { title: "Who we are" },
  { title: "My profile" },
  { title: "Log In/ Sign Up" }
];

const NavBar = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "1080px",
        height: "112px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      {/* Logo */}
      <Typography
        variant="h3"
        sx={{
          color: "red",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "bold"
        }}
      >
        Swapp

      </Typography>
      {/* Navigation items */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {navItems.map((item) => (
          item.title === "Log In/ Sign Up" ? (
            <Button
              key={item.title}
              variant="contained"
              sx={{
                backgroundColor: "green",
                '&:hover': {
                  backgroundColor: "darkgreen",
                },
                textTransform: "none",
                borderRadius: "8px",
                padding: "8px 16px"
              }}
            >
              <Typography variant="h6">
                {item.title}
              </Typography>
            </Button>
          ) : (
            <Button key={item.title} variant="outlined">
              <Typography 
                variant="body1" 
                sx={{
                  fontWeight: "normal"
                }}
              >
                {item.title}
              </Typography>
            </Button>
          )
        ))}
      </Box>
    </Box>
  );
};

export default NavBar;
