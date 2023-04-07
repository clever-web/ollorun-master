import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
// components
import { MotionViewport, varFade } from "../animate";
import useLocales from "../../hooks/useLocales";
import DefaultBtn from "../DefaultBtn";
// ----------------------------------------------------------------------

const BoxStyle = styled(Box)({
  maxWidth: "1288px",
  position: "relative",
  padding: "160px 24px 0",
  margin: "-100px auto 60px",
  textAlign: "center",
});

// ----------------------------------------------------------------------

export default function Contact({ data }) {
  const { translate } = useLocales();
  return (
    <BoxStyle id="community" ref={data}>
      <Box>
        <MotionViewport>
          <m.div variants={varFade().inUp}>
            <Typography
              variant="h2"
              dangerouslySetInnerHTML={{
                __html: translate("contact_title"),
              }}
            />
          </m.div>
          <m.div variants={varFade().inUp}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              mt={4}
              flexWrap="wrap"
            >
              <Box mx={1} mb={2}>
                <DefaultBtn
                  href="https://t.me/Ollorun_Official_Telegram"
                  text={translate("join_our_telegram")}
                  icon="akar-icons:telegram-fill"
                />
              </Box>
            </Stack>
          </m.div>
        </MotionViewport>
      </Box>
    </BoxStyle>
  );
}
