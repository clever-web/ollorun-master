import { useState } from "react";
import { Box } from "@mui/material";
import useLocales from "../../hooks/useLocales";
import { AdvisorModal } from "../../components/modal/ApplyModal";

const HeaderBecomeAdvisor = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = (event, reason) => {
        if (reason === "backdropClick") return false;
        setModalOpen(false);
    }

    const { translate } = useLocales();

    return (
        <>
            <Box
                component="p"
                className="header-become-advisor"
                onClick={() => setModalOpen(true)}
                sx={{
                    py: 0.75,
                    height: "40px",
                    lineHeight: "28px",
                    color: "#ffffff",
                    fontSize: "clamp(0.65rem, 0.75vw, 1rem)",
                    fontWeight: "700",
                }}
            >
                {translate("become_an_independent")}
            </Box>
            <AdvisorModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
        </>
    )
}

export default HeaderBecomeAdvisor;