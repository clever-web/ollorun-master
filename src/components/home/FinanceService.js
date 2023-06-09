    import { useState } from "react";
    // @mui
    import { styled } from "@mui/material/styles";
    import { Box, Typography, Stack } from "@mui/material";
    import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
    // components
    import { ClientModal, DefinitionModal } from "../modal/ApplyModal";
    import { FinanceServiceConfig } from "./HomeConfig";
    import useLocales from "../../hooks/useLocales";
    import { ArrowCircleRight } from "@mui/icons-material";
    // ----------------------------------------------------------------------

    const BoxStyle = styled(Box)({
        maxWidth: "1288px",
        margin: "20px auto",
        position: "relative",
        padding: "50px 24px 0",
    })

    const Service = ({ data, index, flexDirection }) => {
        const [modalOpen, setModalOpen] = useState(false);
        const { translate } = useLocales();

        const handleModalClose = (event, reason) => {
            if (reason === "backdropClick") return false;
            setModalOpen(false);
        }

        return (
            <BoxStyle sx={{ padding: { xs: "10vw 24px 0", sm: "50px 24px 0" }, margin: { xs: "10vw auto", sm: "20px auto" } }}>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: flexDirection, sm: "row" },
                            // mt: 15,
                            justifyContent: "space-between"
                        }}>
                        {index % 2 === 0 ?
                            <>
                                <Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Box
                                            className="finance-service-list"
                                            onClick={() => setModalOpen(true)}
                                            sx={{
                                                mb: 5,
                                                gap: 0.5,
                                            }}
                                        >
                                            <Box sx={{ p: "0.05rem 1.25rem", display: "flex", alignItems: "center", gap: 1 }}>
                                                {index === 0 ?
                                                    <Box component="img" className="finance-service-img" src="/assets/icons/nodes/Node.svg" width="1.5rem" />
                                                    :
                                                    index === 1 ?
                                                        <Box component="img" className="finance-service-img" src="/assets/icons/nodes/Masternode.svg" width="1.5rem" />
                                                        : <Box component="img" className="finance-service-img" src="/assets/icons/nodes/Pool Masternodes.svg" width="1.5rem"/>
                                                }
                                                <Box
                                                    className="finance-service-btn-text"
                                                    component="p"
                                                    sx={{
                                                        textTransform: "capitalize",
                                                        fontSize: "clamp(1.2rem, 1vw, 1.5rem)",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    {translate(data.btn)}
                                                </Box>
                                                <KeyboardDoubleArrowRightIcon className="finance-service-icon" sx={{ color: "#858552" }} />

                                            </Box>
                                        </Box>
                                    </Box>
                                    {data.content.map((each, index) => (
                                        <Stack direction="row" mb={3} alignItems="center" key={`service_${index}`}>
                                            <Box
                                                component="img"
                                                width="50px"
                                                height="50px"
                                                sx={{ mr: 2 }}
                                                src={each.icon}
                                            />
                                            <Box component="p" sx={{
                                                my: 2,
                                                fontSize: "clamp(1.2rem, 1vw, 1.5rem)"
                                            }}>
                                                {translate(each.text)}
                                            </Box>
                                        </Stack>
                                    ))
                                    }
                                </Box>
                                <Box
                                    sx={{
                                        width: { sm: "40%", xs: "100%" },
                                        maxWidth: "500px",
                                        textAlign: "right",
                                        display: "flex",
                                        mt: {xl: '-100px', md: '-100px', sm: '-40px', xs: '-25px'}
                                    }}
                                >
                                    <img
                                        id="solution-img"
                                        src={data.url}
                                        // muted
                                        // loop
                                        // autoPlay
                                        style={{
                                            width: "100%"
                                        }}
                                        alt="URL"
                                    />
                                </Box>
                            </>
                            :
                            <>
                                <Box
                                    sx={{
                                        width: { sm: "40%", xs: "100%" },
                                        maxWidth: "500px",
                                        textAlign: "right",
                                        display: "flex",
                                        mt: { sm: -5, xs: 0 }
                                    }}
                                >
                                    <img
                                        src={data.url}
                                        style={{
                                            width: "100%",
                                            marginTop: '-25px'
                                        }}
                                        alt="URL"
                                    />
                                </Box>
                                <Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Box
                                            className="finance-service-list"
                                            onClick={() => setModalOpen(true)}
                                            sx={{
                                                mb: 5,
                                                gap: 0.5,
                                            }}
                                        >
                                            <Box sx={{ p: "0.05rem 1.25rem", display: "flex", alignItems: "center", gap: 1 }}>
                                                {index === 0 ?
                                                    <Box component="img" className="finance-service-img" src="/assets/icons/nodes/Node.svg" width="1.5rem" />
                                                    :
                                                    index === 1 ?
                                                        <Box component="img" className="finance-service-img" src="/assets/icons/nodes/Masternode.svg" width="1.5rem" />
                                                        : <Box component="img" className="finance-service-img" src="/assets/icons/nodes/Pool Masternodes.svg" width="1.5rem" />
                                                }
                                                <Box
                                                    className="finance-service-btn-text"
                                                    component="p"
                                                    sx={{
                                                        textTransform: "capitalize",
                                                        fontSize: "clamp(1.2rem, 1vw, 1.5rem)",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    {translate(data.btn)}
                                                </Box>
                                                <KeyboardDoubleArrowRightIcon className="finance-service-icon" sx={{ color: "#858552" }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    {data.content.map((each, index) => (
                                        <Stack direction="row" mb={3} alignItems="center" key={`service_${index}`}>
                                            <Box
                                                component="img"
                                                width="50px"
                                                height="50px"
                                                sx={{ mr: 2 }}
                                                src={each.icon}
                                            />
                                            <Box component="p" sx={{
                                                my: 2,
                                                fontSize: "clamp(1.2rem, 1vw, 1.5rem)",
                                            }}>
                                                {translate(each.text)}
                                            </Box>
                                        </Stack>
                                    ))
                                    }
                                </Box>
                            </>
                        }
                    </Box>
                    <Box>
                    </Box>
                </Box>
                <DefinitionModal data={data} modalOpen={modalOpen} handleModalClose={handleModalClose} />
            </BoxStyle >
        )
    }

    export default function FinanceService({ data }) {
        const { translate } = useLocales();
        const [modalOpen, setModalOpen] = useState(false);

        const handleModalClose = (event, reason) => {
            if (reason === "backdropClick") return false;
            setModalOpen(false);
        }

        return (
            <Box id="services" ref={data} sx={{ position: "relative", top: { xs: "15vw", sm: "unset" } }}>
                <BoxStyle sx={{ pb: { xs: 1, sm: 5 } }}>
                    <Box
                        component="h1"
                        sx={{
                            // textTransform: "capitalize",
                            fontSize: "clamp(1.5rem, 3vw, 3rem)",
                            color: "#ffffff"
                        }}
                    >
                        {translate("our_solutions")}
                    </Box>
                </BoxStyle>

                <Service data={FinanceServiceConfig[0]} index={0} flexDirection="column" />
                <Service data={FinanceServiceConfig[1]} index={1} flexDirection="column-reverse" />
                <Service data={FinanceServiceConfig[2]} index={2} flexDirection="column" />

                {/* <BoxStyle sx={{ pb: { xs: 1, sm: 3 } }}>
                    <Typography
                        sx={{
                            fontSize: "clamp(1.5rem, 3vw, 3rem)"
                        }}
                    >
                        <span dangerouslySetInnerHTML={{__html: translate("defi_text")}}/>
                    </Typography>
                </BoxStyle> */}
                {/* <BoxStyle sx={{ pb: { xs: 1, sm: 5 } }}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{
                        maxWidth: "1200px",
                        margin: "0px auto",
                        mb: 5,
                        backgroundImage: 'linear-gradient(to right, #000000, #05a386)',
                        borderRadius: 4
                    }}>
                        <Stack direction="row" mb={3} my={2} alignItems="center">
                            <Box
                                component="img"
                                width="50px"
                                height="50px"
                                sx={{ mr: 2, width: '20px', height: '20px' }}
                                src="/assets/images/service_sec1_ico5.png"
                            />
                            <Box component="p" sx={{
                                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                                color: '#ffffff',
                            }}>
                                {translate("banner_text1")}
                            </Box>
                        </Stack>
                        <Stack direction="row" mb={3} my={2} alignItems="center" onClick={() => setModalOpen(true)}>
                            
                            <Box component="p" sx={{
                                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                                color: '#ffffff',
                                mr: 2,
                                cursor: 'pointer'
                            }}>
                                {translate("banner_text2")}
                            </Box>
                            <Box>
                                <ArrowCircleRight sx={{mr: 2, cursor: 'pointer'}} />
                            </Box>
                        </Stack>
                    </Stack>
                </BoxStyle> */}
                <ClientModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
            </Box>
        )
    }