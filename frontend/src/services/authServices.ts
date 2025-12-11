import api from './apiServices.ts'


export function getAuthModules() {
return api.get('/auth/modules')
}


export function resetPwdRequest(username: string,) {
    return api.post('/auth/reset-pwd/request', { username })
}

export function resetPwdConfirm(token: string, password: string) {
    return api.post('/auth/reset-pwd/confirm', { token, password })
}