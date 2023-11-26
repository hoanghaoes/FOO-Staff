// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken(); // retrieve the access token from where you've stored it
    const refreshToken = await getRefreshToken(); // retrieve the refresh token from where you've stored it

    // add the access token to the request's headers
    config.headers.Authorization = `Bearer ${accessToken}`;

    // if the access token has expired, refresh it using the refresh token
    if (hasTokenExpired(accessToken)) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;
