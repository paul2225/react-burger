export const BASE_API_URL = "https://norma.nomoreparties.space/api";

export async function request(url, options) {
    let result = await fetch(url, options);

    if (result.ok) {
        return result.json()
    }

    return Promise.reject(result.status);
}