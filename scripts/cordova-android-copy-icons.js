const ncp = require('ncp').ncp;

const SRC_DIR = 'resources/android/icon_notification/';
const DEST_DIR = 'platforms/android/app/src/main/res/';

module.exports = function (context) {

    ncp(SRC_DIR, DEST_DIR, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('done!');
        }
    });

};
