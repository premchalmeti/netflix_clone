const { getShow } = require('../models/shows');
const fs = require('fs');
const path = require('path');
const config = require('../config');


async function home(req, res) {
    try {
        res.render('netflix_home.pug', {
            "title": "Netflix - Watch TV Shows Online, Watch Series Online",
            "shows": await getShow()
        });
    } catch(error) {
        if (error instanceof shows.notFoundError) {
            res.status(error.status_code).end("Oops movie not found");
        }
        res.status(500).end('Unknown error occured');
    }
}


// embeds video tag with show detail
async function play(req, res) {
    try {
        res.render('netflix_player.pug', {
            show: await getShow(req.params.id)
        })
    } catch(error) {
        if (error instanceof shows.notFoundError) {
            res.status(error.status_code).end('Oops movie not found');
        }
        res.status(500).end('Unknown error occured');
    }
}


// sends a response stream for video
async function stream(req, res) {
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const range = req.headers.range;
    if(!range) {
        res.status(400).send('Requires Range Header');
    }
    const show = await getShow(req.params.id);
    const videPath = path.join(config.VIDEO_DIR, show.path);
    const videoSize = fs.statSync(videPath).size;
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
    const videoStream = fs.createReadStream(videPath, { start, end });
    videoStream.pipe(res);
}


module.exports = {
    home,
    play,
    stream
}
