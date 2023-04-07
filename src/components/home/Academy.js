import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
// components
import { MotionViewport, varFade } from "../animate";
import useLocales from "../../hooks/useLocales";
import { useState } from "react";
// ----------------------------------------------------------------------

const BoxStyle = styled(Box)({
  maxWidth: "1288px",
  position: "relative",
  padding: "0 24px 60px",
  margin: "0 auto 0",
  zIndex: "1",
});

// ----------------------------------------------------------------------

export default function Academy({ data }) {
  const { translate } = useLocales();
  // eslint-disable-next-line no-unused-vars
  const [playState, setPlayState] = useState(["", "", ""]);
  const academyData = [
    {
      title: "node_title",
      desc: "node_desc",
      video: "/assets/video/02_Node_courte.mp4",
    },
    {
      title: "master_node_title",
      desc: "master_node_desc",
      video: "/assets/video/01_Masternode_courte.mp4",
    },
    {
      title: "pool_title",
      desc: "pool_desc",
      video: "/assets/video/03_Pool-Masternode_courte.mp4",
    },
  ];
  return (
    <BoxStyle id="academy" ref={data} sx={{ top: { xs: "20vw", sm: "unset" } }}>
      <Box>
        <MotionViewport>
          <m.div variants={varFade().inUp}>
            <Grid
              container
              px={3}
              py={4}
              mb={4}
              sx={{ backgroundColor: "#1E1E1E", borderRadius: "16px" }}
            >
              {academyData.map((data, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={4}
                  px={1}
                  mt={{ xs: 3, md: 0 }}
                >
                  <div
                    className={
                      playState[index] ? "box-video open" : "box-video"
                    }
                  >
                    <div className="video-container">
                      <video
                        style={{
                          maxWidth: "100%",
                          width: "800px",
                          margin: "0 auto",
                        }}
                        muted
                        loop
                        controls={true}
                        autoPlay
                        className={"video" + index}
                        src={data.video}
                      />
                    </div>
                  </div>
                  <Typography
                    variant="h6"
                    dangerouslySetInnerHTML={{
                      __html: translate(data.title),
                    }}
                    mt={2}
                    textAlign="center"
                  />
                </Grid>
              ))}
            </Grid>
          </m.div>
        </MotionViewport>
      </Box>
    </BoxStyle>
  );
}
