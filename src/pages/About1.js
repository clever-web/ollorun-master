// @mui
import { styled } from "@mui/material/styles";
import { Container, Box, Typography, Stack } from "@mui/material";
// components
import Page from "../components/Page";
import { AboutConfig } from "../components/home/HomeConfig";
import useLocales from "../hooks/useLocales";
// import { mt } from "date-fns/locale";
import { m, AnimatePresence } from 'framer-motion';
import { varFade, MotionViewport } from '../components/animate';
import { Height } from "@mui/icons-material";
// ----------------------------------------------------------------------

const BoxStyle = styled(Box)({
    maxWidth: "1530px",
    margin: "0px auto",
    position: "relative",
    padding: "50px 24px 0",
    h4: {
        color: "#ffffff",
        fontSize: "35px",
    },
    p: {
        color: "#828082"
    }
})

// ----------------------------------------------------------------------

const Service = ({ data, index, flexDirection }) => {
    const { translate } = useLocales();

    return (
        <Page title="Why Ollorun">
            <BoxStyle sx={{ padding: { xs: "10vw 24px 0", sm: "50px 24px 0" }, alignItems: 'center' }}>
                <Container component={MotionViewport} sx={{ maxWidth: '100% !important' }}>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: flexDirection, sm: "row" },
                                justifyContent: "space-between"
                            }}>
                            {index % 2 === 0 ?
                                <>
                                    <Box
                                        sx={{
                                            width: { sm: "45%", xs: "100%" }
                                        }}
                                    >
                                        <m.div variants={varFade({durationIn: 1}, {easeIn: 1}, {repeat: Infinity}).inLeft} >
                                            <img
                                                src={data.url}
                                                style={{
                                                    width: "100%"
                                                    // height: "100%"
                                                }}
                                                alt="URL"
                                            />
                                        </m.div>

                                    </Box>
                                    <Box sx={{
                                        width: { sm: "45%", xs: "100%" },
                                        ml: { xs: 2 }, mb: 10
                                    }}>
                                            <m.div variants={varFade().inRight}>
                                                <Box >
                                                    <Typography
                                                        variant="h2"
                                                        sx={{
                                                            mr: 10,
                                                            mb: 3,
                                                            color: "#ffffff",
                                                            fontSize: {md: '2rem', sm: '1rem'},
                                                            textAlign: 'left',
                                                            lineHeight: "1.7"
                                                            // backgroundImage: 'linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)',
                                                            // borderRadius: 4
                                                        }}
                                                    >
                                                        <span dangerouslySetInnerHTML={{ __html: translate(data.title) }} />
                                                    </Typography>
                                                </Box>
                                            </m.div>
                                            <Box component="p" sx={{
                                                fontSize: {md: '1.2rem', sm: '0.8rem', xl: '1.5rem'}
                                            }}>
                                                <span dangerouslySetInnerHTML={{ __html: translate(data.content) }} />
                                            </Box>
                                    </Box>
                                </>
                                :
                                <>

                                    <Box sx={{
                                        width: { sm: "45%", xs: "100%", md: "50%" }, ml: { xs: 2 }, mb: 10
                                    }}>
                                            <m.div variants={varFade().inLeft}>
                                                <Box>
                                                    <Typography
                                                        variant="h2"
                                                        sx={{
                                                            mb: 3,
                                                            color: "#ffffff",
                                                            fontSize: {md: '2rem', sm: '1.5rem'},
                                                            textAlign: 'left',
                                                            lineHeight: "1.7",
                                                            // backgroundImage: 'linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)',
                                                            borderRadius: 4
                                                        }}
                                                    >
                                                        <span dangerouslySetInnerHTML={{ __html: translate(data.title) }} />
                                                    </Typography>
                                                </Box>
                                            </m.div>
                                            <Box component="p" sx={{
                                                fontSize: {md: '1.2rem', sm: '0.8rem', xl: '1.5rem'}
                                                // textAlign: {sm: 'center'}
                                            }}>
                                                <span dangerouslySetInnerHTML={{ __html: translate(data.content) }} />
                                            </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: { sm: "45%", xs: "100%" }
                                        }}
                                    >
                                        <m.div variants={varFade().inRight}>
                                            <img
                                                src={data.url}
                                                style={{
                                                    width: "100%",
                                                }}
                                                alt="URL"
                                            />
                                        </m.div>
                                    </Box>
                                </>
                            }
                        </Box>
                    </Box>
                </Container>
            </BoxStyle >
        </Page>
    )
}

export default function About({ data }) {
    const { translate } = useLocales();
    return (
        <Box id="services" ref={data} sx={{ position: "relative", top: { xs: "unset", sm: "unset" }, mb: '10rem' }}>
            <BoxStyle sx={{ pb: { xs: 1, sm: 5 }, mb: '4rem' }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{
                    maxWidth: "1530px",
                    margin: "3rem",
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{width: {md: '60%', sm: '100%'},  display: {md: 'flex', sm: 'flex', xs: 'none'}}}>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: {sm: 'center', md: 'left'},
                            }}
                        >
                            <span dangerouslySetInnerHTML={{ __html: translate('why_description') }} />
                        </Typography>
                    </Box>
                    <Box sx={{ mt: {sm: '3rem', xs: '0'}, display: 'flex', width: {md: '30%', sm:'100%', xs: '100%'}}}>
                        <Box
                            component="img"
                            src="/assets/images/ollorun_label.svg"
                            alt="LABEL_OLLORUN_2023_Plan de travail 1.svg"
                            sx={{width:{md:'80%', sm: '60%', xs: '60%'}, m:'auto'}}
                        />
                    </Box>
                </Stack>
            </BoxStyle>
            <Service data={AboutConfig[0]} index={0} flexDirection="column" />
            <Service data={AboutConfig[1]} index={1} flexDirection="column-reverse" />
            <Service data={AboutConfig[2]} index={2} flexDirection="column" />
        </Box>
    )
}