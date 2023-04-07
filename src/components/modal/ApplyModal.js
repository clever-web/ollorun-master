import * as React from 'react';
import ReCAPTCHA from "react-google-recaptcha"
import { toast } from 'react-toastify';
import axios from 'axios'
import FileReaderInput from 'react-file-reader-input';
import InputMask from "react-input-mask";
import { Modal } from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';

// @mui
import {
    Box, Typography, TextField,
    Checkbox, FormControlLabel,
    FormLabel, FormGroup, FormControl,
} from "@mui/material"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import 'react-responsive-modal/styles.css';
// component
import useLocales from '../../hooks/useLocales';
import DefaultBtn from '../DefaultBtn';
import { validateEmail, validatePhone } from '../../utils/validateForm';
import { recaptchaKey, API_URL, ADVISOR_JOB_EMAIL, CLIENT_JOB_EMAIL } from '../../config';

// ----------------------------------------------------------------------

export const btnStyle = {
    background: "#222",
    color: "#ffffff",
    fontSize: "clamp(1rem, 1.1vw, 2rem)",
    width: { xs: "100%", sm: "auto" },
    minWidth: { xs: "200px", md: "120px", lg: "200px" },
    "&:hover": {
        backgroundColor: "#222"
    }
}

export default function ApplyModal({ modalOpen, handleModalClose, modalType }) {

    return (
        <div>
            {modalType === 1 ? <ClientModal modalOpen={modalOpen} handleModalClose={handleModalClose} /> : (
                modalType === 2 ? <AdvisorModal modalOpen={modalOpen} handleModalClose={handleModalClose} /> : null
            )}
        </div>
    );
}


export const ClientModal = ({ modalOpen, handleModalClose }) => {
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

    const onCloseModal = () => {
        emptyForm(); handleModalClose();
    }

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
            handleModalClose(false);
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
        <Modal
            open={modalOpen}
            onClose={onCloseModal}
            center
            classNames={{
                modal: "bootstrap-modal-custom"
            }}
            styles={{
                root: {
                    zIndex: 1101,
                },
                modal: {
                    maxWidth: 900,
                    padding: "2.5rem",
                    borderRadius: 10,
                }
            }}>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
                    <Typography
                        id="transition-modal-title"
                        variant="h3"
                        sx={{ textAlign: "center", color: "rgb(18, 29, 51)" }}
                    >
                        {translate("welcome")}
                    </Typography>
                    {/* <Box component="img"
                        src="/assets/images/LABEL_OLLORUN_2023_Plan de travail 1.svg"
                        sx={{ width: 60 }}
                    /> */}
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
        </Modal>
    )
}

export const DefinitionModal = ({ modalOpen, handleModalClose, data }) => {
    const { desc, title } = data;
    const { translate } = useLocales();

    const onCloseModal = () => {
        handleModalClose();
    }

    return (
        <Modal
            open={modalOpen}
            onClose={onCloseModal}
            center
            data={data}
            classNames={{
                modal: "bootstrap-modal-custom"
            }}
            styles={{
                root: {
                    zIndex: 1101,
                },
                modal: {
                    maxWidth: 900,
                    padding: "2.5rem",
                    borderRadius: 10,
                }
            }}>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
                    <Typography
                        id="transition-modal-title"
                        variant="h3"
                        sx={{ textAlign: "center", color: "rgb(18, 29, 51)" }}
                    >
                        <span dangerouslySetInnerHTML={{__html: translate(title)}}/>
                    </Typography>
                    {/* <Box component="img"
                        src="/assets/images/LABEL_OLLORUN_2023_Plan de travail 1.svg"
                        sx={{ width: 60 }}
                    /> */}
                </Box>
                <Typography id="transition-modal-description" sx={{ mt: 2, color: "rgb(18, 29, 51)" }}>
                    <span dangerouslySetInnerHTML={{__html: translate(desc)}}/>
                </Typography>
            </Box>
        </Modal>
    )
}

