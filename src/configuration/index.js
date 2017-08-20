export const isMongodb = () =>{
    return process.env.DB_TYPE === 'mongodb'
}

export const isDevelopment = () => {
    return process.env.NODE_ENV == 'development' || process.env.NODE_ENV == void 0
}

export const configureEnvironment = () => {
    if (isDevelopment()) {
        require('dotenv').config()
    }
}