require('dotenv').config();
const config = require('./config');
const express = require('express');
const showRouter = require('./routes/shows');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));
 

// log middleware
app.use((req, res, next) => {
    console.log(`URL HIT: ${req.url}`);
    next();
});


// routers
app.use('/', showRouter);


// error handle
app.get('*', (req, res, next)=>{
    res.end('Invalid path: ' + req.path);
    console.error('Invalid path: '+ req.path);
    next();
});


app.listen(config.PORT, config.HOST, () => {
    console.log(`Server running in ${config.ENV} mode`);
    console.info(`Server running on ${config.HOST}:${config.PORT}`);
});
