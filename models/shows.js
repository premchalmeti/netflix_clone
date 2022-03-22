const config = require('../config');
const path = require('path');


shows = [{
    id: 1,
    name: 'The Good Doctor',
    ratings: '8.2',
    banner: 'https://www.imdb.com/title/tt6470478/mediaviewer/rm1094250497/?ref_=tt_ov_i',
    path: path.join(config.BASE_DIR, config.VIDEO_DIR, 'the_good_doctor.mkv')
}];


function notFoundError(msg) {
    this.msg = msg;
    this.status_code = 404;
}


function alreadyExists(msg) {
    this.msg = msg;
    this.status_code = 409;
}


function createShow(info) {
    if (findShow(info.id) > -1) { throw new alreadyExists(info.id + " already exists"); }
    shows.append(info);
    return true;
}


function get(id) {
    if (id) { return shows[findShow(id)]; }
    return shows;
}


function findShow(id) {
    const idx = shows.findIndex(show => show.id == id);
    if(idx < -1)
        throw new notFoundError(id + " show not found");
    return idx;
}


function updateShow(id, info) {
    const idx = findShow(id);
    shows[idx] = info;
    return true;
}


function deleteShow(id) {
    shows = shows.splice(findShow(id), 1);
    return true
}


module.exports = {
    notFoundError,
    alreadyExists,
    createShow,
    get,
    findShow,
    updateShow,
    deleteShow
}
