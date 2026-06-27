// by helping chatGPT create tokenManager avoid circular dipendency
let token = ''
let refreshToken = ''

export const setToken = (value)=>{
    token = value
}

export const setRefreshToken = (value)=>{
    refreshToken = value
}

export const getToken = () => token;
export const getRefreshToken = () => refreshToken;