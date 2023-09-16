import Cookie from "js-cookie";

class Cookies {
    async setCookie(cookieName, cookieValue) {
        Cookie.set(cookieName, cookieValue, {
            expires: 1,
            secure: true,
            path: "/"
        });
    }

    async getCookie(cookieName) {
        return Cookie.get(cookieName);

    }

    async removeCookie(cookieName) {
        Cookie.remove(cookieName);
    }
}

export default new Cookies();