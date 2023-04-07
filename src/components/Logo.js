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
    <Box>
      <img src="/logo/logo_full.svg" height="auto" alt="logo" style={{ width: "10vw", minWidth: "90px" }} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
