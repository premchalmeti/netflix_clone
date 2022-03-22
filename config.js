const common = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8888,
    ENV: process.env.ENV,
    BASE_DIR: __dirname,
    VIDEO_DIR: 'videos'
};


const production = {
    ...common
};

const development = {
    ...common
}


module.exports = process.env.ENV === 'prod'? production:development;
