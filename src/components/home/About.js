  import { m } from "framer-motion";
  // @mui
  import { styled } from "@mui/material/styles";
  import { Box, Stack, Typography } from "@mui/material";
  // components
  import { MotionViewport, varFade, varZoom } from "../animate";
  import useLocales from "../../hooks/useLocales";
  // ----------------------------------------------------------------------

  const BoxStyle = styled(Box)({
    maxWidth: "1288px",
    position: "relative",
    padding: "160px 24px 0",
    margin: "auto",
  });

  // ----------------------------------------------------------------------

  export default function About({data}) {
    const { translate } = useLocales();
    return (
      <BoxStyle id="about" ref={data}>
        <Box
          sx={{
            position: "relative",
            "&>img": { position: "absolute" },
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", lg: "inherit" }}
          >
            <Box>
              <MotionViewport>
                <m.div variants={varFade().inUp}>
                  <Typography
                    variant="h1"
                    sx={{
                      position: "relative",
                      mb: 6,
                      color: "#fff",
                      zIndex: "10",
                      // fontSize: "80px"
                    }}
                    textAlign="center"
                  >
                    {translate("about_title1")}&nbsp;
                    <span className="grad_text">{translate("about_title2")}</span>
                  </Typography>
                </m.div>
                <m.div variants={varFade().inUp}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 10,
                      // color: "#fff",
                      fontSize: '1.3rem',
                      lineHeight: "1.7"
                    }}
                    dangerouslySetInnerHTML={{
                      __html: translate("about_desc"),
                    }}
                  />
                </m.div>

                <m.div variants={varZoom().in}>
                  <Box sx={{ overflow: "hidden" }}>
                    <Box
                      component="img"
                      className="ollorunText"
                      src="/assets/images/ollorun.png"
                      sx={{ mt: "16px" }}
                    />
                  </Box>
                </m.div>
              </MotionViewport>
            </Box>
          </Stack>
        </Box>
      </BoxStyle>
    );
  }
