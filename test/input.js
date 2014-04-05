var dogedc = require('../index');

exports['Accepts 1 character input'] = function (test) {
    dogedc('2', function (err, ddc) {
        test.strictEqual(typeof ddc, 'object');
        test.strictEqual(ddc.classNumber, '002');
        test.done();
    });
};

exports['Accepts 2 character input'] = function (test) {
    dogedc('20', function (err, ddc) {
        test.strictEqual(typeof ddc, 'object');
        test.strictEqual(ddc.classNumber, '020');
        test.done();
    });
};

exports['Accepts 3 character input'] = function (test) {
    dogedc('020', function (err, ddc) {
        test.strictEqual(typeof ddc.classNumber, 'string');
        test.strictEqual(typeof ddc.className, 'string');
        test.strictEqual(typeof ddc.dogeClassName, 'string');
        test.done();
    });
};

exports['Passes error to callback on 4 character input'] = function (test) {
    dogedc('1234', function (err, ddc) {
        test.notStrictEqual(null, err);
        test.ok(err instanceof Error);
        test.done();
    });
};
