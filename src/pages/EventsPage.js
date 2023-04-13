import { useState, useEffect } from "react";
import axios from "axios";
// @mui
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
import { m } from "framer-motion";
import { Box, Typography } from "@mui/material";
// components
import { MotionContainer, varFade } from "../components/animate";
import useLocales from "../hooks/useLocales";
import EventList from "../components/events/EventList";
import { notifyToast } from "../components/modal/ApplyModal";
import { API_URL } from "../config";

const BoxStyle = styled(Box)({
    width: "1280px",
    maxWidth: "100%",
    minHeight: "100vh",
    margin: "0 auto",
    padding: "80px 24px 0",
    h4: {
        color: "#fff",
    },
    p: {

    },
    ur: {
        // paddingInlineStart: ""
    }
})
// ----------------------------------------------------------------------

export default function EventsPage() {
    const [eventList, setEventList] = useState([]);
    const { translate } = useLocales();

    const getEventList = async () => {
        const response = await axios({
            method: "post",
            url: `${API_URL}/event/get`,
        });

        if (response.data.status === 200) {
            setEventList(response.data.data);
        }
        else {
            console.log(response, "response");
            notifyToast("error", response.data.msg);
        }
    }

    useEffect(() => {
        getEventList();
    }, [])

    return (
        <Page title="Events">
            <MotionContainer>
                <m.div variants={varFade().in}>
                    <BoxStyle sx={{ py: 8 }}>
                        <Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: { xs: 1, sm: 10 },
                                // borderBottom: "1px solid white",
                                alignItems: "center",
                                pb: { xs: 3, sm: 3 }
                            }}>
                                <Box>
                                    {/* <Typography
                                        dangerouslySetInnerHTML={{
                                            __html: translate("events_header"),
                                        }}
                                    /> */}
                                    <Typography
                                        sx={{
                                            // mt: 1,
                                            // fontSize: "clamp(1.5rem, 2vw, 2rem)",
                                            // mb: 1
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: translate("event_title"),
                                        }}
                                    />
                                </Box>
                                {/* <Box
                                    component="img"
                                    src="/logo/LABEL_OLLORUN.svg"
                                    sx={{
                                        // width: { xs: "20%", sm: "25%" },
                                        maxWidth: "100px",
                                        width: { xs: "20%", sm: "auto" }
                                    }}
                                /> */}
                            </Box>
                            {/* <Box sx={{ borderBottom: "1px solid white", mt: 5, mb: 15 }}>
                                <Typography
                                    sx={{ mt: 1, fontSize: "2rem", mb: 1 }}
                                    dangerouslySetInnerHTML={{
                                        __html: translate("events_presentations"),
                                    }}
                                />
                            </Box> */}
                        </Box>
                        <EventList eventList={eventList} />
                        {/* <Box component="h2" textAlign="center">
                            {translate("to_be_announced")}
                        </Box> */}
                    </BoxStyle>
                </m.div>
            </MotionContainer>
        </Page>
    )
}