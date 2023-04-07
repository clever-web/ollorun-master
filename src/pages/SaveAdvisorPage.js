import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"
import FileReaderInput from 'react-file-reader-input';
import InputMask from "react-input-mask";
import axios from 'axios'
// import { m } from 'framer-motion';
import CryptoJS from 'crypto-js';
// @mui
import { styled } from '@mui/material/styles';
import { Box, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// components
import Page from '../components/Page';
import DefaultBtn from '../components/DefaultBtn';
// import { MotionContainer, varBounce } from '../components/animate';
// utils
import { notifyToast } from '../components/modal/ApplyModal';
import useLocales from '../hooks/useLocales';
import { validateEmail, validatePhone } from '../utils/validateForm';
import { ContactBtnStyle } from '../components/contact/contact.style';
// config
import { recaptchaKey, SECRET_KEY, BASIC_URL, API_URL, CONTACT_EMAIL } from '../config';
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

export default function SaveAdvisorPage() {

    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [kbis, setKbis] = React.useState(null);
    const [kbisName, setKbisName] = React.useState("");
    const [idNumber, setIdNumber] = React.useState("");
    const [passport, setPassport] = React.useState(null);
    const [passportName, setPassportName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [bankDoc, setBankDoc] = React.useState(null);
    const [bankDocName, setBankDocName] = React.useState("");
    const [capchaResult, setCapchaResult] = React.useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const _pathname = location.pathname;
    const { translate, currentLang } = useLocales();


    const handleChangeKbis = (e, results) => {
        results.forEach(result => {
            const [e, file] = result;
            if (checkFileType(file)) {
                setKbis({ file: e.target.result, info: result[1].name });
                setKbisName(file.name);
            }
            else
                notifyToast("error", 'Only PDF or DOCX is supported!');
        });
    }

    const handleChangePassport = (e, results) => {
        results.forEach(result => {
            const [e, file] = result;
            if (checkFileType(file)) {
                setPassport({ file: e.target.result, info: result[1].name });
                setPassportName(file.name);
            }
            else
                notifyToast("error", 'Only PDF or DOCX is supported!');
        });
    }

    const handleChangeBankDoc = (e, results) => {
        results.forEach(result => {
            const [e, file] = result;
            if (checkFileType(file)) {
                setBankDoc({ file: e.target.result, info: result[1].name });
                setBankDocName(file.name);
            }
            else
                notifyToast("error", 'Only PDF or DOCX is supported!');
        });
    }

    const onChangeReCaptcha = (result) => {
        setCapchaResult(result);
    }

    const emptyForm = () => {
        setFName(""); setLName(""); setEmail(""); setPhone("");
        setCity(""); setCountry("");
        setCompanyName(""); setKbis(null); setKbisName("");
        setPassport(null); setIdNumber("");
        setPassportName(''); setAddress("");
        setBankDoc(null); setBankDocName("");
    }

    const validateForm = () => {
        if (fName && lName && email && validateEmail(email) &&
            phone && validatePhone(phone) && city && country &&
            companyName && kbisName && idNumber &&
            passportName && address && bankDocName && capchaResult
        )
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
                        url: `${API_URL}/user/save-advisor`,
                        data: {
                            fName: fName,
                            lName: lName,
                            email: email,
                            phone: phone,
                            city: city,
                            country: country,
                            companyName: companyName,
                            kbis: kbis,
                            idNumber: idNumber,
                            passport: passport,
                            address: address,
                            bankDoc: bankDoc,
                            toEmail: CONTACT_EMAIL,
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
                if (!city)
                    notifyToast("error", 'City required!');
                if (!country)
                    notifyToast("error", 'Country required!');
                if (!companyName)
                    notifyToast("error", 'Company Name is required!');
                if (!kbisName || !kbis)
                    notifyToast("error", 'Document KBIS is required!');
                if (!idNumber)
                    notifyToast("error", 'ID Number is required!');
                if (!passport || !passportName)
                    notifyToast("error", 'Photo ID or Passport is required!');
                if (!address)
                    notifyToast("error", 'Professional Address is required!');
                if (!bankDoc || !bankDocName)
                    notifyToast("error", 'Bank Document is required!');
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

    else {
        return (
            <Page title="Save Advisor">
                {/* <Container component={MotionContainer}> */}
                <ContentStyle>
                    <Box
                        component="form"
                        autoComplete="off"
                        sx={{
                            width: { xs: "100%", sm: "80%" },
                            background: "#ffffff",
                            minHeight: "80vh",
                            m: "auto",
                            borderRadius: 3,
                            position: "relative",
                            px: 6,
                            pb: 10,
                        }}
                    // onSubmit={onSubmit}
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
                            {translate("save_advisor")}
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
                                    required
                                    id="standard-required"
                                    label={translate("city")}
                                    variant="standard"
                                    placeholder='Paris'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
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
                                    label={translate("country")}
                                    variant="standard"
                                    placeholder='France'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
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
                                    label={translate("company_name")}
                                    variant="standard"
                                    placeholder='Ollorun'
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
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
                                    label={translate("document_kbis")}
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
                                    onChange={handleChangeKbis}
                                >
                                    <AttachFileIcon sx={{ fontSize: "40px", color: "#222", transform: "rotate(45deg)", cursor: "pointer" }} />
                                    <Box component="p">{kbisName}</Box>
                                </FileReaderInput>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                            <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    label={translate("id_number")}
                                    variant="standard"
                                    placeholder={translate("id_number")}
                                    value={idNumber}
                                    onChange={(e) => setIdNumber(e.target.value)}
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
                                    label={translate("photo_id_passport")}
                                    htmlFor="passport-file-input"
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
                                    id="passport-file-input"
                                    onChange={handleChangePassport}
                                >
                                    <AttachFileIcon sx={{ fontSize: "40px", color: "#222", transform: "rotate(45deg)", cursor: "pointer" }} />
                                    <Box component="p">{passportName}</Box>
                                </FileReaderInput>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: { xs: "inherit", sm: "flex" }, justifyContent: "space-between" }}>
                            <FormControl sx={{ width: { xs: "100%", sm: "45%" }, }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    label={translate("professional_address")}
                                    variant="standard"
                                    // placeholder={translate("professional_address")}
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
                                    label={translate("proof_address")}
                                    htmlFor="bankdoc-file-input"
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
                                    id="bankdoc-file-input"
                                    onChange={handleChangeBankDoc}
                                >
                                    <AttachFileIcon sx={{ fontSize: "40px", color: "#222", transform: "rotate(45deg)", cursor: "pointer" }} />
                                    <Box component="p">{bankDocName}</Box>
                                </FileReaderInput>
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
                                    text={translate("send")}
                                    style={ContactBtnStyle}
                                />
                            </Box>
                        </Box>
                    </Box>
                </ContentStyle>
                {/* </Container> */}
            </Page>
        )
    }
}

const decryptPath = (pathname) => {
    const _index_saveadvisor = pathname.indexOf("saveadvisor");
    const _key_substring = pathname.substring(_index_saveadvisor + 12);

    const _msg = pathname.split("/")[2];
    const ciphertext = _key_substring.substring(_key_substring.indexOf("/") + 1)

    if (ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const _decrypted_msg = bytes.toString(CryptoJS.enc.Utf8);

        return _msg / 2 === Number(_decrypted_msg);
    }
    else return false;
}

const checkFileType = (file) => {
    if (file.type !== "application/pdf" &&
        file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        return false;

    else return true;
}
