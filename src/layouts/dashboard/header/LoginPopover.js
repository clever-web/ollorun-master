import { useState } from "react";
// @mui
import { Box, MenuItem, Stack } from "@mui/material";
// hooks
import useLocales from "../../../hooks/useLocales";
// components
import Image from "../../../components/Image";
import MenuPopover from "../../../components/MenuPopover";

export default function LoginPopover({ isNav }) {
  const [open, setOpen] = useState(null);

  // const handleOpen = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleClose = () => {
    setOpen(null);
  };


  const topBarContent = [
    {
      path: "https://backoffice.ollorun.com/login/client",
      name: "client",
      icon: "/assets/images/client.svg",
    },
    {
      path: "https://backoffice.ollorun.com/",
      name: "advisor",
      icon: "/assets/images/advisor.svg",
    }
  ];
  const { translate } = useLocales();
  return (
    <>
      <Box
        component="a"
        href="https://backoffice.ollorun.com"
        target="_blank"
        sx={{
          display: "inherit",
          border: !isNav ? "1px #ffffff solid" : "1px #000000 solid",
          padding: !isNav ? { md: "0.5rem 2rem", xs: "0.5rem 1rem" } : "0.5rem 2rem",
          borderRadius: "0.75rem",
          marginRight: !isNav ? "1rem" : "0",
          cursor: "pointer",
          color: !isNav ? "#ffffff" : "#000000 !important",
          textAlign: "center",
        }}
        // onClick={handleOpen}
      >
        {translate("login")}
      </Box>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Stack spacing={0.75}>
          {topBarContent.map((data, index) => (
            <MenuItem key={index}>
              <Box
                component="a"
                href={data.path}
                target="_blank"
                sx={{
                  color: "#000",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  disabledEffect
                  src={data.icon}
                  sx={{ width: "22px", height: "22px", mr: 1, opacity: "0.8" }}
                  alt=""
                />
                {translate(data.name)}
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
