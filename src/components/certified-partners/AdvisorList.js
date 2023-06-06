    import React from 'react'
    // @mui
    import { Box } from "@mui/material";
    import Grid from '@mui/material/Grid';
    import Paper from '@mui/material/Paper';
    import { styled } from '@mui/material/styles';
    // component
    // import DefaultBtn from '../DefaultBtn';
    import useLocales from '../../hooks/useLocales';

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#000",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 300,
        position: "relative",
        margin: "auto",
        border: "1px solid white"
    }));

    export default function AdvisorList({ advisorList }) {

        const { translate } = useLocales();

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {advisorList.length > 0 && advisorList.map((_, index) => (
                        <Grid
                            key={index}
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            sx={{
                                my: 2,
                                transition: "width 2s ease 0s,height 2s ease 0s,transform 1s ease 0s",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                }
                            }}>
                            <Item>
                                <Box
                                    component="img"
                                    src="/logo/LABEL_OLLORUN.svg"
                                    sx={{
                                        width: { xs: "20%", sm: "25%", textAlign: "center", margin: "auto" },
                                        maxWidth: "100px",
                                    }}
                                />
                                <Box component="p" sx={{ color: "#ffffff", my: 2 }}>
                                    {/* {_.company_name} */}
                                    {_.companyName}
                                </Box>
                                <Box component="h2" sx={{ color: "#ffffff", my: 2 }}>
                                    {_.fName + " " + _.lName}
                                </Box>
                                <Box component="h3" sx={{ color: "#ffffff", my: 2 }}>
                                    {_.address}
                                </Box>
                                <Box sx={{ position: "absolute", bottom: 10, right: 0, left: 0, mb: 1 }}>
                                    {/* <DefaultBtn
                                        isMail={true}
                                        text={translate("contact")}
                                        // href={`mailto:${_.email}`}
                                        href={_.email}
                                        style={{ padding: "0.4rem 1rem", fontSize: "0.75rem", minWidth: { xs: "150px", md: "200px" } }}
                                    /> */}
                                    <Box
                                        component="a"
                                        href={`mailto:${_.email}`}
                                        sx={{
                                            background: "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)",
                                            borderRadius: "0.75rem",
                                            color: "#000",
                                            transition: "all 1s ease",
                                            padding: "0.4rem 30%",
                                            fontSize: "0.75rem",
                                            minWidth: { xs: "150px", md: "200px" },
                                            "&:hover": {
                                                opacity: "0.8"
                                            },
                                        }}
                                    >
                                        {translate("contact")}
                                    </Box>
                                </Box>

                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    }
