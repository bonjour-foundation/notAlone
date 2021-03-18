#!/usr/bin/env node
'use strict';

// https://gist.github.com/Sroose/d3db4178babbab1b39b68e9889e7869b

// THIS HOOK WILL ADD THE NEEDED HEADER SEARCH PATHS FOR THE BRANCH SDK (avoids error: 'Branch.h' file not found)
// Reference in config.xml in platform IOS:  <hook type="after_plugin_install" src="hooks/AfterPluginInstall_BRANCHSDK.js" />

let cwd = process.cwd();
let fs = require('fs');
let path = require('path');

console.log('hook_branch.js, attempting to modify build.xcconfig');

let xcConfigBuildFilePath = path.join(cwd, 'platforms', 'ios', 'cordova', 'build.xcconfig');
console.log('xcConfigBuildFilePath: ', xcConfigBuildFilePath);
let lines = fs.readFileSync(xcConfigBuildFilePath, 'utf8').split('\n');

let headerSearchPathLineNumber;
lines.forEach((l, i) => {
    if (l.indexOf('HEADER_SEARCH_PATHS') > -1) {
        headerSearchPathLineNumber = i;
    }
});

if (lines[headerSearchPathLineNumber].indexOf('Branch-SDK') > -1) {
    console.log('build.xcconfig already setup for Branch-SDK');
    return;
}

lines[headerSearchPathLineNumber] += ' "${PODS_ROOT}/Branch/Branch-SDK/Branch-SDK" "${PODS_ROOT}/Branch/Branch-SDK/Branch-SDK/Networking"';

let newConfig = lines.join('\n');

fs.writeFile(xcConfigBuildFilePath, newConfig, function (err) {
    if (err) {
        console.log('error updating build.xcconfig, err: ', err);
        return;
    }
    console.log('successfully updated HEADER_SEARCH_PATHS in build.xcconfig');
});
