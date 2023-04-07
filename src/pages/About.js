// @mui
import { styled } from "@mui/material/styles";
import { Container, Box, Typography, Stack } from "@mui/material";
// components
import { AboutConfig } from "../components/home/HomeConfig";
import useLocales from "../hooks/useLocales";
// import { mt } from "date-fns/locale";
import { m, AnimatePresence } from 'framer-motion';
import { varFade, MotionViewport } from '../components/animate';
// ----------------------------------------------------------------------

const BoxStyle = styled(Box)({
    maxWidth: "1530px",
    margin: "0px auto",
    position: "relative",
    padding: "50px 24px 0",
})

// ----------------------------------------------------------------------

const Service = ({ data, index, flexDirection }) => {
    const { translate } = useLocales();

    return (
        <BoxStyle sx={{ padding: { xs: "10vw 24px 0", sm: "50px 24px 0" }, alignItems: 'center' }}>
            <Container component={MotionViewport} sx={{maxWidth:'100% !important'}}>
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
                                    <m.div variants={varFade().inLeft} animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
                                        <img
                                            src={data.url}
                                            style={{
                                                width: "100%",
                                            }}
                                            alt="URL"
                                        />
                                    </m.div>

                                </Box>
                                <Box sx={{
                                    width: { sm: "45%", xs: "100%" },
                                    ml: { xs: 5 }, mb: 10
                                }}>
                                    <m.div variants={varFade().inRight} animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
                                        <Box >
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    mb: 3,
                                                    mr: 10,
                                                    color: "#ffffff",
                                                    fontSize: '1.3rem',
                                                    textAlign: 'center',
                                                    lineHeight: "1.7",
                                                    // backgroundImage: 'linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)',
                                                    borderRadius: 4
                                                }}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: translate(data.title) }} />
                                            </Typography>
                                        </Box>
                                        <Box component="p" sx={{
                                            fontSize: "clamp(1rem, 2vw, 1.5rem)"
                                        }}>
                                            <span dangerouslySetInnerHTML={{ __html: translate(data.content) }} />
                                        </Box>
                                    </m.div>
                                </Box>
                            </>
                            :
                            <>

                                <Box sx={{
                                    width: { sm: "45%", xs: "100%" }, ml: { xs: 5 }, mb: 10
                                }}>
                                    <m.div variants={varFade().inLeft} animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}>

                                        <Box>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    mb: 3,
                                                    mr: 10,
                                                    color: "#ffffff",
                                                    fontSize: '1.3rem',
                                                    textAlign: 'center',
                                                    lineHeight: "1.7",
                                                    // backgroundImage: 'linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)',
                                                    borderRadius: 4
                                                }}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: translate(data.title) }} />
                                            </Typography>
                                        </Box>
                                        <Box component="p" sx={{
                                            fontSize: "clamp(1rem, 2vw, 1.5rem)"
                                        }}>
                                            <span dangerouslySetInnerHTML={{ __html: translate(data.content) }} />
                                        </Box>
                                    </m.div>
                                </Box>
                                <Box
                                    sx={{
                                        width: { sm: "45%", xs: "100%" }
                                    }}
                                >
                                    <m.div variants={varFade().inRight} animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}> 
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
    )
}

export default function About({ data }) {
    const { translate } = useLocales();
    return (
        <Box id="services" ref={data} sx={{ position: "relative", top: { xs: "15vw", sm: "unset" } }}>
            <BoxStyle sx={{ pb: { xs: 1, sm: 5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src="/assets/images/LABEL_OLLORUN_2023_Plan de travail 1.svg"
                        alt="LABEL_OLLORUN_2023_Plan de travail 1.svg"
                        sx={{ width: '15%' }}
                    />
                </Box>
                {/* <Typography
                    variant="h2"
                    sx={{
                        mb: 3,
                        color: "#ffffff",
                        fontSize: '1.3rem',
                        lineHeight: "1.7",
                        color: '#ca64ea',
                        textAlign: 'center',
                        mt: 3,
                    }}
                >
                    {translate('why_ollorun')}
                </Typography> */}
                <Typography
                    variant="body2"
                    sx={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '1.5em',
                        mt: 5
                    }}
                >
                    <span dangerouslySetInnerHTML={{ __html: translate('why_description') }} />
                </Typography>
            </BoxStyle>
            <Service data={AboutConfig[0]} index={0} flexDirection="column" />
            <Service data={AboutConfig[1]} index={1} flexDirection="column-reverse" />
            <Service data={AboutConfig[2]} index={2} flexDirection="column" />
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{
                maxWidth: "1530px",
                margin: "0px auto",
                mt: 10
            }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ width: '1.5em', height: '1.5em', borderRadius: '50%', backgroundColor: '#ca64ea', ml: 9 }}></Box>
                    <Box sx={{ width: '1.5em', height: '1.5em', borderRadius: '50%', backgroundColor: '#0e0b64', ml: 1, mr: 10 }}></Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: '1.2em'
                        }}
                    >
                        www.ollorun.com
                    </Typography>
                </Box> */}
                <Box sx={{ width: '100%', height: '0.1em', alignItems: 'center', backgroundColor: 'white', borderRadius: "20%" }}></Box>
            </Stack>
        </Box>
    )
}