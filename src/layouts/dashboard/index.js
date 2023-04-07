import { useState } from 'react'
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
// config
import { NAVBAR } from "../../config";
// components
import DashboardHeader from "./header";
import Footer from "./footer";
import ScrollToTopBtn from "../../components/ScrollToTopBtn";
import SimpleBuyAnimation from "../../components/SimpleBuyAnimation";
import HeaderBecomeAdvisor from "./HeaderBecomeAdvisor";
// ----------------------------------------------------------------------

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})(({ collapseClick, theme }) => ({
  backgroundColor: "#000",
  flexGrow: 1,
  // paddingTop: "100px",
  position: "relative",
  zIndex: 1,
  top: "40px",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    // width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
  // [theme.breakpoints.up("xs")]: {
  //   top: "50px",
  // },
  // [theme.breakpoints.up("sm")]: {
  //   top: "40px",
  // },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Box
      sx={{
        // display: { lg: "flex" },
        minHeight: { lg: 1 },
      }}
    >
      <HeaderBecomeAdvisor />
      <DashboardHeader setIsNavbarOpen={setIsNavOpen}/>
      <MainStyle>
        <Outlet />
        <Footer />
      </MainStyle>
      <ScrollToTopBtn isNavOpen={isNavOpen}  />
      <SimpleBuyAnimation isNavOpen={isNavOpen} />
    </Box>
  );
}
