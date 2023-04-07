
export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateCityCountry = (value) => {
    return value.includes("/");
}

export const validatePhone = value => {
    //  return value.match(
    //   /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    //  );
    let _trimmed = value.replace(/\s/g, '');
    return _trimmed.includes("+") && _trimmed.length >= 7 && _trimmed.length <= 16
}