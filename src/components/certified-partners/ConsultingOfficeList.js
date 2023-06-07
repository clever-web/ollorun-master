    import React from 'react'
    import GoogleMapReact from "google-map-react";

    // @mui
    import { Box } from "@mui/material";
    import Grid from '@mui/material/Grid';
    import Paper from '@mui/material/Paper';
    import { styled } from '@mui/material/styles';
    import { Modal } from 'react-responsive-modal';
    // component
    import useLocales from '../../hooks/useLocales';
    // config
    import { GOOGLE_MAP_API_KAY } from '../../config';

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


    export default function ConsultingOfficeList({ consultingOfficeList }) {
        const [modalOpen, setModalOpen] = React.useState(false);
        const [lat, setLat] = React.useState(0);
        const [lng, setLng] = React.useState(0);

        const { translate } = useLocales();

        const openModal = (latitude, longitude) => {
            setLat(latitude); setLng(longitude);
            setModalOpen(true);
        }

        const onCloseModal = () => {
            setModalOpen(false);
        }

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {consultingOfficeList.map((_, index) => (
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            key={index}
                            sx={{
                                my: 2,
                                transition: "width 2s ease 0s,height 2s ease 0s,transform 1s ease 0s",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                }
                            }}
                        >
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
                                    {_.companyName}
                                </Box>
                                <Box component="h2" sx={{ color: "#ffffff", my: 2 }}>
                                    {_.fName + " " + _.lName}
                                </Box>
                                <Box sx={{
                                    position: "absolute",
                                    bottom: 10,
                                    right: 0,
                                    left: 0,
                                    mb: 1,
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    gap: { xs: 1, md: 0 },
                                    justifyContent: { xs: "space-between", md: "space-evenly" },
                                }}>
                                    <Box sx={{ width: { xs: "90%", md: "45%" }, margin: "auto" }}>
                                        <Box
                                            component="a"
                                            href={`mailto:${_.email}`}
                                            sx={{
                                                background: "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)",
                                                borderRadius: "0.75rem",
                                                display: "flex",
                                                padding: "0.4rem",
                                                justifyContent: "center",
                                                color: "#000",
                                                transition: "all 1s ease",
                                                fontSize: "0.75rem",
                                                "&:hover": {
                                                    opacity: "0.8"
                                                },
                                            }}
                                        >
                                            {translate("contact")}
                                        </Box>
                                    </Box>
                                    <Box sx={{ width: { xs: "90%", md: "45%" }, margin: "auto" }}>
                                        <Box
                                            component="a"
                                            onClick={() => openModal(_.latitude, _.longitude)}
                                            sx={{
                                                background: "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)",
                                                borderRadius: "0.75rem",
                                                display: "flex",
                                                color: "#000",
                                                transition: "all 1s ease",
                                                padding: "0.4rem",
                                                justifyContent: "center",
                                                fontSize: "0.75rem",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    opacity: "0.8"
                                                },
                                            }}
                                        >
                                            {translate("view_map")}
                                        </Box>
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                    ))}
                </Grid>

                {/* Google Map Modal */}
                <Modal
                    open={modalOpen}
                    onClose={onCloseModal}
                    center
                    classNames={{
                        modal: "bootstrap-modal-google-map"
                    }}
                    styles={{
                        root: {
                            zIndex: 1101,
                        },
                        modal: {
                            width: "90vw",
                            maxWidth: "1000px",
                            height: "90vh",
                            padding: "2.5rem",
                            borderRadius: 10,
                        }
                    }}
                >
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            // key: apiKey ? apiKey : "you need an API key!"
                            key: GOOGLE_MAP_API_KAY
                        }}
                        center={[lat, lng]}
                        zoom={13}
                    >
                    </GoogleMapReact>

                </Modal>
            </Box>
        )
    }