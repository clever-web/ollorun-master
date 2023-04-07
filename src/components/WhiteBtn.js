import { Button } from "@mui/material";
import useLocales from "../hooks/useLocales";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function WhiteBtn({ text, style, icon }) {
    const { translate } = useLocales();

    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: "0.75rem",
                border: "1px solid white",
                background: "#222",
                color: "#ffffff",
                "&:hover": {
                    background: "#222"
                },
                ...style,
            }}>
            {translate(text)}
        </Button>
    )
}