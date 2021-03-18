const ncp = require('ncp').ncp;

const SRC_SIGNING_FILE = 'resources/android/release-signing.properties';
const DEST_SIGNING_FILE = 'platforms/android/release-signing.properties';

module.exports = function (context) {

    ncp(SRC_SIGNING_FILE, DEST_SIGNING_FILE, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('done!');
        }
    });

};
