import { useNavigate } from "react-router";
// @mui
import { Stack, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
// components
import DefaultBtn from "../../../components/DefaultBtn";
import Logo from "../../../components/Logo";
import useLocales from "../../../hooks/useLocales";

const FooterStyle = styled("footer")(({ theme }) => ({
  background: "#000",
  color: "#838990",
  // borderTop: "1px solid #53536D",
  boxShadow: "none",
  "&>div": {
    maxWidth: "1440px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0",
  },
  [theme.breakpoints.up('xs')]: {
    padding: "40px 48px 40px 48px"
  },
  [theme.breakpoints.up('sm')]: {
    padding: "40px 100px 40px 48px"
  },

}));
const LinkStyle = styled(Link)({
  fontWeight: "lighter",
  color: "#fff",
  fontSize: "14px",
  transition: "all ease 400ms",
  "&:hover": {
    color: "#e1b559",
  },
  cursor: "pointer",
});

export default function Footer() {
  const { translate } = useLocales();
  const navigate = useNavigate();

  const footerData = [
    {
      text: "legal_info",
      url: "legal",
    },
    {
      text: "PrivacyPolicy",
      url: "/assets/docs/Privacy_Policy.pdf",
    },
    {
      text: "UseofCookies",
      url: "/assets/docs/Cookies_Policy.pdf",
    },
  ];
  return (
    <FooterStyle sx={{ position: { xs: "relative", sm: "unset" }, top: { xs: "15vw", sm: "unset" } }}>
      {/* <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: { xs: "24px", lg: "48px" }, mb: "24px" }}
      ></Stack> */}
      <Stack
        mx={3}
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
      >
        <Box
          sx={{
            textAlign: { xs: "center", lg: "left" },
            order: { xs: "3", lg: "1" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", lg: "left" },
            }}
          >
            <Logo type={"full"} />
          </Box>
          <Box mt={5}>
            <Typography variant="body2" color="#BACECE">
              {translate("FOOTER_TEXT2")}
            </Typography>
          </Box>
        </Box>
        {/* <Box my={3} sx={{ order: "2" }}>
          <Image
            disabledEffect
            src="/assets/images/LABEL_OLLORUN_2023_Plan de travail 1.svg"
            sx={{ width: "120px", mx: "auto" }}
            alt=""
          />
        </Box> */}
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ order: { xs: "1", lg: "3" }, my: { xs: 3, lg: 0 }, mb: { xs: 5, lg: 0 } }}
        >
          <Box mb={2} ml="auto" sx={{ mr: { xs: "auto", lg: "0" } }}>
            <DefaultBtn
              text={translate("join_our_telegram")}
              icon="akar-icons:telegram-fill"
              href="https://t.me/Ollorun_Finance_Official"
              style={{ textTransform: "inherit" }}
            />
          </Box>
          <Stack
            // spacing={2}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            sx={{
              flexDirection: "row",
              gap: {xs: 1, sm: 2}
            }}
          >
            {/* {footerData.map((e, index) => (
              <LinkStyle key={index} onClick={() => navigate(e.url)}>
                {translate(e.text)}
              </LinkStyle>
            ))} */}
            {footerData.map((e, index) => (
              index === 0 ?
              <LinkStyle key={index} href={e.url}>
                {translate(e.text)}
              </LinkStyle>
              :
              <LinkStyle key={index} href={e.url} download={true}>
                {translate(e.text)}
              </LinkStyle>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </FooterStyle >
  );
}
