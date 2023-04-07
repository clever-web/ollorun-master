import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Grid, Stack, Typography } from "@mui/material";
// components
import { MotionViewport, varFade, varFlip, varZoom } from "../animate";
import useLocales from "../../hooks/useLocales";
import ServiceConfig from "./HomeConfig";
// ----------------------------------------------------------------------

const BoxStyle = styled(Box)({
  maxWidth: "1288px",
  position: "relative",
  padding: "160px 24px 0",
  margin: "-100px auto",
  zIndex: "2",
});

export default function Service({data}) {
  const { translate } = useLocales();

  return (
    <BoxStyle id="services" ref={data} >
      <Box
        sx={{
          position: "relative",
          "&>img": { position: "absolute" },
        }}
      >
        <MotionViewport>
          <Box>
            <m.div variants={varFade().inUp}>
              <Typography
                variant="h2"
                sx={{
                  mb: 10,
                  color: "#fff",
                }}
                textAlign="center"
              >
                {translate("service_title1")}&nbsp;
                <span className="grad_text">{translate("service_title2")}</span>
              </Typography>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                }}
                textAlign="center"
                dangerouslySetInnerHTML={{
                  __html: translate("service_desc"),
                }}
              />
            </m.div>
          </Box>
        </MotionViewport>
        <MotionViewport>
          <Grid container my={4} justifyContent="center">
            <Grid item md={6} p={2}>
              <Box mt={2}>
                <m.div variants={varFade().inUp}>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      color: "#fff",
                    }}
                  >
                    {translate(ServiceConfig[0].title)}
                  </Typography>
                </m.div>
                {ServiceConfig[0].desc.map((data, index) => (
                  <m.div key={index} variants={varFade().inUp}>
                    <Stack direction="row" mb={3}>
                      <Box
                        component="img"
                        src={data.icon}
                        width="52px"
                        sx={{ mr: 2, mb: "auto" }}
                      />
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: translate(data.text),
                        }}
                      />
                    </Stack>
                  </m.div>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="end"
              alignItems="center"
              p={2}
            >
              <m.div variants={varFlip().inY}>
                <Box
                  component="img"
                  width="460px"
                  src={ServiceConfig[0].image}
                  sx={{ ml: "auto" }}
                />
              </m.div>
            </Grid>
          </Grid>
        </MotionViewport>
        <MotionViewport>
          <Grid container my={4} justifyContent="center">
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="start"
              alignItems="center"
              sx={{ order: { xs: 2, md: 1 } }}
              p={2}
            >
              <m.div variants={varFade().inUp}>
                <Box position="relative">
                  <Box
                    component="img"
                    width="460px"
                    src={ServiceConfig[1].image}
                    sx={{ position: "relative", ml: "auto", zIndex: "2" }}
                  />
                  <Box
                    component="img"
                    src="/assets/images/1-01.svg"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "-74%",
                      width: "600px",
                      maxWidth: "initial",
                      transform: "translateY(-50%)",
                      zIndex: "1",
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                </Box>
              </m.div>
            </Grid>
            <Grid item md={6} sx={{ order: 1 }} p={2}>
              <Box mt={2}>
                <m.div variants={varFade().inUp}>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      color: "#fff",
                    }}
                  >
                    {translate(ServiceConfig[1].title)}
                  </Typography>
                </m.div>
                {ServiceConfig[1].desc.map((data, index) => (
                  <m.div key={index} variants={varFade().inUp}>
                    <Stack direction="row" mb={3}>
                      <Box
                        component="img"
                        src={data.icon}
                        width="52px"
                        sx={{ mr: 2, mb: "auto" }}
                      />
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: translate(data.text),
                        }}
                      />
                    </Stack>
                  </m.div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </MotionViewport>
        <MotionViewport>
          <Grid container my={4} justifyContent="center" p={2}>
            <Grid item md={6} p={2}>
              <Box mt={2}>
                <m.div variants={varFade().inUp}>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      color: "#fff",
                    }}
                  >
                    {translate(ServiceConfig[2].title)}
                  </Typography>
                </m.div>
                {ServiceConfig[2].desc.map((data, index) => (
                  <m.div key={index} variants={varFade().inUp}>
                    <Stack direction="row" mb={3}>
                      <Box
                        component="img"
                        src={data.icon}
                        width="52px"
                        sx={{ mr: 2, mb: "auto" }}
                      />
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: translate(data.text),
                        }}
                      />
                    </Stack>
                  </m.div>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="end"
              alignItems="center"
              p={2}
              position="relative"
            >
              <m.div variants={varFade().inUp}>
                <Box position="relative">
                  <Box
                    component="img"
                    src={ServiceConfig[2].image}
                    width="460px"
                    sx={{ ml: "auto", position: "relative", zIndex: "2" }}
                  />
                  <Box
                    component="img"
                    src="/assets/images/2-02.svg"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: "-74%",
                      width: "600px",
                      maxWidth: "initial",
                      transform: "translateY(-50%)",
                      zIndex: "1",
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                </Box>
              </m.div>
            </Grid>
          </Grid>
        </MotionViewport>
        <MotionViewport>
          <Grid container my={4} justifyContent="center">
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="start"
              alignItems="center"
              sx={{ order: { xs: 2, md: 1 } }}
              p={2}
            >
              <m.div variants={varZoom().in}>
                <Box
                  component="img"
                  width="460px"
                  src={ServiceConfig[3].image}
                  sx={{ ml: "auto" }}
                />
              </m.div>
            </Grid>
            <Grid item md={6} sx={{ order: 1 }} p={2}>
              <Box mt={2}>
                <m.div variants={varFade().inUp}>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      color: "#fff",
                    }}
                  >
                    {translate(ServiceConfig[3].title)}
                  </Typography>
                </m.div>
                {ServiceConfig[3].desc.map((data, index) => (
                  <m.div key={index} variants={varFade().inUp}>
                    <Stack direction="row" mb={3}>
                      <Box
                        component="img"
                        src={data.icon}
                        width="52px"
                        sx={{ mr: 2, mb: "auto" }}
                      />
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: translate(data.text),
                        }}
                      />
                    </Stack>
                  </m.div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </MotionViewport>
        <MotionViewport>
          <Grid container my={4} justifyContent="center">
            <Grid item md={6} p={2}>
              <Box mt={2}>
                <m.div variants={varFade().inUp}>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      color: "#fff",
                    }}
                  >
                    {translate(ServiceConfig[4].title)}
                  </Typography>
                </m.div>
                {ServiceConfig[4].desc.map((data, index) => (
                  <m.div key={index} variants={varFade().inUp}>
                    <Stack direction="row" mb={3}>
                      <Box
                        component="img"
                        src={data.icon}
                        width="52px"
                        sx={{ mr: 2, mb: "auto" }}
                      />
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: translate(data.text),
                        }}
                      />
                    </Stack>
                  </m.div>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="end"
              alignItems="center"
              p={2}
            >
              <m.div variants={varFlip().inY}>
                <Box
                  component="img"
                  width="460px"
                  src={ServiceConfig[4].image}
                  sx={{ ml: "auto" }}
                />
              </m.div>
            </Grid>
          </Grid>
        </MotionViewport>
      </Box>
    </BoxStyle>
  );
}
