import { Box, Typography, Button } from "@mui/material";
import getAccessToken from "../api/utils";
import { useEffect } from "react";

type NavItem = {
  title: string;
  path: string;
};

const navItems: NavItem[] = [
  { title: "Home", path: "/" },
  { title: "Swapping", path: "/swapping" },
  { title: "Who we are", path: "/whoweare" },
  { title: "My profile", path: "/myprofile" },
  { title: "Log In/ Sign Up", path: "/login" },
];

const NavBar = () => {
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      navItems[navItems.length - 1] = { title: "Log Out", path: "/logout" };
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "112px",
        backgroundColor: "#9FFFCB",
        color: "black",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1800px",
          paddingX: { xl: "200px", sm: "100px" },
          height: "112px",
          backgroundColor: "#9FFFCB",
          color: "black",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h3"
          sx={{
            color: "#004E64",
            fontFamily: "Poppins sans-serif",
            fontWeight: "bold",
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
          {navItems.map((item) =>
            item.title === "Log In/ Sign Up" ? (
              <Button
                key={item.title}
                variant="contained"
                sx={{
                  backgroundColor: "#25A18E",
                  "&:hover": {
                    backgroundColor: "#26BBA8",
                  },
                  textTransform: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                }}
                onClick={() => (window.location.href = "/login")}
              >
                <Typography variant="h6">{item.title}</Typography>
              </Button>
            ) : (
              <Button
                key={item.title}
                variant="outlined"
                onClick={() => (window.location.href = item.path)}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "normal",
                  }}
                >
                  {item.title}
                </Typography>
              </Button>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
