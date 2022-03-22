const shows = require('../models/shows');
const fs = require('fs');


function get(req, res) {
    try {
        // res.json(shows.get(req.args.get));
        res.render('home.pug', {
            "title": "Watch TV Shows Online, Watch Series Online",
            "shows": shows.get()
        });
    } catch(error) {
        if (error instanceof shows.notFoundError) {
            res.status(error.status_code).end("Oops movie not found");
        }
        res.status(500).end('Unknown error occured');
    }
}


// embeds video tag with show detail
function play(req, res) {
    try {
        res.render('show.pug', {
            show: shows.get(req.params.id)
        })
    } catch(error) {
        if (error instanceof shows.notFoundError) {
            res.status(error.status_code).end('Oops movie not found');
        }
        res.status(500).end('Unknown error occured');
    }
}


// sends read stream for video
function stream(req, res) {
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const range = req.headers.range;
    if(!range) {
        res.status(400).send('Requires Range Header');
    }
    const show = shows.get(req.params.id);
    const videoSize = fs.statSync(show.path).size;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(show.path, { start, end });
    videoStream.pipe(res);
}


module.exports = {
    get,
    play,
    stream
}
