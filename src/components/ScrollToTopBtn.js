    import { IconButtonAnimate } from "./animate";
    import Iconify from "./Iconify";
    import { useEffect, useState } from "react";
    import { Box } from "@mui/material";

    export default function ScrollToTopBtn({isNavOpen}) {
      const [showButton, setShowButton] = useState(false);
      const scrollTopHandler = () => {
        window.scrollTo(0, 0);
      };

      useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
      },);
      const handleVisibleButton = () => {
        const position = window.pageYOffset;
        if (position > 100) setShowButton(true);
        else setShowButton(false);
      };

      return (
        <Box
          sx={{
            position: "fixed",
            bottom: "30px",
            right: "24px",
            transition: "opacity ease 500ms",
            opacity: `${showButton ? "1" : "0"}`,
            zIndex: "999",
            display: isNavOpen ? "none !important" : "block !important"
          }}
        >
          <IconButtonAnimate onClick={scrollTopHandler}>
            <Iconify
              icon="bi:arrow-up-circle"
              sx={{ fontSize: "40px", color: "#e1b559" }}
            />
          </IconButtonAnimate>
        </Box>
      );
    }
