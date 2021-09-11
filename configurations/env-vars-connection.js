const config = {
    production: {},
    default: {
        PORT: process.env.PORT,
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI_DEV,
    }
}


exports.get = function get(env) {
    return config[env] || config.default
}
