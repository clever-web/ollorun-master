import { useState } from "react";
// @mui
import { Box, MenuItem, Stack } from "@mui/material";
// hooks
import useLocales from "../../../hooks/useLocales";
// components
import Image from "../../../components/Image";
import MenuPopover from "../../../components/MenuPopover";
import { IconButtonAnimate } from "../../../components/animate";

export default function UserPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    console.log("clicked")
    setOpen(event.currentTarget);
  };

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
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          width: 32,
          height: 32,
          padding: "0",
          ...(open && { bgcolor: "action.selected" }),
        }}
      >
        <Image
          disabledEffect
          src="/assets/images/user_icon.svg"
          sx={{ width: "32px", height: "32px" }}
          alt=""
        />
      </IconButtonAnimate>

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
