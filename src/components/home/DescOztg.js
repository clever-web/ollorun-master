// @mui
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// components
import { OztgNewCard } from "./oztgcoin/OztgCard";
import useLocales from "../../hooks/useLocales";
// ----------------------------------------------------------------------

const BoxStyle = styled(Box)({
    maxWidth: "1288px",
    position: "relative",
    padding: "20px 24px 0",
    margin: "auto",
    // display: "flex",
    justifyContent: "space-between",
    // zIndex: 3,
})

export default function DescOztg() {
    const { translate } = useLocales();
    return (
        <Box sx={{ zIndex: { xs: 2, sm: "unset" }, position: { xs: "relative", sm: "unset" }, top: { xs: "15vw", sm: "unset" } }}>
            <BoxStyle sx={{ display: { xs: "block", sm: "flex" }, mb: "6vw" }}>
                <Box>
                    <Typography
                        variant="h2"
                        className="blockchain-tech-pos-title"
                        sx={{
                            // fontSize: "clamp(1.2rem, 4vw, 3rem) !important",
                            fontSize: "clamp(1.5rem, 3vw, 3rem) !important",
                            color: "#ffffff"
                        }}
                        dangerouslySetInnerHTML={{
                            __html: translate("blockchain_technology_pos"),
                        }}
                    />
                </Box>
                <Box sx={{
                    width: { xs: "100%", sm: "40%", md: "30%", lg: "25%" },
                    maxWidth: "300px"
                }}>
                    <OztgNewCard />
                    {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1, justifyContent: "end" }}>
                    <Box className="view-on-flashxchange-text" component="a" target="_blank" href="https://flashxchanger.com" sx={{ mr: 1, fontWeight: "900" }}>
                        {translate("view_on_flashxchange")}
                    </Box>
                    <ArrowForwardIcon />
                </Box> */}
                </Box>
            </BoxStyle>
        </Box>
    )
}