import { useState } from "react";
// @mui
import { Box, MenuItem, Stack } from "@mui/material";
// hooks
import useLocales from "../../../hooks/useLocales";
// components
import Image from "../../../components/Image";
import MenuPopover from "../../../components/MenuPopover";
import ApplyModal from "../../../components/modal/ApplyModal";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   zIndex: 9999,
// };

export default function RegisterPopover({ isNav }) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(0);

  const handleModalOpen = () => {
    setModalOpen(true);
    setOpen(false);
  }
  const handleModalClose = (event, reason) => {
    setOpen(false);
    if (reason === "backdropClick") return false;
    setModalOpen(false);
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStarted = (index) => {
    setModalType(index);
    handleModalOpen();
  }

  const topBarContent = [
    // {
    //   name: "client",
    //   icon: "/assets/images/client.svg",
    //   mailto: "mailto:commercial@ollorun.com",
    // },
    {
      name: "advisor",
      icon: "/assets/images/advisor.svg",
      mailto: "mailto:commercial@ollorun.com",
    },
  ];

  const { translate } = useLocales();

  return (
    <>
      {/* <Box
        component="p"
        sx={{
          background: "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)",
          border: !isNav ? "1px #ffffff solid" : "1px #000000 solid",
          borderRadius: "0.75rem",
          padding: !isNav ? { md: "0.5rem 2rem", xs: "0.5rem 1rem" } : "0.5rem 1rem",
          color: "#000000 !important",
          transition: "all 1s ease",
          cursor: "pointer",
          "&:hover": {
            opacity: "0.8"
          },
          textAlign: "center",
        }}
        // onClick={handleOpen}
        // key={index}
        onClick={() => getStarted(2)}
        // if the key is 1, the client modal opened.
      >
        {translate("sign_up")}
      </Box> */}

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
            <MenuItem key={index} onClick={() => getStarted((index + 1))}>
              <Box
                component="a"
                // href={data.mailto}
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

      <Box sx={{zIndex: 10000, overflow: "scroll"}}>
        <ApplyModal modalOpen={modalOpen} handleModalClose={handleModalClose} modalType={modalType} />
      </Box>
    </>
  );
}
