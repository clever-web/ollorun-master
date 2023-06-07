    // @mui
    import { Box } from "@mui/material";

    // ----------------------------------------------------------------------

    export default function CloseIcon() {
        return (
            <Box sx={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                zIndex: 2,
                cursor: "pointer",
            }}>
                <img src="/assets/images/closeicon.svg" alt="menuicon" />
            </Box >
        )
    }