var fs = require('fs'); // used to get dewey.json data

// code path: dogedc => DDC gets class number => lookup class name in dewey.json => convert class name to Doge => execute provided callback

function DDC (num) {
    var validationResult = this.validate(num);

    // no num given or shorthand ddc(cb) usage? assign random num
    if (!num || typeof num === 'function') {
        this.classNumber = this.getRandomClassNum();
    // validate user input
    } else if (validationResult instanceof Error) {
        return validationResult;
    } else {
        this.classNumber = this.leadingZeroes(num);
    }
}

// ensure input is 1-3 digits, valid DDC class number
DDC.prototype.validate = function (num) {
    var int = parseInt(num);

    if (int > 999) {
        return new Error('Class number is too high; DDC only goes up to 999.');
    } else if (int < 0) {
        return new Error('Class number is less than 0; DDC stops at 000.');
        // test if input is not all digits
    } else if (!/^\d+$/.test(num)) {
        return new Error('Class is non-numeric; DDC is 000-999.');
    }
};

DDC.prototype.leadingZeroes = function (s) {
    // ensure class is 3 chars long
    var len = s.length;

    if (len == 3) {
        return s;
    } else if (len == 2) {
        return '0' + s;
    } else {
        // implies len === 1
        return '00' + s;
    }
}

DDC.prototype.getRandomClassNum = function () {
    // DDC classes go from 000 - 999
    // @todo don't return unassigned class numbers, e.g. 991
    // @todo handle (optional number) classes, e.g. 922
    var rando = Math.floor(Math.random() * 1000)
        , classNum = rando.toString();
        return this.leadingZeroes(classNum);
}

function findClassName (cb, ddc) {
    // load map of Dewey Classes
    fs.readFile(__dirname + '/data/dewey.json', {
            'encoding': 'utf-8'
        }, function (err, data) {
            var dewey = JSON.parse(data);

            if (err) {
                cb(err, null);
                return;
            } else if (ddc instanceof Error) {
                // DDC returned an error
                // e.g. class number was too high or low
                cb(ddc, null);
                return;
            }

            ddc.className = dewey[ddc.classNumber];
            ddc.dogeClassName = toDoge(ddc.className);
            cb(null, ddc);
    });
}

/**
 * lookup the Doge Decimal Class name for a Dewey number
 * if no param is given, returns a random one
 * @param  {String|Number} num DDC class number
 * @param {Function} cb callback executed once it's all done
 */
function dogedc (num, cb) {
    var ddc = new DDC(num);

    // handle ddc(cb) shorthand
    if (typeof num === 'function') {
        cb = num;
    }

    findClassName(cb, ddc);
}

/**
 * Given string, turn it into Dogespeak
 * @param  {String} str boring normal language
 * @return {String}     Such Dogespeak!
 */
function toDoge (str) {
    var flip = function() {
            // flip a coin
            return !!Math.round(Math.random());
        }
        // lowercase, strip semicolons, commas, & stop words
        , clean = function(s) {
            var stops = ['for', 'of', 'the', 'in', '&', 'or']
                , output = s.toLowerCase().replace(/;|,/g,'');

            stops.forEach(function (item) {
                output = output.replace(RegExp(item + ' ', 'g'),'');
            });

            return output;
        }
        // return random item of array
        , rand = function (array) {
            return array[Math.floor(Math.random() * array.length)];
        }
        , arr = clean(str).split(" ")
        , len = arr.length
        , dogeWords = ['Many', 'Much', 'So', 'Such', 'Very']
        , out = [];

    for (var i = 0; i < len; i++) {
        out[i] = rand(dogeWords) + ' ' + arr[i] + '. ';
    }

    // randomly add "Wow" half of the time
    if (flip()) {
        out.push('Wow.');
    }

    return out.join('').trim();
}

module.exports = dogedc;
// expose toDoge function too
// in case someone wants to use it on other strings
module.exports.toDoge = toDoge;
