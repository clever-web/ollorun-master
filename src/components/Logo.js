import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  type: PropTypes.string,
};

export default function Logo({ disabledLink = false, type }) {

  const logo = (
    <Box sx={{width: {xl: '10vw', md: '10vw', sm: '20vw', xs: '30vw'}}}>
      <img src="/logo/logo_full.svg" height="auto" alt="logo" style={{ minWidth: "150px" }} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
