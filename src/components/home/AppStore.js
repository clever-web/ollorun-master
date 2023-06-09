  import { m } from "framer-motion";
  import { useRef } from 'react';
  // @mui
  import { styled } from "@mui/material/styles";
  import { Box, Stack, Typography, Link, Grid } from "@mui/material";
  // components
  import { MotionViewport, varFade, varZoom } from "../animate";
  import useLocales from "../../hooks/useLocales";

  // ----------------------------------------------------------------------
  // const img1 = '/assets/images/appstore1.png'
  // const img2 = '/assets/images/appstore.svg'
  // const img3 = '/assets/images/googleplay.svg'
  // const img4 = '/assets/images/googleplay.png'

  // const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {
  //   const imageRef = useRef(null);

  //   return (
  //     <img 
  //       onMouseOver={() => {
  //         imageRef.current.src = secondaryImg;
  //       }}
  //       onMouseOut={() => {
  //         imageRef.current.src= primaryImg;
  //       }}
  //       src={primaryImg} 
  //       alt=""
  //       ref={imageRef}
  //     />
  //   )
  // }

  // const ImageChangeAppleOnMouseOver = () => {
  //   return (
  //     <div>
  //       <ImageToggleOnMouseOver
  //         primaryImg={img1}
  //         secondaryImg={img2}
  //         alt="AppleIcon" />
  //     </div>
  //   )
  // }

  // const ImageChangeGoogleOnMouseOver = () => {
  //   return (
  //     <div>
  //       <ImageToggleOnMouseOver
  //         primaryImg={img3}
  //         secondaryImg={img4}
  //         alt="GoogleIcon" />
  //     </div>
  //   )
  // }

  const BoxStyle = styled(Box)({
    width: "100%",
    padding: "48px 24px",
    backgroundColor: "#1E1E1E",
    "&>div": {
      maxWidth: "1248px",
      margin: "0 auto",
    },
  });

  const LinkStyle = styled(Link)({
  });
  // ----------------------------------------------------------------------

  export default function AppStore() {
    const { translate } = useLocales();

    return (
      <Box id="contact" sx={{ position: { xs: "relative", sm: "unset" }, top: { xs: "15vw", sm: "unset" } }}>
        <BoxStyle mx="auto">
          <MotionViewport>
            <Grid container sx={{ flexDirection: { xs: "column-reverse", sm: "inherit" } }}>
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="center"
                sx={{
                  mb: { xs: 4, md: 0 },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Box my="auto">
                  <m.div variants={varFade().inUp}>
                    <Typography
                      variant="h5"
                      dangerouslySetInnerHTML={{
                        __html: translate("appstore_section_text1"),
                      }}
                      sx={{ display: { xs: "none", sm: "block" } }}
                    />
                  </m.div>
                  <m.div variants={varFade().inUp}>
                    <Typography variant="h5" sx={{
                      display: { xs: "none", sm: "block" }
                    }}>
                      {translate("appstore_section_text2")}
                    </Typography>
                  </m.div>
                  <m.div variants={varFade().inUp}>
                    <Typography variant="body1" my={2} >
                      {translate("appstore_section_text3")}
                    </Typography>
                  </m.div>
                  <m.div variants={varFade().inUp} >
                    <Stack direction="row">
                      <LinkStyle
                        href="https://apps.apple.com/es/app/ozeety/id1539277391"
                        sx={{
                          mr: 2
                        }}
                        target="_blank"
                      >
                        <Box
                          component={m.div}
                          whileTap="tap"
                          whileHover={{
                            scale: 1.05
                          }}
                          sx={{
                            display: 'inline-flex'
                          }}
                        >
                          <Box
                            component="img"
                            src="/assets/images/appstore.svg"
                            width="220px"
                          />  
                        </Box>
                        
                        {/* <ImageChangeAppleOnMouseOver /> */}
                      </LinkStyle>
                      <LinkStyle
                        href="https://play.google.com/store/apps/details?id=ozeety.sapian.flash&hl=fr&gl=US"
                        target="_blank"
                      >
                        
                        <Box
                          component={m.div}
                          whileTap="tap"
                          whileHover={{
                            scale: 1.05
                          }}
                          sx={{
                            display: 'inline-flex'
                          }}
                        >
                          <Box
                            component="img"
                            src="/assets/images/googleplay.svg"
                            width="220px"
                            height="100%"
                          />
                        </Box>
                        {/* a[data-role]:hover, button[data-role]:hover {
                        transform: scale(1.05);
                        } */}
                        {/* <ImageChangeGoogleOnMouseOver/> */}
                      </LinkStyle>
                    </Stack>
                  </m.div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <m.div variants={varZoom().in}>
                  <Box
                    component="img"
                    src="/assets/images/app_store_logo.svg"
                    mx="auto"
                    width="400px"
                  ></Box>
                </m.div>
              </Grid>
            </Grid>
          </MotionViewport>
        </BoxStyle>
      </Box>
    );
  }
