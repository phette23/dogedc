#!/usr/bin/env node
var dogedc = require('../index'),
    arg = process.argv[2],
    handleError = function (err) {
        if (err) {
            process.stderr.write(err.message + '\n');
            process.exit(1);
        }
    },
    usage = function () {
        console.log('Doge Decimal Classification\n\nUsage:\n\tdogedc [class number]\tPrint Doge Decimal Class. Selects a random class number if none given.');
    };

// arg passed
if (arg) {
    // usage info
    if (['help', '--help', '-h', 'usage'].indexOf(arg) != -1) {
        usage();
        process.exit(0);
    }

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
