import React from 'react'
import { useNavigate } from "react-router";
import { m } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios'
import { toast } from 'react-toastify';
import InputMask from "react-input-mask";
import 'react-toastify/dist/ReactToastify.css';
// @mui
import {
    Box, Typography, TextField,
    Checkbox, FormControlLabel,
    FormLabel, FormGroup, FormControl,
} from "@mui/material"
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
import { MotionContainer, varFade } from '../components/animate';
import useLocales from "../hooks/useLocales";
import DefaultBtn from '../components/DefaultBtn';
import { btnStyle } from '../components/modal/ApplyModal';
// utils
import { validateEmail, validatePhone } from '../utils/validateForm';
// config
import { recaptchaKey, API_URL, CLIENT_JOB_EMAIL } from '../config';

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

export default function SignUpClientPage() {


    const [serviceList, setServiceList] = React.useState({
        node: false,
        masternode: false,
        pool: false,
    });
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [capchaResult, setCapchaResult] = React.useState("");

    const { translate, currentLang } = useLocales();
    const navigate = useNavigate();

    const handleChangeNode = () => {
        setServiceList({ ...serviceList, node: !serviceList.node })
    }

    const handleChangeMasterNode = () => {
        setServiceList({ ...serviceList, masternode: !serviceList.masternode })
    }

    const handleChangePoolMasterNode = () => {
        setServiceList({ ...serviceList, pool: !serviceList.pool })
    }

    const onChangeReCaptcha = (result) => {
        setCapchaResult(result)
    }

    const emptyForm = () => {
        setFName(""); setLName(""); setPhone(""); setEmail("");
        setServiceList({
            node: false,
            masternode: false,
            pool: false,
        });
        setCapchaResult("");
    }

    const validateForm = () => {
        if (fName && lName && phone && validatePhone(phone) && email && validateEmail(email) && capchaResult) return true;

        else {
            if (!fName)
                notifyToast("error", 'First Name is required!');
            if (!lName)
                notifyToast("error", 'Last Name is required!');
            if (!phone)
                notifyToast("error", 'Phone Number required!');
            if (!validatePhone(phone))
                notifyToast("error", 'Phone Number Format is not correct!');
            if (!email)
                notifyToast("error", 'Email is required!');
            if (!validateEmail(email))
                notifyToast("error", 'Email Format is not correct!');
            if (!capchaResult)
                notifyToast("error", 'Recapcha is required!');
            return false;
        }
    }

    const submitForm = async () => {
        if (validateForm()) {
            // submit form
            try {
                const response = await axios({
                    method: "post",
                    url: `${API_URL}/user/become-client`,
                    data: {
                        fName: fName,
                        lName: lName,
                        phone: phone,
                        email: email,
                        interest: serviceList,
                        toEmail: CLIENT_JOB_EMAIL,
                    },
                })
                if (!response.data.error) {
                    notifyToast("success", 'Successfully Registered!');
                    emptyForm();
                }
                else
                    notifyToast("error", 'Something Went Wrong!');
            } catch (error) {
                notifyToast("error", 'Something happened on server!');
            }
        }
        else
            notifyToast("error", 'Required Field Must Be Filled!');
    }

    return (
        <Page title="Sign Up | Client">
            {/* <Box>
                <Box> */}
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
                                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
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
                                    <Typography
                                        id="transition-modal-title"
                                        variant="h3"
                                        sx={{ textAlign: "center", color: "rgb(18, 29, 51)" }}
                                    >
                                        {translate("welcome")}
                                    </Typography>
                                </Box>
                                <Typography id="transition-modal-description" sx={{ mt: 2, textAlign: "center", color: "rgb(18, 29, 51)" }}>
                                    {translate("welcome_desc")}
                                </Typography>
                                <Box
                                    component="form"
                                    autoComplete="off"
                                // onSubmit={onSubmit}
                                >
                                    <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                                            <TextField
                                                required
                                                id="standard-required"
                                                label={translate("first_name")}
                                                variant="standard"
                                                placeholder='John'
                                                value={fName}
                                                onChange={(e) => setFName(e.target.value)}
                                                sx={{
                                                    width: "100%",
                                                    my: 5,
                                                    "& .MuiInput-input:focus": {
                                                        color: "#222"
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderBottomColor: "#40fbdc",
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                                            <TextField
                                                required
                                                id="standard-required"
                                                label={translate("last_name")}
                                                variant="standard"
                                                placeholder='Doe'
                                                value={lName}
                                                onChange={(e) => setLName(e.target.value)}
                                                sx={{
                                                    width: "100%",
                                                    my: 5,
                                                    "& .MuiInput-input:focus": {
                                                        color: "#222"
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderBottomColor: "#40fbdc",
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                                            <InputMask
                                                mask="+999 999 999 99 99 99"
                                                value={phone}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(data) => setPhone(data.target.value)}
                                            >
                                                {() => <TextField
                                                    required
                                                    variant="standard"
                                                    placeholder='+90 543 779 6464'
                                                    label={translate("phone_number")}
                                                    sx={{
                                                        width: "100%",
                                                        my: 5,
                                                        "& .MuiInput-input:focus": {
                                                            color: "#222"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderBottomColor: "#40fbdc",
                                                        }
                                                    }} />}
                                            </InputMask>
                                        </FormControl>
                                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                                            <TextField
                                                required
                                                id="standard-required"
                                                label={translate("email")}
                                                variant="standard"
                                                placeholder='johndoe@gmail.com'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                sx={{
                                                    width: "100%",
                                                    my: 5,
                                                    "& .MuiInput-input:focus": {
                                                        color: "#222"
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderBottomColor: "#40fbdc",
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl sx={{ my: 5 }} component="fieldset" variant="standard">
                                            <FormLabel component="legend" sx={{ mb: 5 }}>{translate("products_of_interest")}</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={serviceList.node} onChange={handleChangeNode} name="node" />
                                                    }
                                                    label={translate("node")}
                                                    sx={{
                                                        color: "rgb(18, 29, 51)",
                                                        "& .MuiFormControlLabel-label": {
                                                            color: "rgb(18, 29, 51) !important"
                                                        },
                                                        "& .Mui-checked": { color: "#40fbdc !important" }
                                                    }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={serviceList.masternode} onChange={handleChangeMasterNode} name="masternode" />
                                                    }
                                                    label={translate("masternode")}
                                                    sx={{
                                                        color: "rgb(18, 29, 51)",
                                                        "& .MuiFormControlLabel-label": {
                                                            color: "rgb(18, 29, 51) !important"
                                                        },
                                                        "& .Mui-checked": { color: "#40fbdc !important" }
                                                    }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={serviceList.pool} onChange={handleChangePoolMasterNode} name="pool" />
                                                    }
                                                    label={translate("pool_masternode")}
                                                    sx={{
                                                        color: "rgb(18, 29, 51)",
                                                        "& .MuiFormControlLabel-label": {
                                                            color: "rgb(18, 29, 51) !important"
                                                        },
                                                        "& .Mui-checked": { color: "#40fbdc !important" }
                                                    }}
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                    <Box component="p" sx={{ color: "red", mb: 3 }}>
                                        {translate("required_desc")}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "column", md: "row" },
                                            gap: { xs: 2 },
                                            justifyContent: "space-between",
                                            mt: 3,
                                            alignItems: "center"
                                        }}
                                    >
                                        <ReCAPTCHA
                                            sitekey={recaptchaKey}
                                            onChange={onChangeReCaptcha}
                                            hl={currentLang.value}
                                        />
                                        <Box onClick={submitForm} sx={{ width: { xs: "100%", sm: "auto" } }}>
                                            <DefaultBtn text={translate("send")}
                                                style={{ ...btnStyle }} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </BoxStyle>
                </m.div>
            </MotionContainer>

            {/* </Box>
            </Box> */}
        </Page>
    )
}

export const notifyToast = (type, subject) => {
    if (type === "success")
        toast.success(subject, {
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

    else
        toast.error(subject, {
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