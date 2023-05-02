import { useEffect, useState, useRef } from "react";
import { styled } from "@mui/system";
import Page from "../components/Page";
import HomeHero from "../components/home/HomeHero";
// import DescOztg from "../components/home/DescOztg";
import FinanceService from "../components/home/FinanceService";
// import Academy from "../components/home/Academy";
import AppStore from "../components/home/AppStore";
import IntroVideo from "../components/home/IntroVideo";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------
const ListStyle = styled(Box)({
  zIndex: "999",
  listStyle: "none",
  position: "fixed",
  top: "50%",
  transform: "translateY(-50%)",
  "& a": {
    width: "15px",
    height: "15px",
    display: "block",
    backgroundColor: "#fff",
    opacity: "0.3",
    borderRadius: "50%",
    margin: "24px 0",
  },
  "& li.active a": {
    opacity: "1",
  },
});

export default function HomePage() {
  const dotListConfig = [
    { state: "active", href: "#intro" },
    { state: "", href: "#services" },
    { state: "", href: "#academy" },
  ];
  const [dotList, setDotList] = useState(dotListConfig);
  const intro = useRef();
  const financeservice = useRef();
  const academy = useRef();

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = () => {
    let temp = [...dotList];
    if (window.pageYOffset >= intro.current.offsetTop - 20) {
      temp.map((e) => (e.state = ""));
      temp[0].state = "active";
    }
    if (window.pageYOffset >= financeservice.current.offsetTop - 20) {
      temp.map((e) => (e.state = ""));
      temp[1].state = "active";
    }
    // if (window.pageYOffset >= academy.current.offsetTop - 20) {
    //   temp.map((e) => (e.state = ""));
    //   temp[2].state = "active";
    // }
    setDotList(temp);
  };

  return (
    <Page title="Home page">
      <IntroVideo data={intro} />
      <HomeHero />
      {/* <DescOztg /> */}
      <FinanceService data={financeservice} />
      {/* <Academy data={academy} /> */}
      <AppStore />
      {/* <ListStyle sx={{ right: { xs: "8px", sm: "48px" } }}>
        {dotList.map((e, index) => (
          <li key={index} className={e.state}>
            <a href={e.href}></a>
          </li>
        ))}
      </ListStyle> */}
    </Page>
  );
}
