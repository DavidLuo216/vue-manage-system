import request from '../utils/request';

export const UserApi = {
    login(params){
        return request({
            url: 'login',
            method: 'get',
            params
        })
    },
    register(params){
        return request({
            url: 'register',
            method: 'post',
            params
        });
    },
    getInfo(params){
        return request({
            url: 'getUserByPhone',
            method: 'get',
            params
        })
    },
    updateInfo(params){
        return request({
            url: 'updateUser',
            method: 'post',
            params
        })
    },
}
