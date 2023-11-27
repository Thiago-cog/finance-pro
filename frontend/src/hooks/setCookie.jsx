import Cookies from "js-cookie";

const SetCookie = (cookieName, cookieValue) => {
    Cookies.set(cookieName, cookieValue, {
        expires: 1,
        secure: false,
        path: "/"
    });
}

export default SetCookie;