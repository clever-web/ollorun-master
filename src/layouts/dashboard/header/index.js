import { useState } from "react";
import { useNavigate } from "react-router";
// @mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { m } from "framer-motion";
// components
import Logo from "../../../components/Logo";
import LanguagePopover from "./LanguagePopover";
import useLocales from "../../../hooks/useLocales";
import LoginPopover from "./LoginPopover";
import RegisterPopover from "./RegisterPopover";
import MenuIcon from "../../../components/MenuIcon";
import CloseIcon from '../../../components/CloseIcon';

const varSmall = {
  hover: { scale: 1.05 }
};


const ResponsiveAppBar = ({ setIsNavbarOpen }) => {
  const [navOpen, setNavOpen] = useState("");

  const navigate = useNavigate();

  const handleOpenNavMenu = () => {
    setIsNavbarOpen(true);
    setNavOpen(true);
  };

  const handleCloseNavMenu = (url) => {
    setIsNavbarOpen(false);
    setNavOpen(false);
    url ? navigate(url) : console.log("");
  };

  const { translate } = useLocales();

  const pages = [
    {
      text: "why_ollorun",
      url: "/about",
    },
    // {
    //   text: "certified_partners",
    //   url: `/partners`,
    // },
    {
      text: "our_advisors",
      url: `/partners`,
    },
    {
      text: "events",
      url: "/events",
    },
    {
      text: "support",
      url: "/support",
    },
  ];

  const TypographyStyle = styled(Typography)({
    transition: "color ease 500ms",
    fontSize: "18px",
    margin: "0 12px",
    "&:hover": {
      color: "#e1b559",
    },
  });

  const OverlayBox = styled("div")({
    position: "fixed",
    left: "0",
    top: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "999",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  });

  return (
    <AppBar
      position="relative"
      sx={{
        height: "80px",
        backgroundColor: "#000",
        boxShadow: "1px solid #1e1e1e",
        // top: {
        //   xs: "50px", sm: "40px"
        // },
        top: "40px",
        zIndex: 2
      }}
    >
      <OverlayBox
        sx={{ display: `${navOpen ? "block" : "none"}` }}
        onClick={() => handleCloseNavMenu()}
      />
      <nav className={navOpen ? "navbar active" : "navbar"}>
        <Box
          sx={{
            m: "48px auto 22px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Logo type="single_black" />
        </Box>
        <Box onClick={() => handleCloseNavMenu()} >
          <CloseIcon />
        </Box>
        {pages.map((page, index) =>
          <Box
            key={index}
            component="a"
            sx={{
              py: 2,
              px: 1,
              color: "white",
              display: "block",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
            onClick={() => handleCloseNavMenu(page.url)}
          >
            <TypographyStyle variant="body1">
              {translate(page.text)}
            </TypographyStyle>
          </Box>
        )}
        <Divider />
        <Box
          sx={{
            width: "100%",
            px: 1,
            py: 2,
            gap: 1,
            display: "flex",
            flexDirection: "row",
            gap: { xs: 2, sm: 1 },
            position: "absolute",
            bottom: 30,
            justifyContent: "space-between",
            boxShadow: "rgb(240 242 247) 0px -1px 0px 0px, rgb(0 0 0 / 5%) 0px -0.25rem 0.875rem 0px",
          }}
        >
          <Box sx={{ width: { xs: "50%", sm: "50%" } }}>
            <LoginPopover isNav={true} />
          </Box>
          <Box sx={{ width: { xs: "50%", sm: "50%" } }}>
            <RegisterPopover isNav={true} />
          </Box>
        </Box>
      </nav>
      <Container maxWidth="xl" sx={{ my: "auto", px: 0, py: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <Logo type="single" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
            <Logo type="single" />
          </Box>
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            {pages.map((page, index) =>
              <Box
                key={index}
                component="a"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
                onClick={() => navigate(page.url)}
              >
                <TypographyStyle variant="body1" textAlign="center" color="white">
                  {translate(page.text)}
                </TypographyStyle>
              </Box>
            )}
          </Box>
          <Stack direction="row" alignItems="center">
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Box
                component={m.div}
                whileTap="tap"
                whileHover="hover"
                variants={varSmall}
                // variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
                sx={{
                  display: 'inline-flex'
                }}
              >
                <LoginPopover />
              </Box>
              <Box
                component={m.div}
                whileTap="tap"
                whileHover="hover"
                variants={varSmall}
                // variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
                sx={{
                  display: 'inline-flex'
                }}
              >
                <RegisterPopover />
              </Box>
              {/* <LoginPopover />
              <RegisterPopover /> */}
            </Box>
            <LanguagePopover />

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" }, ml: 1 }}
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
