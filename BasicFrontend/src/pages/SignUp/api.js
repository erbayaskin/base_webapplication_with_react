import axios from "axios";
export function signUp(body){
    return axios.post('signServer/user/register',body);
}