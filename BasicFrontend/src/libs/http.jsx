import axios from "axios";

const http = axios.create();

let authToken;

export function setToken(token){
    authToken = token;
}

http.interceptors.request.use( (config) => {
if(authToken){
    config.headers["Authorization"] = `${authToken.prefix} ${authToken.token}`;
}
    return config;
}

);

export default http;