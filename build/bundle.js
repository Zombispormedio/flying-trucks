/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("rx");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _got = __webpack_require__(5);

var _got2 = _interopRequireDefault(_got);

var _cheerio = __webpack_require__(6);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _rx = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Module = {};

Module.fromUrl = function (url) {
    return _rx.Observable.fromPromise((0, _got2.default)(url)).map(function (response) {
        return response.body;
    }).map(_cheerio2.default.load);
};

exports.default = Module;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

var _rx = __webpack_require__(0);

var _strings = __webpack_require__(3);

var _observables = __webpack_require__(1);

var _observables2 = _interopRequireDefault(_observables);

var _base = __webpack_require__(7);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var source = _rx.Observable.fromArray(Object.keys(_base2.default)).flatMap(function (key) {
  var _domains$key = _base2.default[key],
      url = _domains$key.url,
      exec = _domains$key.exec;

  return _observables2.default.fromUrl(url).flatMap(exec).map(function (value) {
    return { key: key, value: value };
  });
}); /*.reduce((memo, item)=>({
      ...memo, 
      [item.key]: item.value
    }), {})*/

var subscription = source.subscribe(function (x) {
  console.log((0, _strings.pretty)(_templateObject, x));
}, function (err) {
  console.log('Error: ' + err);
}, function () {
  console.log('Completed');
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pretty = undefined;

var _ramda = __webpack_require__(4);

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pretty = exports.pretty = function pretty(strings) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    var tempValues = _ramda2.default.clone(values);
    return strings.reduce(function (memo, item) {
        var rest = tempValues.splice(0, 1);
        memo += item;
        if (rest.length > 0) {
            memo += JSON.stringify(rest[0], null, " ");
        }
        return memo;
    }, "");
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("got");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _movies = __webpack_require__(8);

var _movies2 = _interopRequireDefault(_movies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(9).config();

exports.default = {
    movies: {
        exec: _movies2.default,
        url: process.env.MOVIES /*,
                                tvSeries:{
                                   exec: require("./series"),
                                   url: process.env.TV_SERIES
                                }*/
    } };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function ($) {
    var source = _rx.Observable.just($).map(getMoviesList).flatMap(_rx.Observable.fromArray).take(2);

    return _rx.Observable.zip(source, _rx.Observable.interval(CONNECTION_INTERVAL)).map(function (wrapper) {
        return wrapper[0];
    }).flatMap(getMovieDetail);
};

var _rx = __webpack_require__(0);

var _observables = __webpack_require__(1);

var _observables2 = _interopRequireDefault(_observables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONNECTION_INTERVAL = 1000;
var jsTorrentRegex = /openTorrent/g;
var locationRegex = /window\.location\.href.*/g;

var getMoviesList = function getMoviesList($) {
    return $('ul.pelilist').children('li').map(function (i, elem) {
        var parent = $(this).children('a');
        return {
            title: parent.find('h2').first().text().trim(),
            link: parent.attr('href'),
            imageUrl: parent.find('img').first().attr('src'),
            format: parent.find('span').first().text()
        };
    }).get();
};

var bindTorrentLinkInMovie = function bindTorrentLinkInMovie(_ref) {
    var movie = _ref.movie,
        $ = _ref.$;

    var possibleScripts = [];
    $("script").filter(function (index, elem) {
        return elem.children.length == 1;
    }).each(function (index, elem) {
        return possibleScripts.push(elem.children[0].data);
    });
    var script = possibleScripts.find(function (elem) {
        return jsTorrentRegex.test(elem);
    });
    var line = script.match(locationRegex)[0];
    var torrentUrl = line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""));
    return _extends({}, movie, { torrentUrl: torrentUrl });
};

var getMovieDetail = function getMovieDetail(movie) {
    return _observables2.default.fromUrl(movie.link).map(function ($) {
        return {
            movie: movie,
            $: $
        };
    }).map(bindTorrentLinkInMovie);
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);