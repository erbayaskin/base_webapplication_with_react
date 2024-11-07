import axios from "axios";
export function login(body){
    return axios.post('signServer/user/login',body);
}