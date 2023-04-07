import * as React from 'react';
// import ReCAPTCHA from "react-google-recaptcha"
// import { toast } from 'react-toastify';
// import axios from 'axios'
// import FileReaderInput from 'react-file-reader-input';
// import InputMask from "react-input-mask";
import { Modal } from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { Box } from "@mui/material"
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import 'react-responsive-modal/styles.css';
// component
import useLocales from '../../hooks/useLocales';
import DefaultBtn from '../DefaultBtn';


export default function TelegramModal({ modalOpen, handleModalClose }) {
    const { translate } = useLocales();

    const onCloseModal = () => {
        handleModalClose();
    }

    const closeIcon = (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="white" />
            <path d="M21.27 21.99C20.595 22.665 19.5 22.665 18.825 21.99L15 17.6175L11.175 21.9825C10.5 22.6575 9.405 22.6575 8.73 21.9825C8.055 21.3075 8.055 20.2125 8.73 19.5375L12.705 14.9925L8.7225 10.4475C8.0475 9.7725 8.0475 8.6775 8.7225 8.0025C9.3975 7.3275 10.4925 7.3275 11.1675 8.0025L14.9925 12.375L18.8175 8.0025C19.4925 7.3275 20.5875 7.3275 21.2625 8.0025C21.9375 8.6775 21.9375 9.7725 21.2625 10.4475L17.2875 14.9925L21.2625 19.5375C21.9375 20.2125 21.9375 21.3075 21.2625 21.99H21.27Z" fill="#0494DA" />
        </svg>
    )

    return (
        <Modal
            open={modalOpen}
            onClose={onCloseModal}
            center
            closeIcon={closeIcon}
            focusTrapped={false}
            classNames={{
                modal: "bootstrap-modal-custom telegram-modal",
                closeButton: "telegram-icon",
            }}
            styles={{
                root: {
                    zIndex: 1101,
                },
                modal: {
                    // width: 327.8,
                    // height: 330,
                    padding: "2rem",
                    backgroundImage: "url(/assets/images/popup/bg.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: 24,
                    overflow: "unset",
                }
            }}>
            <Box textAlign="center">
                <Box
                    component="h3"
                    color="white"
                    fontSize="clamp(1rem, 2.2vw, 2.5rem)"
                    fontFamily={"Poppins"}
                    lineHeight={1.2}
                >{translate("join_ollorun_finance_telegram")}</Box>
                <Box component="p" color="white" fontSize="clamp(0.75rem, 1vw, 1.25rem)" fontFamily={"Poppins-Regular"} pt={1}>{translate("follow_all_news_ollorun")}</Box>
                <Box component="img" src="/assets/images/popup/back-logo.svg" width={"60%"} margin="auto" />
                <DefaultBtn text={translate("join")} style={{ py: 0.75 }} href="https://t.me/Ollorun_Finance_Official" />
            </Box>
        </Modal>
    )
}
