#!/usr/bin/env node
var dogedc = require('../index'),
    arg = process.argv[2],
    handleError = function (err) {
        if (err) {
            process.stderr.write(err.message + '\n');
            process.exit(1);
        }
    };

// arg passed
if (arg) {
    dogedc(arg, function (err, ddc) {
        handleError(err);
        process.stdout.write(ddc.dogeClassName + '\n');
    });
} else {
    // no arg, just do random
    dogedc(function (err, ddc) {
        handleError(err);
        process.stdout.write(ddc.dogeClassName + '\n');
    });
}
