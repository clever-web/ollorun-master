import React from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import { ToastContainer } from 'react-toastify';
import InputMask from "react-input-mask";
import axios from 'axios'
// @mui
import { Box, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
// components
import DefaultBtn from '../DefaultBtn';
// utils
import { notifyToast, checkFileType } from '../modal/ApplyModal';
import useLocales from '../../hooks/useLocales';
import { validateEmail, validatePhone } from '../../utils/validateForm';
import { ContactBtnStyle } from './contact.style';
// config
import { recaptchaKey, API_URL, CONTACT_EMAIL } from '../../config';

// ----------------------------------------------------------------------

const CommercialComponent = ({ isBusinessInformation, isChanged }) => {
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [capchaResult, setCapchaResult] = React.useState("");

    const { translate, currentLang } = useLocales();

    const onChangeReCaptcha = (result) => {
        setCapchaResult(result);
    }

    const emptyForm = () => {
        setFName(""); setLName(""); setUserName(""); setEmail("");
        setPhone(""); setMessage(""); setCapchaResult("");
    }

    const validateForm = () => {
        if (fName && lName && email &&
            validateEmail(email) && validatePhone(phone) &&
            (isBusinessInformation ? username : !username) &&
            message && capchaResult
        )
            return true;
        else return false;
    }

    const submitForm = async () => {
        if (validateForm()) {
            // submit form
            try {
                const response = await axios({
                    method: "post",
                    url: `${API_URL}/contact/commercial`,
                    data: {
                        type: isBusinessInformation ? "business_info" : "new_partnership",
                        fName: fName,
                        lName: lName,
                        username: username,
                        email: email,
                        phone: phone,
                        message: message,
                        toEmail: CONTACT_EMAIL,
                    },
                })
                if (!response.data.error && response.data.status === 200) {
                    notifyToast("success", 'Thanks for contacting us!');
                    emptyForm();
                }
                else
                    notifyToast("error", 'Something Went Wrong!');
            } catch (error) {
                console.log(error)
            }
        }
        else {
            if (!fName)
                notifyToast("error", 'First Name is required!');
            if (!lName)
                notifyToast("error", 'Last Name is required!');
            if (isBusinessInformation && !username)
                notifyToast("error", 'Ollorun Username is required!');
            if (!email)
                notifyToast("error", 'Email is required!');
            if (!validateEmail(email))
                notifyToast("error", 'Email Format is not correct!');
            if (!phone)
                notifyToast("error", 'Phone Number required!');
            if (!validatePhone(phone))
                notifyToast("error", 'Phone Number Format is not correct!');
            if (!message)
                notifyToast("error", 'Message is required!');
            if (!capchaResult)
                notifyToast("error", 'Verification is required!');
        }
    }

    
    React.useEffect(() => {
        emptyForm();
    }, [isChanged])

    return (
        <Box>
            <Box>
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
                    {
                        isBusinessInformation ?
                            <>
                                <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                                    <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                                        <TextField
                                            required
                                            id="standard-required"
                                            label={translate("ollorun_username")}
                                            variant="standard"
                                            placeholder='@J.Doe'
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
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
                                </Box>
                            </>
                            :
                            <>
                                <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
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
                                </Box>
                            </>

                    }
                    <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                        <FormControl sx={{ width: "100%" }}>
                            <TextField
                                required
                                id="standard-multiline-static"
                                label={translate("message")}
                                multiline
                                rows={4}
                                placeholder={translate("write_msg")}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                variant="standard"
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
                            pb: { xs: 3, md: 0 },
                            alignItems: "center",
                        }}
                    >
                        <ReCAPTCHA
                            sitekey={recaptchaKey}
                            onChange={onChangeReCaptcha}
                            hl={currentLang.value}
                            style={{ borderRadius: "16px" }}
                        />
                        <Box onClick={submitForm}>
                            <DefaultBtn
                                text={translate("send")}
                                style={ContactBtnStyle}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CommercialComponent;