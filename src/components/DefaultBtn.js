  import { styled } from "@mui/material/styles";
  import { Button } from "@mui/material";
  import useLocales from "../hooks/useLocales";
  import Iconify from "./Iconify";

  const ButtonStyle = styled(Button)({
    background: "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)",
    borderRadius: "0.75rem",
    padding: "1rem 1.2rem",
    minWidth: "200px",
    color: "#000",
    transition: "all 1s ease",
    "&:hover": {
      // background: "linear-gradient(92.94deg, #fff 4.54%, #fff 93.54%)",
      opacity: "0.8"
    },
  });

  export default function DefaultBtn({ text, icon, href, style, isMail = false }) {
    const { translate } = useLocales();

    return (
      <ButtonStyle href={isMail ? `mailto:${href}`: href} color="default" variant="button" target="_blank" sx={{ ...style }} autoFocus={false}>
        <Iconify icon={icon} width={20} height={20} mr={1} />
        {translate(text)}
      </ButtonStyle>
    );
  }
