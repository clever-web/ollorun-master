import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios'
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import { Input } from "@mui/material";
// components
import { ClientModal } from "../modal/ApplyModal";
import { MotionViewport, varFade } from "../animate";
// import DefaultBtn from "../DefaultBtn";
import WhiteBtn from "../WhiteBtn";
import useLocales from "../../hooks/useLocales";
import { validateEmail } from "../../utils/validateForm";
// CONFIG
import { API_URL } from "../../config";
import TelegramModal from "../modal/TelegramModal";
// ----------------------------------------------------------------------

const BoxStyle = styled(Box)({
    maxWidth: "1288px",
    margin: "auto",
    position: "relative",
    padding: "0 24px 0",
    // marginTop: "-100px",
    // height: "clamp(580px, 800px, 100vh)",
});

// ----------------------------------------------------------------------

export default function HomeHero() {
    const [emailForNewsletter, setEmailForNewsLetter] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [tModalOpen, setTModalOpen] = useState(false);

    const { translate } = useLocales();

    const onRegisterForNewsLetter = async () => {
        if (validateEmail(emailForNewsletter)) {
            const response = await axios({
                method: "post",
                url: `${API_URL}/email/add`,
                data: {
                    email: emailForNewsletter
                }
            })

            if (response.status === 200) {
                if (response.data.status === "success")
                    toast.success('Successfully Registered!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        zIndex: 10000,
                    });
                else if (response.data.status === "error") {

                    let _error = response.data.error ? (response.data.error.response ?
                        JSON.parse(response.data.error.response.text).message :
                        "Something went wrong") : "Something went wrong";
                    toast.error(_error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        zIndex: 10000,
                    });
                }
                setEmailForNewsLetter("");
            }
            else {
                toast.error('Something Went Wrong!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    zIndex: 10000,
                });
            }
        }
        else {
            toast.error('Email Required!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                zIndex: 10000,
            });
        }
    }

    const handleModalClose = (event, reason) => {
        if (reason === "backdropClick") return false;
        setModalOpen(false);
    }

    const tHandleModalClose = (event, reason) => {
        if (reason === "backdropClick") return false;
        setTModalOpen(false);
    }

    useEffect(() => {
        window.onbeforeunload = (e) => {
            localStorage.removeItem("telegram_popup");
        };
        if (localStorage.getItem("telegram_popup")) {
            setTModalOpen(false);
        }
        else {
            localStorage.setItem("telegram_popup", true);
            setTModalOpen(true);
        }
    }, [])

    return (
        <Box id="home">
            <div style={{ position: "absolute", width: "100%", background: `linear-gradient(#0c0b0e, #000000)`, }}></div>
            <BoxStyle sx={{
                // height: { xs: "auto", lg: "100vh" },
                height: "56.25vw",
                minHeight: { xs: "unset", sm: "365px" },
            }}>
                <MotionViewport sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            pt: "10%",
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", lg: "row" }}
                            justifyContent="space-between"
                            alignItems={{ xs: "inherit" }}
                            sx={{ position: "relative", zIndex: "2" }}
                        >
                            <Box maxWidth="650px">
                                <m.div variants={varFade().inUp}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            color: "#fff",
                                            mb: "4vw",
                                            lineHeight: "1.5",
                                            // fontSize: "clamp(1.2rem, 4vw, 3rem) !important",
                                            fontSize: "clamp(1.5rem, 3vw, 3rem) !important",
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: translate("hero_title2"),
                                        }}
                                    />
                                </m.div>
                            </Box>
                        </Stack>
                    </Box>
                    <Box sx={{ zIndex: 2, position: { xs: "relative", sm: "relative" }, bottom: { xs: "unset", sm: 0 }, pr: "1rem" }}>
                        <Link to="/about">
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
                                <WhiteBtn
                                    text={"why_ollorun"}
                                    icon="arrowright"
                                    style={{
                                        px: {md: 5, sm: 3, xs: 3},
                                        py: {md: 1, xs: 0.6},
                                        backgroundImage: 'linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)',
                                        border: "none",
                                        fontSize: {md: '1.5rem', xs: '1rem'},
                                        boxShadow: "none",
                                        "&:hover": {
                                            background: "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)"
                                        }
                                    }}
                                />
                            </Box>
                        </Link>
                    </Box>
                    <Box sx={{ zIndex: 2, position: { xs: "absolute", sm: "relative" }, bottom: { xs: "unset", sm: 0 }, pr: "1.5rem" }}>
                        <Box sx={{ mt: "10%" }}>
                            <Box
                                component={"p"}
                                sx={{
                                    color: "white",
                                    fontSize: "clamp(0.9rem, 1vw, 1.5rem) !important"
                                }}
                            >
                                {translate("subscribe_newsletter")}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    mt: 3,
                                    gap: { xs: 2, sm: 0 },
                                    bottom: { xs: "" }
                                }}
                            >
                                <Box sx={{ width: { xs: "75%", sm: "auto" } }}>
                                    <Input
                                        type="email"
                                        disableUnderline={true}
                                        placeholder={translate("your_email_address")}
                                        value={emailForNewsletter}
                                        onChange={e => setEmailForNewsLetter(e.target.value)}
                                        sx={{
                                            background: "rgba(56, 58, 62, 0.5)",
                                            px: 4,
                                            py: 0.2,
                                            width: { xs: "100%", sm: "25vw" },
                                            caretColor: "#ffffff",
                                            color: "#ffffff",
                                            borderRadius: "0.75rem",
                                            "&.Mui-focused": {
                                                color: "#FFFFFF !important"
                                            }
                                        }}
                                    />
                                </Box>
                                {/* <Box onClick={onRegisterForNewsLetter}> */}
                                <Box
                                    onClick={onRegisterForNewsLetter}
                                    component={m.div}
                                    whileTap="tap"
                                    whileHover={{
                                        scale: 1.05
                                    }}
                                    sx={{
                                        display: 'inline-flex'
                                    }}
                                >
                                    <WhiteBtn
                                        text={"go"}
                                        icon="arrowright"
                                        style={{
                                            width: {
                                                xs: "70%", sm: "20vw"
                                            },
                                            maxWidth: { xs: "70%", sm: "100px" },
                                            ml: { xs: 0, sm: 2 },
                                            background: "unset",
                                            fontSize: "clamp(0.75rem, 0.75vw, 1rem)",
                                            boxShadow: "none",
                                            "&:hover": {
                                                background: "unset"
                                            }
                                        }}
                                    />
                                </Box>
                                {/* </Box> */}
                            </Box>
                        </Box>
                    </Box>
                </MotionViewport>
                <ClientModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
                {/* <ToastContainer sx={{zIndex: 100}}/> */}
                {/* <TelegramModal modalOpen={tModalOpen} handleModalClose={tHandleModalClose} /> */}
            </BoxStyle>
        </Box>
    );
}

