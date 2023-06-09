    import React from 'react'
    // @mui
    import { Box } from "@mui/material";
    // component
    import useLocales from '../../hooks/useLocales';
    import DefaultBtn from '../DefaultBtn';

    // const dataList = [
    //     {
    //         datetime: "November 1, 2022 05:00 AM PT",
    //         event_name: "Uber Q3 2022 Earnings Conference Call",
    //         address: "45 Albemarle Street, London, W1S 4JL",
    //         href: "/"
    //     },
    //     {
    //         datetime: "November 1, 2022 05:00 AM PT",
    //         event_name: "Uber Q3 2022 Earnings Conference Call",
    //         address: "45 Albemarle Street, London, W1S 4JL",
    //         href: "/"
    //     },
    //     {
    //         datetime: "November 1, 2022 05:00 AM PT",
    //         event_name: "Uber Q3 2022 Earnings Conference Call",
    //         address: "45 Albemarle Street, London, W1S 4JL",
    //         href: "/"
    //     },
    //     {
    //         datetime: "November 1, 2022 05:00 AM PT",
    //         event_name: "Uber Q3 2022 Earnings Conference Call",
    //         address: "45 Albemarle Street, London, W1S 4JL",
    //         href: "/"
    //     },
    //     {
    //         datetime: "November 1, 2022 05:00 AM PT",
    //         event_name: "Uber Q3 2022 Earnings Conference Call",
    //         address: "45 Albemarle Street, London, W1S 4JL",
    //         href: "/"
    //     },
    // ]

    export default function EventList({ eventList }) {
        const { translate } = useLocales()

        return (
            <Box>
                {eventList.map((_, index) => (
                    <Box key={`event_list_${index}`} sx={{ display: "flex", flexDirection: "column", borderBottom: "1px solid white", mb: 5 }}>
                        <Box
                            component="p"
                            sx={{
                                my: 1.5,
                                color: "#515354",
                                fontSize: "clamp(1rem, 1vw, 1.5rem)"
                            }}
                        >
                            {_.datetime}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "row"
                                },
                                justifyContent: "space-between",
                                alignItems: {
                                    xs: "flex-start",
                                    sm: "center"
                                },
                                my: { xs: 1, sm: 1 },
                            }}
                        >
                            <Box
                                className="get-started-text"
                                component="a"
                                href={_.href}
                                sx={{
                                    my: 1.5,
                                    fontSize: "clamp(1.5rem, 2vw, 2rem)"
                                }}
                            >
                                {_.name}
                            </Box>
                            <Box sx={{ width: { xs: "100%", sm: "auto" }, display: { xs: "none", sm: "flex" } }}>
                                <DefaultBtn
                                    text={translate("participate")}
                                    isMail={true}
                                    href={`mailto:${_.email}`}
                                    style={{
                                        background: "#000",
                                        color: "#ffffff",
                                        border: "1px solid #ffffff",
                                        width: { xs: "100%", sm: "auto" },
                                        padding: { xs: "0.5rem 1rem", sm: "1rem 2rem" },
                                        minWidth: { xs: "100px", sm: "200px" }
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            component="h5"
                            sx={{
                                my: 1.5,
                                mb: 5
                            }}
                        >
                            {_.address}
                        </Box>
                        <Box sx={{ width: { xs: "100%", sm: "auto" }, display: { xs: "flex", sm: "none" }, mb: 4 }}>
                            <DefaultBtn
                                text={translate("participate")}
                                isMail={true}
                                href={`mailto:${_.email}`}
                                style={{
                                    background: "#000",
                                    color: "#ffffff",
                                    border: "1px solid #ffffff",
                                    width: { xs: "100%", sm: "auto" },
                                    padding: { xs: "0.5rem 1rem", sm: "1rem 2rem" },
                                    minWidth: { xs: "100px", sm: "200px" }
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        )
    }