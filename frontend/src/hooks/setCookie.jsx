import Cookies from "js-cookie";

const SetCookie = (cookieName, cookieValue) => {
    Cookies.set(cookieName, cookieValue, {
        expires: 1,
        secure: true,
        path: "/"
    });
}

export default SetCookie;