export const AdvisorModal = ({ modalOpen, handleModalClose }) => {
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [cityCountry, setCityCountry] = React.useState("");
    const [currentFieldActivity, setCurrentFieldActivity] = React.useState("");
    const [capchaResult, setCapchaResult] = React.useState("");
    const [cv, setCv] = React.useState(null);
    const [coverLetter, setCoverLetter] = React.useState(null);
    const [cvName, setCvName] = React.useState("");
    const [coverLetterName, setCoverLetterName] = React.useState("");

    const { translate, currentLang } = useLocales();

    const handleChangeCV = (e, results) => {
        results.forEach(result => {
            const [e, file] = result;
            if (checkFileType(file)) {
                setCv({ file: e.target.result, info: result[1].name });
                setCvName(file.name);
            }
            else
                notifyToast("error", 'Only PDF or DOCX is supported!');
        });
    }

    const handleChangeCoverLetter = (e, results) => {
        results.forEach(result => {
            const [e, file] = result;
            if (checkFileType(file)) {
                setCoverLetter({ file: e.target.result, info: result[1].name });
                setCoverLetterName(file.name);
            }
            else
                notifyToast("error", 'Only PDF or DOCX is supported!');
        });
    }

    const onChangeReCaptcha = (result) => {
        setCapchaResult(result);
    }

    const onCloseModal = () => {
        emptyForm(); handleModalClose();
    }

    const emptyForm = () => {
        setFName(""); setLName(""); setPhone(""); setEmail("");
        setCityCountry(""); setCurrentFieldActivity(""); setCapchaResult("");
        setCvName(""); setCoverLetterName(""); setCv(null); setCoverLetter(null);
    }

    // const cancelForm = () => {
    //     emptyForm();
    //     handleModalClose(false);
    // }

    const validateForm = () => {
        validatePhone(phone)
        if (fName && lName && phone && validatePhone(phone) && email &&
            validateEmail(email) && capchaResult && cityCountry && cityCountry.includes("/") &&
            currentFieldActivity && cv && cvName && coverLetter && coverLetterName)
            return true;
        else return false;
    }

    const submitForm = async () => {
        if (validateForm()) {
            // submit form
            handleModalClose(false);
            emptyForm();
            try {
                const response = await axios({
                    method: "post",
                    url: `${API_URL}/user/become-advisor`,
                    data: {
                        fName: fName,
                        lName: lName,
                        phone: phone,
                        email: email,
                        cityCountry: cityCountry,
                        currentFieldActivity: currentFieldActivity,
                        cv: cv,
                        coverLetter: coverLetter,
                        toEmail: ADVISOR_JOB_EMAIL,
                    },
                })
                if (!response.data.error) {
                    notifyToast("success", "Successfully Registered!")
                }
                else
                    notifyToast("error", "Something happened on server!")
            } catch (error) {
                console.log(error)
                notifyToast("error", "Something Went Wrong!")
            }
        }
        else {
            if (!fName)
                notifyToast("error", 'First Name is required!');
            if (!lName)
                notifyToast("error", 'Last Name is required!');
            if (!phone)
                notifyToast("error", 'Phone Number is required!');
            if (!validatePhone(phone))
                notifyToast("error", "Phone Number Format is not correct!");
            if (!email)
                notifyToast("error", "Email is required!");
            if (!validateEmail(email))
                notifyToast("error", "Email Format is not correct!");

            if (!cityCountry.includes("/"))
                notifyToast("error", "City/Country Format is not correct!");
            if (!cvName)
                notifyToast("error", "CV is required!");
            if (!coverLetterName)
                notifyToast("error", "Cover Letter is required!")
            return false;
        }
    }

    return (
        <Modal
            open={modalOpen}
            onClose={onCloseModal}
            center
            classNames={{
                modal: "bootstrap-modal-custom"
            }}
            styles={{
                root: {
                    zIndex: 1101,
                },
                modal: {
                    maxWidth: 900,
                    padding: "2.5rem",
                    borderRadius: 10,
                }
            }}>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
                    <Typography
                        id="transition-modal-title"
                        variant="h3"
                        sx={{ textAlign: "center", color: "rgb(18, 29, 51)", textTransform: "capitalize" }}
                    >
                        {translate("become_advisor")}
                    </Typography>
                    {/* <Box component="img"
                        src="/assets/images/LABEL_OLLORUN_2023_Plan de travail 1.svg"
                        sx={{ width: 60 }}
                    /> */}
                </Box>
                <Typography id="transition-modal-description" sx={{ mt: 2, textAlign: "center", color: "rgb(18, 29, 51)" }}>
                    {translate("become_advisor_desc")}
                </Typography>
                <Box
                    component="form"
                    autoComplete="off"
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
                                required
                                id="standard-required"
                                label={translate("current_field_activity")}
                                variant="standard"
                                placeholder={translate("financial_advisor")}
                                value={currentFieldActivity}
                                onChange={(e) => setCurrentFieldActivity(e.target.value)}
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
                                label={translate("city_country")}
                                variant="standard"
                                placeholder='Paris / France'
                                value={cityCountry}
                                onChange={(e) => setCityCountry(e.target.value)}
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
                                label="CV"
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
                                onChange={handleChangeCV}
                            >
                                <AttachFileIcon sx={{ fontSize: "40px", color: "#222", transform: "rotate(45deg)", cursor: "pointer" }} />
                                <Box component="p">{cvName}</Box>
                            </FileReaderInput>
                        </FormControl>
                        <FormControl sx={{ width: { xs: "100%", sm: "45%" }, mb: 1.5 }}>
                            <TextField
                                required
                                id="standard-required"
                                label={translate("cover_letter")}
                                htmlFor="my-cover-letter"
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
                                id="my-cover-letter"
                                onChange={handleChangeCoverLetter}
                            >
                                <AttachFileIcon sx={{ fontSize: "40px", color: "#222", transform: "rotate(45deg)", cursor: "pointer" }} />
                                <Box component="p">{coverLetterName}</Box>
                            </FileReaderInput>
                        </FormControl>
                    </Box>
                    <Box component="p" sx={{ color: "red", mb: 3 }}>
                        {translate("required_desc")}
                    </Box>
                    {/* <Box>
                        <ReCAPTCHA
                            sitekey={recaptchaKey}
                            onChange={onChangeReCaptcha}
                        />
                    </Box> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: { xs: 2 },
                            justifyContent: "space-between",
                            mt: 3,
                            alignItems: "center",
                        }}
                    >
                        <ReCAPTCHA
                            sitekey={recaptchaKey}
                            onChange={onChangeReCaptcha}
                            hl={currentLang.value}
                        />
                        <Box onClick={submitForm}>
                            <DefaultBtn text={translate("send")}
                                style={{ ...btnStyle }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export const checkFileType = (file) => {
    if (file.type !== "application/pdf" &&
        file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        return false;

    else return true;
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