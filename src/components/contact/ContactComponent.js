import React from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import FileReaderInput from 'react-file-reader-input';
import InputMask from "react-input-mask";
import axios from 'axios'
// @mui
import { Box, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// components
import DefaultBtn from '../DefaultBtn';
// utils
import { notifyToast, checkFileType } from '../modal/ApplyModal';
import useLocales from '../../hooks/useLocales';
import { validateEmail, validatePhone } from '../../utils/validateForm';
import { ContactBtnStyle } from './contact.style';
// CONFIG
import { recaptchaKey, API_URL, CONTACT_EMAIL } from '../../config';
// ----------------------------------------------------------------------

const ContactComponent = () => {

    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [ordernumber, setOrdernumber] = React.useState("");
    const [walletnumber, setWalletNumber] = React.useState("");
    const [receipt, setReceipt] = React.useState(null);
    const [receiptName, setReceiptName] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [capchaResult, setCapchaResult] = React.useState("");

    const { translate, currentLang } = useLocales();

    const onChangeReCaptcha = (result) => {
        setCapchaResult(result);
    }

    const handleChangeReceipt = (e, results) => {
        results.forEach(result => {
            const [e, file] = result;
            if (checkFileType(file)) {
                setReceipt({ file: e.target.result, info: result[1].name });
                setReceiptName(file.name);
            }
            else
                notifyToast("error", 'Only PDF or DOCX is supported!');
        });
    }

    const emptyForm = () => {
        setFName(""); setLName(""); setPhone(""); setEmail("");
        setUserName(""); setOrdernumber(""); setWalletNumber("");
        setReceipt(null); setReceiptName(""); setSubject("");
        setMessage(""); 
        // setCapchaResult("");
    }

    const validateForm = () => {
        if (fName && lName && email && validateEmail(email) &&
            phone && validatePhone(phone) && subject
            && capchaResult 
            && message
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
                    url: `${API_URL}api/support`,
                    headers: {
                        // 'content-type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    },
                    data: {
                        // type: isPack ? "pack" : "technical",
                        fName: fName,
                        lName: lName,
                        email: email,
                        phone: phone,
                        username: username,
                        ordernumber: ordernumber,
                        walletnumber: walletnumber,
                        receipt: receipt,
                        subject: subject,
                        message: message,
                        toEmail: CONTACT_EMAIL
                    }
                })
                if (!response.error && response.status === 200) {
                    notifyToast("success", 'Thanks for contacting us!');
                    emptyForm();
                }
                else {
                    notifyToast("error", 'Something happened on server!');
                }
            } catch (error) {
                console.log(error)
                notifyToast("error", "Something Went Wrong!");
            }

        }
        else {
            if (!fName)
                notifyToast("error", 'First Name is required!');
            if (!lName)
                notifyToast("error", 'Last Name is required!');
            if (!email)
                notifyToast("error", 'Email is required!');
            if (!validateEmail(email))
                notifyToast("error", 'Email Format is not correct!');
            if (!phone)
                notifyToast("error", 'Phone Number required!');
            if (!validatePhone(phone))
                notifyToast("error", 'Phone Number Format is not correct!');
            // if (!username)
            //     notifyToast("error", 'Ollorun Username is required!');
            // if (!ordernumber)
            //     notifyToast("error", 'Order Number is required!');
            // if (!walletnumber)
            //     notifyToast("error", 'Wallet Number is required!');
            // if (!receiptName || !receipt)
            //     notifyToast("error", 'Payment Receipt is required!');
            if (!subject)
                notifyToast("error", 'Subject is required!');
            if (!message)
                notifyToast("error", 'Message is required!');
            if (!capchaResult)
                notifyToast("error", 'Verification is required!');
        }
    }

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
                    <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                            <TextField
                                // required
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
                                // required
                                id="standard-required"
                                label={translate("order_number")}
                                variant="standard"
                                placeholder='16578'
                                value={ordernumber}
                                onChange={(e) => setOrdernumber(e.target.value)}
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
                                // required
                                id="standard-required"
                                label={translate("wallet_number")}
                                variant="standard"
                                placeholder='16578'
                                value={walletnumber}
                                onChange={(e) => setWalletNumber(e.target.value)}
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
                                // required
                                id="standard-required"
                                label={translate("attached_file")}
                                htmlFor="my-file-input"
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                disabled
                                sx={{
                                    width: "100%",
                                    mt: 5,
                                    mb: 1,
                                }}
                            />
                            <FileReaderInput
                                as="url"
                                id="my-file-input"
                                onChange={handleChangeReceipt}
                            >
                                <AttachFileIcon sx={{ fontSize: "40px", color: "#222", transform: "rotate(45deg)", cursor: "pointer" }} />
                                <Box component="p">{receiptName}</Box>
                            </FileReaderInput>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                        <FormControl sx={{ width: "100%" }}>
                            <TextField
                                required
                                id="standard-multiline-static"
                                label={translate("subject_of_your_request")}
                                placeholder={translate("write_subject")}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                variant="standard"
                                sx={{
                                    width: "50%",
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
                            hl={currentLang.value}
                            onChange={onChangeReCaptcha}
                            style={{ borderRadius: "16px" }}
                        />
                        <Box onClick={submitForm} sx={{ width: { xs: "100%", sm: "auto" } }}>
                            <DefaultBtn
                                text={translate("send")}
                                style={ContactBtnStyle}
                            />
                        </Box>
                    </Box>
                </Box>
                {/* <ToastContainer /> */}
            </Box>
        </Box>
    )
}

export default ContactComponent;