import { useQuery, gql } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import useLocales from "../../../hooks/useLocales";
import DefaultBtn from "../../DefaultBtn";

const CURRENT_STATE = gql`
  query ($search: String) {
    markets(search: $search) {
      id
      ticker {
        last
        price_change_percent
      }
    }
  }
`;
const BoxStyle = styled(Box)({
  maxWidth: "500px",
  // borderRadius: "18px",
  backgroundColor: "#1E1E1E",
  "& .percent": {
    display: "flex",
    justifyContent: "center",
    margin: "auto 0 auto auto",
  },
  "& .positive": {
    color: "#0BFF32",
  },
  "& .negative": {
    color: "#cb2020",
  },
});

export default function OztgCard() {
  //eslint-disable-next-line no-unused-vars
  const { data, loading, error } = useQuery(CURRENT_STATE, {
    variables: {
      search: "oztgusd",
    },
    pollInterval: 500,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const curPrice = data.markets[0].ticker.last;
  const percentChange = data.markets[0].ticker.price_change_percent;

  return (
    <BoxStyle sx={{ padding: { xs: "48px 16px", sm: "48px 24px" } }} className="animateVertical">
      <Stack direction="row">
        <Box
          component="img"
          width="50px"
          src="/assets/images/OZTG_OLLO.svg"
          sx={{ mr: { xs: 1, sm: 2 } }}
        />
        <Box>
          <Typography variant="h4" color="white">
            OZTG / USD
          </Typography>
          <Typography variant="h5" color="white">
            ${curPrice}
          </Typography>
        </Box>
        <Box
          ml="auto"
          className={
            percentChange.indexOf("-") > -1
              ? "percent negative"
              : "percent positive"
          }
        >
          <Typography variant="h5">{percentChange}</Typography>
        </Box>
      </Stack>
    </BoxStyle>
  );
}

// -----------------------------------

export function OztgNewCard() {
  const { translate } = useLocales();

  return (
    <BoxStyle
      sx={{
        p: { xs: "0.75rem 2rem", sm: "1.5rem 2rem" },
        mt: { xs: 3, sm: 0 },
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          justifyContent: {xs: "flex-start", sm:"space-around"},
          alignItems: {xs: "center", sm: "unset"},
          gap: 1,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box
            component="img"
            width="3rem"
            src="/assets/images/oztg_hexagon.svg"
          />
          <DefaultBtn
            href="https://flashxchanger.com"
            text={translate("buy_oztg")}
            style={{
              background: "#663797",
              color: "#ffffff",
              minWidth: "120px",
              textTransform: "inherit",
              p: 1,
              display: { xs: "none", sm: "inherit" },
              "&:hover":
                { backgroundColor: "#663797" },
            }}
          />
        </Box>
        <Box component="p" sx={{ color: "#687284", mr: {xs: "4vw", sm: 0} }}>{"OZTG"}</Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: {xs: 2, sm: 10} }}>
          <Box component="p" sx={{ color: "#ffffff" }}>{"$1.57"}</Box>
          <Box component="p" sx={{ color: "#00f802" }}>{"--%"}</Box>
        </Box>
      </Box>
    </BoxStyle>
  )
}