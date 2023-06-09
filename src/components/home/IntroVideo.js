    // @mui
    import { styled } from "@mui/material/styles";
    import { Box } from "@mui/material";
    // ----------------------------------------------------------------------

    const BoxStyle = styled(Box)({
        maxWidth: "1288px",
        position: "relative",
        // padding: "0 20px",
        margin: "0 0 0 0",
        zIndex: 1,
    })

    export default function IntroVideo({ data }) {

        return (
            <BoxStyle id="intro" ref={data}>
                <Box sx={{ position: "absolute", width: "100%" }}>
                    <div className="homepage-video" style={{ width: "100%" }}>
                        {/* <video
                            style={{
                                width: "100vw",
                                display: { xs: "none", sm: "block" }
                            }}
                            muted
                            loop
                            autoPlay
                            src="/assets/video/introduction.mp4"
                        /> */}
                        <Box
                            component="video"
                            sx={{
                                width: "100vw",
                                display: { xs: "none", sm: "block" }
                            }}
                            muted
                            loop
                            autoPlay
                            src="/assets/video/introduction_new.mp4"
                        />

                        <Box
                            component="div"
                            sx={{
                                background: "linear-gradient(to bottom, #183c3c, #000000)",
                                height: 250,
                                display: { xs: "block", sm: "none" }
                            }}
                        >

                        </Box>
                    </div>
                </Box>
            </BoxStyle>
        )
    }