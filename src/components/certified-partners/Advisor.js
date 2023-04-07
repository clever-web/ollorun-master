import React from 'react'
import axios from 'axios'

// @mui
import { Box } from "@mui/material";
// component
import FilterList from './FilterList';
import AdvisorList from './AdvisorList';
// import useLocales from '../../hooks/useLocales';
// utils
import { notifyToast } from '../modal/ApplyModal';
import { API_URL } from '../../config';
export default function Advisor() {
    const [originalList, setOriginalList] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);

    // const { translate } = useLocales();

    const setUpFilter = (advisorName, companyName, city, country) => {
        let newFiltered = [];

        if (originalList.length) {
            if (!advisorName && !companyName && !city && !country) {
                newFiltered = originalList;
            }
            else if (advisorName && !companyName && !city && !country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName)) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (!advisorName && companyName && !city && !country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (companyName.label === originalList[i].companyName) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (advisorName && companyName && !city & !country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (companyName.label === originalList[i].companyName &&
                        advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName)
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (!advisorName && !companyName && city && !country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (city.label === originalList[i].city
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (advisorName && !companyName && city && !country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (city.label === originalList[i].city &&
                        advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName)
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }

            else if (!advisorName && companyName && city && !country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (city.label === originalList[i].city &&
                        companyName.label === originalList[i].companyName
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (advisorName && companyName && city && !country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (city.label === originalList[i].city &&
                        companyName.label === originalList[i].companyName &&
                        advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName)
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            // 
            else if (!advisorName && !companyName && !city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (country.label === originalList[i].country
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (advisorName && !companyName && !city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName) &&
                        country.label === originalList[i].country
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (advisorName && companyName && !city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName) &&
                        country.label === originalList[i].country &&
                        companyName.label === originalList[i].companyName
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (!advisorName && companyName && !city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (country.label === originalList[i].country &&
                        companyName.label === originalList[i].companyName
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (!advisorName && !companyName && city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (country.label === originalList[i].country &&
                        city.label === originalList[i].city
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (advisorName && !companyName && city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (country.label === originalList[i].country &&
                        city.label === originalList[i].city &&
                        advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName)
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (!advisorName && companyName && city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (country.label === originalList[i].country &&
                        city.label === originalList[i].city &&
                        companyName.label === originalList[i].companyName
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }
            else if (advisorName && companyName && city && country) {
                for (let i = 0; i < originalList.length; i++) {
                    if (country.label === originalList[i].country &&
                        city.label === originalList[i].city &&
                        companyName.label === originalList[i].companyName &&
                        advisorName.label.replace(" ", "") === (originalList[i].fName + originalList[i].lName)
                    ) {
                        newFiltered.push(originalList[i]);
                    }
                }
            }

            setFilteredList(newFiltered)
        }
    }

    // call api to get advisor list data
    const getAdvisorList = async () => {

        try {
            const response = await axios({
                method: "post",
                url: `${API_URL}/user/get-advisor`
            });

            if (response.data.status === 200) {
                setFilteredList(response.data.data);
                setOriginalList(response.data.data);
            }
            else {
                notifyToast("error", response.data.msg);
            }

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getAdvisorList();
    }, [])

    return (
        <Box sx={{ display: { xs: "inherit", sm: "flex" } }}>
            <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
                <FilterList whereIn="advisor" advisorList={filteredList} originalList={originalList} setUpFilter={setUpFilter} />
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
                <AdvisorList advisorList={filteredList} />
                {/* <Box component="h1" textAlign="center">{translate("coming_soon")}</Box> */}
            </Box>
        </Box>
    )
}
