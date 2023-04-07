import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import ReCAPTCHA from "react-google-recaptcha"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

// import ReCAPTCHA from "react-google-recaptcha"
// import FileReaderInput from 'react-file-reader-input';
// import InputMask from "react-input-mask";
import axios from 'axios'
// import { m } from 'framer-motion';
import CryptoJS from 'crypto-js';

// @mui
import { styled } from '@mui/material/styles';
import { Box, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// components
import Page from '../components/Page';
import DefaultBtn from '../components/DefaultBtn';
// import { MotionContainer, varBounce } from '../components/animate';
// utils
import { notifyToast } from '../components/modal/ApplyModal';
import useLocales from '../hooks/useLocales';
import { validateEmail } from '../utils/validateForm';
import { ContactBtnStyle } from '../components/contact/contact.style';
// config
import { recaptchaKey, SECRET_KEY, BASIC_URL, API_URL } from '../config';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    width: "1280px",
    maxWidth: "100%",
    margin: '0 auto 100px',
    minHeight: '80vh',
    padding: "80px 24px 0",
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
    // padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SaveEventPage() {

    const [datetime, setDatetime] = React.useState(dayjs());
    const [eventName, setEventName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [capchaResult, setCapchaResult] = React.useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const _pathname = location.pathname;
    const { translate, currentLang } = useLocales();

    const onChangeReCaptcha = (result) => {
        setCapchaResult(result);
    }

    const emptyForm = () => {
        setDatetime(dayjs()); setEventName(""); setAddress("");
        setEmail(""); setCapchaResult("");
    }

    const validateForm = () => {
        if (datetime && eventName && email && validateEmail(email) && capchaResult)
            return true;
        else return false;
    }

    const submitForm = async () => {

        const _resp_address = await axios({
            method: "post",
            url: "https://api.ollorun.com/check-address"
        });

        if (_resp_address.status === 200 && _resp_address.data.data.length) {
            if (validateForm()) {
                // submit form
                try {
                    const response = await axios({
                        method: "post",
                        url: `${API_URL}/event/save`,
                        data: {
                            datetime: datetime.format("MMMM D, YYYY hh:mm A"),
                            eventName: eventName,
                            address: address,
                            email: email,
                            latitude: _resp_address.data.data[0].latitude,
                            longitude: _resp_address.data.data[0].longitude
                        },
                    })
                    if (!response.data.error && response.data.status === 200) {
                        notifyToast("success", 'Successfully saved!');
                        emptyForm();
                    }
                    else {
                        console.log(response)
                        notifyToast("error", response.data.msg);
                    }
                } catch (error) {
                    console.log(error)
                }

            }
            else {
                if (!datetime)
                    notifyToast("error", 'Date Time is required!');
                if (!eventName)
                    notifyToast("error", 'Event Name is required!');
                if (!email)
                    notifyToast("error", 'Email is required!');
                if (!validateEmail(email))
                    notifyToast("error", 'Email Format is not correct!');
                if (!capchaResult)
                    notifyToast("error", 'Recapcha is required!');
            }
        }
        else {
            notifyToast("error", 'Professional address is not correct!');
        }

    }

    if (!decryptPath(_pathname)) {
        window.location.href = BASIC_URL + "/404";
    }

    return (
        <Page title="Save Event">
            <ContentStyle>
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{
                        width: { xs: "100%", sm: "80%" },
                        background: "#ffffff",
                        minHeight: "60vh",
                        m: "auto",
                        borderRadius: 3,
                        position: "relative",
                        px: 6,
                        pb: 10,
                    }}
                >
                    <Box
                        component="h1"
                        textAlign={"center"}
                        sx={{
                            my: 5,
                            color: "#222",
                            pt: 5
                        }}
                    >
                        {translate("post_new_event")}
                    </Box>
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
                    <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label={translate("date_time")}
                                    value={datetime}
                                    onChange={(e) => setDatetime(e)}
                                    renderInput={(params) => <TextField {...params} sx={{
                                        width: "100%",
                                        my: 5,
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor: "#40fbdc",
                                        },
                                        "& .MuiInputBase-input:focus": {
                                            color: "#222",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderTop: "none",
                                            borderLeft: "none",
                                            borderRight: "none",
                                            borderRadius: 0,
                                        },
                                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderBottomColor: "#40fbdc !important",
                                        }
                                    }}
                                    />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                            <TextField
                                required
                                id="standard-required"
                                label={translate("event_name")}
                                variant="standard"
                                placeholder='Ollorun Q3 2023 Conference'
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
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
                            <TextField
                                required
                                id="standard-required"
                                label={translate("event_address")}
                                variant="standard"
                                placeholder='45 Albemarle Street, London, W1S 4JL'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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

                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 2 },
                        justifyContent: "space-between",
                        mt: 3,
                        pb: { xs: 3, md: 0 },
                        alignItems: "center",
                    }}>
                        <ReCAPTCHA
                            sitekey={recaptchaKey}
                            hl={currentLang.value}
                            onChange={onChangeReCaptcha}
                            style={{ borderRadius: "16px" }}
                        />
                        <Box onClick={submitForm} sx={{ width: { xs: "100%", sm: "auto" } }}>
                            <DefaultBtn
                                text={translate("post")}
                                style={ContactBtnStyle}
                            />
                        </Box>
                    </Box>

                </Box>
            </ContentStyle>
        </Page>
    )
}


const decryptPath = (pathname) => {
    const _index_saveadvisor = pathname.indexOf("savenewevent");
    const _key_substring = pathname.substring(_index_saveadvisor + 13);

    const _msg = pathname.split("/")[2];
    const ciphertext = _key_substring.substring(_key_substring.indexOf("/") + 1);

    if (ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const _decrypted_msg = bytes.toString(CryptoJS.enc.Utf8);

        return _msg / 2 === Number(_decrypted_msg);
    }
    else return false;
}
