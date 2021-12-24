import request from '../utils/request';

export const UserApi = {
    login(params){
        return request({
            url: 'login',
            method: 'get',
            params
        });
    },
    register(params){
        return request({
            url: 'register',
            method: 'post',
            params
        });
    }
}
