#!/usr/bin/env node
var dogedc = require('../index'),
    arg = process.argv[2];

// arg passed
if (arg) {
    dogedc(arg, function (err, ddc) {
        process.stdout.write(ddc.dogeClassName + '\n');
    });
} else {
    // no arg, just do random
    dogedc(function (err, ddc) {
        process.stdout.write(ddc.dogeClassName + '\n');
    });
}
