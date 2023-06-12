    // @mui
    import { Box } from "@mui/material";
    import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

    // ----------------------------------------------------------------------

    export default function MenuIcon() {
        return (
            <Box sx={{display: "flex", alignItems: "center"}}>
                {/* <img src="/assets/images/menuicon.svg" alt="menuicon" /> */}
                <KeyboardDoubleArrowRightIcon sx={{width: "32px", height: "32px"}}/>
            </Box>
        )
    }