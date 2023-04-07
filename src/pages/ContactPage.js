import React from 'react'
import { useNavigate } from "react-router";
import { m } from "framer-motion";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import ContactComponent from '../components/contact/ContactComponent';
// import ComplianceServiceComponent from '../components/contact/ComplianceComponent'
// import TechnicalServiceComponent from '../components/contact/TechnicalServiceComponent'
// import CommercialComponent from '../components/contact/CommercialComponent';
import { MotionContainer, varFade } from "../components/animate";
import useLocales from "../hooks/useLocales";

const BoxStyle = styled(Box)({
    width: "1280px",
    maxWidth: "100%",
    minHeight: "80vh",
    margin: "0 auto 100px",
    padding: "80px 24px 0",
    h4: {
        color: "#222",
    },
    h1: {
        color: "#222",
        textAlign: "center",
        fontWeight: "900",
        fontSize: "clamp(1.5rem, 3vw, 3rem)",
    },
    h3: {
        textAlign: "center",
    }
})

// ----------------------------------------------------------------------

export default function ContactPage() {
    const { translate } = useLocales();
    const navigate = useNavigate();

    return (
        <Page title="Support">
            <MotionContainer>
                <m.div variants={varFade().in}>
                    <BoxStyle sx={{ py: 8 }}>
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "80%" },
                                background: "#ffffff",
                                minHeight: "80vh",
                                m: "auto",
                                borderRadius: 3,
                                padding: "2.5rem",
                                position: "relative",
                            }}
                        >
                            <Box>
                                <Box
                                    component="img"
                                    src='/assets/images/closeicon.svg'
                                    onClick={() => navigate("/")}
                                    sx={{
                                        position: "absolute",
                                        right: "20px",
                                        top: "20px",
                                        cursor: "pointer"
                                    }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
                                    <Typography
                                        id="transition-modal-title"
                                        variant="h3"
                                        sx={{ textAlign: "center", color: "rgb(18, 29, 51)" }}
                                    >
                                        {translate("how_can_we_help")}
                                    </Typography>
                                </Box>
                                <Typography id="transition-modal-description" sx={{ mt: 2, textAlign: "center", color: "rgb(18, 29, 51)" }}>
                                    {translate("ollorun_support")}
                                </Typography>
                            </Box>
                            <Box>
                                <ServiceList />
                            </Box>
                        </Box>
                    </BoxStyle>
                </m.div>
            </MotionContainer>
        </Page>
    )
}

// const _technical_service = [
//     {
//         label: "pack_activation",
//         value: "11"
//     },
//     {
//         label: "technical_problem",
//         value: "12"
//     }
// ]
// const _compliance_service = [
//     {
//         label: "refund",
//         value: "21",
//     },
//     {
//         label: "ethics_quality",
//         value: "22",
//     }
// ]
// const _commercial_service = [
//     {
//         label: "business_information",
//         value: "31",
//     },
//     {
//         label: "new_partnership",
//         value: "32",
//     }
// ]

const ServiceList = () => {
    const [parentValue, setParentValue] = React.useState("1");
    const [childValue, setChildValue] = React.useState("11");
    // const [childrenValue, setChildrenValue] = React.useState(_technical_service);
    const [isChanged, setIsChanged] = React.useState(false);

    // const onChangeParent = (e) => {
    //     setParentValue(e.target.value);
    //     switch (e.target.value) {
    //         case "1":
    //             setChildValue("11");
    //             setChildrenValue(_technical_service);
    //             break;
    //         case "2":
    //             setChildValue("21");
    //             setChildrenValue(_compliance_service);
    //             break;
    //         case "3":
    //             setChildValue("31");
    //             setChildrenValue(_commercial_service);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    React.useEffect(() => {
        setIsChanged(true);
    }, [parentValue, childValue])

    // const onChangeChildService = (e) => {
    //     setChildValue(e.target.value)
    // }

    return (
        <Box>
            <Box>
                {/* <Box>
                    <Box sx={{ mb: { xs: 4, sm: "auto" } }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                value={parentValue}
                                onChange={onChangeParent}
                            >
                                <FormControlLabel
                                    value="1"
                                    control={<Radio sx={{ color: "#40fbdc !important" }} />}
                                    label={translate("technical")}
                                    sx={{
                                        "& .MuiFormControlLabel-label": {
                                            color: "#222",
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    value="2"
                                    control={<Radio sx={{ color: "#40fbdc !important" }} />}
                                    label={translate("compliance")}
                                    sx={{
                                        "& .MuiFormControlLabel-label": {
                                            color: "#222",
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    value="3"
                                    control={<Radio sx={{ color: "#40fbdc !important" }} />}
                                    label={translate("commercial")}
                                    sx={{
                                        "& .MuiFormControlLabel-label": {
                                            color: "#222",
                                        }
                                    }}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                value={childValue}
                                onChange={onChangeChildService}
                            >
                                {childrenValue.length && childrenValue.map((each, index) => (
                                    <FormControlLabel
                                        key={`_children_service_${each.value}`}
                                        value={each.value}
                                        control={<Radio sx={{ color: "#40fbdc !important" }} />}
                                        label={translate(each.label)}
                                        sx={{
                                            "& .MuiFormControlLabel-label": {
                                                color: "#222",
                                            }
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box> */}
            </Box>
            <Box>
                {/* {
                    childValue === "11" ?
                        <TechnicalServiceComponent isPack={true} isChanged={isChanged} />
                        :
                        childValue === "12" ?
                            <TechnicalServiceComponent isPack={false} isChanged={isChanged} />
                            :
                            childValue === "21" ?
                                <ComplianceServiceComponent isRefund={true} isChanged={isChanged} />
                                :
                                childValue === "22" ?
                                    <ComplianceServiceComponent isRefund={false} isChanged={isChanged} />
                                    :
                                    childValue === "31" ?
                                        <CommercialComponent isBusinessInformation={true} isChanged={isChanged} />
                                        :
                                        childValue === "32" ?
                                            <CommercialComponent isBusinessInformation={false} isChanged={isChanged} />
                                            : null
                } */}
                <ContactComponent />
            </Box>
        </Box>
    )
}
