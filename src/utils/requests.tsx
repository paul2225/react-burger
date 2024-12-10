import Cookies from "js-cookie";

export const BASE_URL = "https://norma.nomoreparties.space/api/";
const TOKEN_ENDPOINT = 'auth/token'

type TPayload = {
    success: boolean;
    [key: string]: any;
}

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
};

function checkSuccess<T extends { success: boolean }>(res: T): Promise<T> {
    if (res && res.success) {
        return Promise.resolve(res);
    }

    return Promise.reject(`Ответ не success: ${res}`);
}

export function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
}

export const requestWithAuth = async (endpoint: string, method: string, data: any = undefined, attempts = 0): Promise<TPayload> => {
    if (attempts > 2) {
        return Promise.reject("unable to request data")
    }

    try {
        return fetch(`${BASE_URL}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('accessToken')!
            },
            body: data && JSON.stringify(data)
        })
            .then(checkResponse)
            .then(checkSuccess);
    } catch (error: any) {
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
        ? request<{ success: boolean, accessToken: string }>(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token}),
        })
        : Promise.reject(new Error("No refresh token"));
};