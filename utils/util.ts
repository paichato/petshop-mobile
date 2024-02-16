const IS_PHONE_INVALID = (phonenumber: string) => {

    return Boolean(
        phonenumber.length < 9 ||
        Number(phonenumber) < 820000000 ||
        Number(phonenumber) > 879999999
    )
}
const IS_PASS_VALID = (password: string) => {
    return Boolean(password.length < 5)
}

export { IS_PHONE_INVALID, IS_PASS_VALID };