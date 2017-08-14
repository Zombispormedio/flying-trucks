export const configureEnvironment = () => {
    if (process.env.WEBTASK == void 0)
        require('dotenv').config()
}