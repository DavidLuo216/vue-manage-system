import request from '../utils/request';

export const ResumeApi = {
    // 教育经历接口
    addEducation(params){
        return request({
            url: 'insertEducationEntry',
            method: 'post',
            params
        })
    },
    updateEducation(params){
        return request({
            url: 'updateEducationEntry',
            method: 'post',
            params
        });
    },
    deleteEducation(params){
        return request({
            url: 'deleteEducationEntry',
            method: 'post',
            params
        });
    },
    getEducationList(params){
        return request({
            url: 'getEducationEntryList',
            method: 'get',
            params
        });
    },
    // 实习经历接口
    addExperiment(params){
        return request({
            url: 'insertExperimentEntry',
            method: 'post',
            params
        })
    },
    updateExperiment(params){
        return request({
            url: 'updateExperimentEntry',
            method: 'post',
            params
        });
    },
    deleteExperiment(params){
        return request({
            url: 'deleteExperimentEntry',
            method: 'post',
            params
        });
    },
    getExperimentList(params){
        return request({
            url: 'getExperimentEntryList',
            method: 'get',
            params
        });
    },
    // 语言技能接口
    addLanguage(params){
        return request({
            url: 'insertLanguageEntry',
            method: 'post',
            params
        })
    },
    updateLanguage(params){
        return request({
            url: 'updateLanguageEntry',
            method: 'post',
            params
        });
    },
    deleteLanguage(params){
        return request({
            url: 'deleteLanguageEntry',
            method: 'post',
            params
        });
    },
    getLanguageList(params){
        return request({
            url: 'getLanguageEntryList',
            method: 'get',
            params
        });
    },
}
