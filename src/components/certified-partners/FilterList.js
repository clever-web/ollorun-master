import React from 'react'
// @mui
import { Box, FormControl } from "@mui/material";
// import { Box, InputLabel, MenuItem, FormControl } from "@mui/material";
import Select from 'react-select';
// components
import useLocales from '../../hooks/useLocales';

const FilterList = ({ whereIn, advisorList, originalList, setUpFilter }) => {
    const [advisorNameList, setAdvisorNameList] = React.useState([]);
    const [companyNameList, setCompanyNameList] = React.useState([]);
    const [cityList, setCityList] = React.useState([]);
    const [countryList, setCountryList] = React.useState([]);

    const [advisorName, setAdvisorName] = React.useState(null);
    const [companyName, setCompanyName] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [country, setCountry] = React.useState(null);

    const { translate } = useLocales();

    const setupFilterList = (original) => {

        let tempAdvisorNameList = [];
        let tempCompanyNameList = [];
        let tempCityList = [];
        let tempCountryList = [];

        if (original.length) {
            tempCompanyNameList.push({
                value: original[0].companyName + "-" + "0",
                label: original[0].companyName
            });
            tempCityList.push({
                value: original[0].city + "-" + "0",
                label: original[0].city
            });
            tempCountryList.push({
                value: original[0] + "-" + "0",
                label: original[0].country
            });

            for (let i = 0; i < original.length; i++) {
                tempAdvisorNameList.push({
                    value: original[i].fName + "-" + original[i].id,
                    label: original[i].fName + " " + original[i].lName
                });

                for (let j = 0; j < tempCompanyNameList.length; j++) {
                    if (original[i].companyName === tempCompanyNameList[j].label) continue;
                    else tempCompanyNameList.push({
                        value: original[i].companyName + "-" + (original[i].id + 1),
                        label: original[i].companyName
                    })
                }
                for (let k = 0; k < tempCityList.length; k++) {
                    if (original[i].city === tempCityList[k].label) continue;
                    else tempCityList.push({
                        value: original[i].city + "-" + (original[i].id + 1),
                        label: original[i].city
                    })
                }
                for (let m = 0; m < tempCountryList.length; m++) {
                    if (original[i].country === tempCountryList[m].label) continue;
                    else tempCountryList.push({
                        value: original[i].country + "-" + (original[i].id + 1),
                        label: original[i].country
                    })
                }

            }
        }

        setAdvisorNameList(tempAdvisorNameList);
        setCompanyNameList(tempCompanyNameList);
        setCityList(tempCityList);
        setCountryList(tempCountryList);

    }

    const clearFilter = () => {
        setAdvisorName(null);
        setCompanyName(null);
        setCity(null);
        setCountry(null);
    }

    React.useEffect(() => {
        setupFilterList(originalList);
    }, [originalList])

    React.useEffect(() => {
        setUpFilter(advisorName, companyName, city, country);
    }, [advisorName, companyName, city, country])

    return (
        <Box sx={{ minWidth: 120, width: { xs: "100%", md: 250 } }}>
            <FormControl fullWidth sx={{ my: 2 }}>
                <Box>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={translate("advisor_name")}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={advisorNameList}
                        value={advisorName}
                        onChange={((e) => setAdvisorName(e))}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: "100%",
                                padding: "0.25rem 0.5rem",
                                borderColor: state.isFocused ? "#40fbdc !important" : "#2f3337",
                                boxShadow: "none",
                                background: "#000000",
                            }),
                            singleValue: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                            }),
                            menu: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#222",
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                // background: state.isFocused ? "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)": "inherit",
                            })
                        }}
                    />
                </Box>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
                <Box>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={translate("company_name")}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={companyNameList}
                        value={companyName}
                        onChange={((e) => setCompanyName(e))}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: "100%",
                                padding: "0.25rem 0.5rem",
                                borderColor: state.isFocused ? "#40fbdc !important" : "#2f3337",
                                boxShadow: "none",
                                background: "#000000",
                            }),
                            singleValue: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                            }),
                            menu: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#222",
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                // background: state.isFocused ? "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)": "inherit",
                            })
                        }}
                    />
                </Box>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
                <Box>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={translate("city")}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={cityList}
                        value={city}
                        onChange={((e) => setCity(e))}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: "100%",
                                padding: "0.25rem 0.5rem",
                                borderColor: state.isFocused ? "#40fbdc !important" : "#2f3337",
                                boxShadow: "none",
                                background: "#000000",
                            }),
                            singleValue: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                            }),
                            menu: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#222",
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                // background: state.isFocused ? "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)": "inherit",
                            })
                        }}
                    />
                </Box>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
                <Box>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={translate("country")}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={countryList}
                        value={country}
                        onChange={((e) => setCountry(e))}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: "100%",
                                padding: "0.25rem 0.5rem",
                                borderColor: state.isFocused ? "#40fbdc !important" : "#2f3337",
                                boxShadow: "none",
                                background: "#000000",
                            }),
                            singleValue: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                            }),
                            menu: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#222",
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                // background: state.isFocused ? "linear-gradient(92.94deg, #3FFBDC 4.54%, #E1B559 93.54%)": "inherit",
                            })
                        }}
                    />
                </Box>
            </FormControl>
            <Box
                component="button"
                onClick={clearFilter}
                sx={{
                    mt: 2,
                    display: "inherit",
                    border: "1px #2f3337 solid",
                    padding: "0.5rem 2rem",
                    borderRadius: "0.75rem",
                    marginRight: "0",
                    cursor: "pointer",
                    color: "#ffffff !important",
                    textAlign: "center",
                    background: "black",
                    width: "100%",
                }}
            >
                {translate("clear_filter")}
            </Box>

        </Box>
    )
}

export default FilterList;
