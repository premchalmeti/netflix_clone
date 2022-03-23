const config = require('../config');
const path = require('path');


shows = [{
    id: 1,
    title: '83',
    title_img: 'https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABQPIgYvylQ4BYAWr1-T2yUiL-bOe7l5TaIVi5VXk48FXuLbVFspTbzo0mtjS-hBsImUScmR8NtdXCVyjtW4sule_bqThGvhnMFwq.webp?r=1c9',
    ratings: '7.4',
    banner: 'https://occ-0-2087-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZkf7Q9979J2jV2V7NjidxuLLLiC6zaD5UtV1wFofN07TVitnZSt9dOjYOMekeqI20_i_VYvm18DRs_nQ4sNZPDYM_7c.webp?r=c0d',
    path: path.join(config.VIDEO_DIR, '83.mkv'),
    synopsis: 'Amid doubt and derision,\
    indomitable captain Kapil Dev leads\
    India&#x27;s struggling cricket team\
    to make history at the 1983 World\
    Cup. Based on true events.'
}, {
    id: 2,
    title: 'The Good Doctor',
    ratings: '8.2',
    banner: 'https://www.imdb.com/title/tt6470478/mediaviewer/rm1094250497/?ref_=tt_ov_i',
    path: path.join(config.VIDEO_DIR, 'the_good_doctor.mkv'),
    synopsis: 'The good doctor'
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
