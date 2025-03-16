import { Box, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

type NavItem = {
  title: string;
  path: string;
};

const navItems: NavItem[] = [
  { title: "Home", path: "/" },
  { title: "Swapping", path: "/swapping" },
  { title: "Who we are", path: "/whoweare" },
  { title: "Gallery", path: "/gallery" },
];

const NavBar = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  function stringToColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function stringAvatar() {
    const initials = () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return `${letters[Math.floor(Math.random() * 26)]}${
        letters[Math.floor(Math.random() * 26)]
      }`;
    };

    return {
      sx: {
        bgcolor: stringToColor(),
      },
      children: initials(),
    };
  }

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
        backgroundColor: "rgba(0, 204, 255, 0.3)",
        color: "black",
        boxShadow: "10px 1px 4px -1px gray",
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
          backgroundColor: "rgba(0, 204, 255, 0)",
          color: "black",
          boxSizing: "border-box",
        }}
      >
        <Box component="img" src="/logo.svg" sx={{ height: "90px" }} />
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
            <Button
              key={item.title}
              variant="outlined"
              onClick={() => navigate(item.path)}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                }}
              >
                {item.title}
              </Typography>
            </Button>
          ))}
          {user ? (
            <Avatar {...stringAvatar()} />
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#25A18E",
                "&:hover": {
                  backgroundColor: "#26BBA8",
                },
                textTransform: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontWeight: 900,
              }}
              onClick={() => (window.location.href = "/login")}
            >
              <Typography variant="h6">Login/SignUp</Typography>
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
