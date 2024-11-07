import http from "../../libs/http"
export function getUserList(page = 0,size = 5){
    return http.get('signServer/user/getAllPageable',{params:{page,size}});
}