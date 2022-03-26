const path = require('path');


const common = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8888,
    ENV: process.env.ENV,
    BASE_DIR: __dirname,
    VIDEO_DIR: path.join(__dirname, 'videos'),
    DB: {
        URL: 'mongodb://127.0.0.1:27017/netflix_db',
        COLLECTIONS: {
            SHOWS: 'shows'
        }
    }    
};


const production = {
    ...common
};

const development = {
    ...common
}


module.exports = process.env.ENV === 'prod'? production:development;
