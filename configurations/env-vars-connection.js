const config = {
    production: {},
    default: {
        PORT: process.env.PORT,
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI_DEV,
        NEWSECRET: process.env.NEWSECRET,
    }
}


exports.get = function get(env) {
    return config[env] || config.default
}
