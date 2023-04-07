import React from 'react'

// @mui
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
import { m } from "framer-motion";
import { Box, Typography, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// component
import { MotionContainer, varFade } from "../components/animate";
import useLocales from "../hooks/useLocales";
import Advisor from '../components/certified-partners/Advisor';
import ConsultingOffice from '../components/certified-partners/ConsultingOffice';

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

export default function CertifiedPartnerPage() {
    const [value, setValue] = React.useState('1');
    const { translate } = useLocales();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page title="Certified Partners">
            <MotionContainer>
                <m.div variants={varFade().in}>
                    <BoxStyle sx={{ py: 8 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                dangerouslySetInnerHTML={{
                                    __html: translate("contact_one_certified_partners"),
                                }}
                            />
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

                        <Box sx={{ mt: 3 }}>
                            {/* Tab */}
                            <TabContext value={value}>
                                <Box sx={{ borderColor: "#FFFFFF" }}>
                                    <TabList
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                        sx={{
                                            borderColor: "white",
                                            "& .Mui-selected": { color: "#ffffff !important" }
                                        }}
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor: "#40fbdc"
                                            }
                                        }}
                                    >
                                        <Tab label={translate("advisors")} value="1" />
                                        <Tab label={translate("consulting_offices")} value="2" sx={{ textTransform: "unset" }} />
                                    </TabList>
                                </Box>
                                <Box sx={{ my: 3 }}>
                                    <TabPanel value="1">
                                        <Advisor />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <ConsultingOffice />
                                    </TabPanel>
                                </Box>
                            </TabContext>
                        </Box>
                    </BoxStyle>
                </m.div>

            </MotionContainer >
        </Page >
    )
}
