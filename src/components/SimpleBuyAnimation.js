import { Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useLocales from "../hooks/useLocales";

export default function SimpleBuyAnimation({ isNavOpen }) {
  const { translate } = useLocales();

  return (

    <Box
      className="flip-card"
      onClick={() => window.open("https://flashxchanger.com", "_blank")}
      sx={{
        position: "fixed",
        bottom: "100px",
        right: "24px",
        transition: "opacity ease 500ms",
        opacity: "1",
        zIndex: "999",
        cursor: "pointer",
        display: isNavOpen ? "none !important" : "block !important"
      }}
    >
      <Box className="flip-card-inner" sx={{ maxWidth: "45px", width: "100%" }}>
        <Box
          className="flip-card-front"
          sx={{ p: 0.5, borderRadius: "50%", }}
        >
          <Box
            component="img"
            src="/assets/images/oztg_hexagon.svg"
            alt="ollorun_animation_img"
            sx={{ width: "40px" }}
          />
        </Box>
        <Box
          className="flip-card-back"
          sx={{ p: 0.5, borderRadius: "50%" }}
        >
          <ShoppingCartIcon sx={{ fontSize: "34px", color: "#222" }} />
        </Box>
      </Box>
      <Box component="p" className="simple-animation-text">
        {translate("buy_oztg")}
      </Box>
    </Box>
  );
}
