import { Box, Typography, Button } from "@mui/material";

type NavItem = {
  title: string;
};

const navItems: NavItem[] = [
  { title: "Home" },
  { title: "About" },
  { title: "Login" },
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
      <Typography variant="h3">Swapp</Typography>
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
          <Button variant="outlined">
            <Typography variant="h6" key={item.title}>
              {item.title}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default NavBar;
