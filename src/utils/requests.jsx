import Cookies from "js-cookie";

export const BASE_URL = "https://norma.nomoreparties.space/api/";
const TOKEN_ENDPOINT = 'auth/token'

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }

    return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const requestWithAuth = async (endpoint, method, data = undefined, attempts = 0) => {
    if (attempts > 2) {
        Promise.reject("unable to request data")
    }

    try {
        return fetch(`${BASE_URL}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('accessToken')
            },
            body: data && JSON.stringify(data)
        })
            .then(checkResponse)
            .then(checkSuccess);
    } catch (error) {
        if (error.message === "jwt expired") {
            const newTokenData = await refreshToken();

            if (newTokenData.success) {
                Cookies.set('accessToken', newTokenData.accessToken, {
                    expires: new Date(Date.now() + 20 * 60 * 1000),
                    secure: true,
                    sameSite: 'strict',
                    path: '/'
                });

                return requestWithAuth(endpoint, method, data, attempts + 1);
            }
        }

        return Promise.reject(error);
    }
}

export const refreshToken = async () => {
    const token = localStorage.getItem("refreshToken");
    return token
        ? request(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token}),
        })
        : Promise.reject(new Error("No refresh token"));
};