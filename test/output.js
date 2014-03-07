var dogedc = require('../index');

exports['Output is an object'] = function (test) {
    dogedc('020', function (ddc) {
        test.strictEqual(typeof ddc, 'object');
        test.done();
    });
}

exports['Output has the right keys'] = function (test) {
    dogedc('020', function (ddc) {
        test.notStrictEqual(typeof ddc.classNumber, 'undefined');
        test.notStrictEqual(typeof ddc.className, 'undefined');
        test.notStrictEqual(typeof ddc.dogeClassName, 'undefined');
        test.done();
    });
}

exports['Output\'s properties are all strings'] = function (test) {
    dogedc('020', function (ddc) {
        test.strictEqual(typeof ddc.classNumber, 'string');
        test.strictEqual(typeof ddc.className, 'string');
        test.strictEqual(typeof ddc.dogeClassName, 'string');
        test.done();
    });
}

exports['Shorthand usage works'] = function (test) {
    dogedc(function (ddc) {
        test.strictEqual(typeof ddc, 'object');
        test.strictEqual(typeof ddc.classNumber, 'string');
        test.strictEqual(typeof ddc.className, 'string');
        test.strictEqual(typeof ddc.dogeClassName, 'string');
        test.done();
    });
}
