import http from "../../libs/http"

export function getUser(id){
    return http.get(`signServer/user/get/${id}`);
}
export function deleteUserInfos(id){
    return http.delete(`signServer/user/delete/${id}`);
}

export function updateUser(user){
    return http.post(`signServer/user/update`,user);
}