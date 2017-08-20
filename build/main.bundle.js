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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("rx");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var isDevelopment = exports.isDevelopment = function isDevelopment() {
    return process.env.NODE_ENV == 'development' || process.env.NODE_ENV == void 0;
};

var configureEnvironment = exports.configureEnvironment = function configureEnvironment() {
    if (isDevelopment()) {
        __webpack_require__(13).config();
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = exports.harvester = undefined;

var _harvester = __webpack_require__(14);

var _harvester2 = _interopRequireDefault(_harvester);

var _lowdb = __webpack_require__(15);

var _lowdb2 = _interopRequireDefault(_lowdb);

var _mongodb = __webpack_require__(18);

var _mongodb2 = _interopRequireDefault(_mongodb);

var _configuration = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var harvester = exports.harvester = _harvester2.default;

var storeModule = void 0;
if ((0, _configuration.isDevelopment)()) {
    storeModule = _lowdb2.default;
} else {
    storeModule = _mongodb2.default;
}

var store = exports.store = storeModule;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _got = __webpack_require__(26);

var _got2 = _interopRequireDefault(_got);

var _cheerio = __webpack_require__(27);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createProcessor = undefined;

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _create = __webpack_require__(28);

var _create2 = _interopRequireDefault(_create);

var _defineProperty2 = __webpack_require__(29);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(6);

var _extends4 = _interopRequireDefault(_extends3);

var _slicedToArray2 = __webpack_require__(1);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(30);

var _entries2 = _interopRequireDefault(_entries);

var _observables = __webpack_require__(7);

var _observables2 = _interopRequireDefault(_observables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultDescriptor = {
    enumerable: true,
    configurable: false,
    writable: false
};

var createProcessor = exports.createProcessor = function createProcessor(prototype, options) {
    var descriptors = (0, _entries2.default)(options).reduce(function (memo, _ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return (0, _extends4.default)({}, memo, (0, _defineProperty3.default)({}, key, (0, _extends4.default)({}, defaultDescriptor, {
            value: value
        })));
    }, {});
    return (0, _create2.default)(prototype, descriptors);
};

var Processor = function () {
    function Processor(initUrl, harvester, store) {
        (0, _classCallCheck3.default)(this, Processor);

        this.harvester = harvester;
        this.store = store;
        this.initUrl = initUrl;
    }

    (0, _createClass3.default)(Processor, [{
        key: 'process',
        value: function process() {
            return _observables2.default.fromUrl(this.initUrl);
        }
    }]);
    return Processor;
}();

exports.default = Processor;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/taggedTemplateLiteral");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pretty = undefined;

var _stringify = __webpack_require__(11);

var _stringify2 = _interopRequireDefault(_stringify);

var _ramda = __webpack_require__(12);

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
            memo += (0, _stringify2.default)(rest[0], null, " ");
        }
        return memo;
    }, "");
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(1);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCRIPT_TORRENT_REGEX = /openTorrent/g;
var HREF_REGEX_IN_SCRIPT = /window\.location\.href.*/g;

var Module = {};

Module.getMoviesList = function ($) {
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

var getContentByRegexp = function getContentByRegexp($, selector, regexp) {
    var scripts = [];
    $(selector).filter(function (_, _ref) {
        var children = _ref.children;
        return children.length == 1;
    }).each(function (_, _ref2) {
        var children = _ref2.children;

        var _children = (0, _slicedToArray3.default)(children, 1),
            data = _children[0].data;

        scripts.push(data);
    });
    return scripts.find(function (content) {
        return regexp.test(content);
    });
};

Module.getTorrentLink = function ($) {
    var script = getContentByRegexp($, "script", SCRIPT_TORRENT_REGEX);
    var matches = script.match(HREF_REGEX_IN_SCRIPT);

    var _matches = (0, _slicedToArray3.default)(matches, 2),
        line = _matches[0],
        _ = _matches[1];

    return line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""));
};

exports.default = Module;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lowdb = __webpack_require__(16);

var _lowdb2 = _interopRequireDefault(_lowdb);

var _fileAsync = __webpack_require__(17);

var _fileAsync2 = _interopRequireDefault(_fileAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _lowdb2.default)('db.json', { storage: _fileAsync2.default });

var Module = {};

Module.connectDatabase = function () {
    return db.defaults({ movies: [], series: [] }).write();
};

Module.getMovieById = function (id) {
    return db.get('movies').find({ id: id }).value();
};

Module.persistMovie = function (movie) {
    return db.get('movies').push(movie).write();
};

exports.default = Module;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lowdb/lib/storages/file-async");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Module = {};

Module.getSerieByName = function () {};

exports.default = Module;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMovieProcessor = undefined;

var _movies = __webpack_require__(20);

var _movies2 = _interopRequireDefault(_movies);

var _base = __webpack_require__(8);

var _datasource = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMovieProcessor = exports.createMovieProcessor = function createMovieProcessor(url) {
    var optionsProcessor = {
        name: 'movies',
        initUrl: url || process.env.MOVIES_URL,
        harvester: _datasource.harvester,
        store: _datasource.store
    };
    return (0, _base.createProcessor)(_movies2.default.prototype, optionsProcessor);
};

exports.default = function () {
    return [createMovieProcessor()];
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(21);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = __webpack_require__(1);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = __webpack_require__(6);

var _extends3 = _interopRequireDefault(_extends2);

var _rx = __webpack_require__(0);

var _url = __webpack_require__(25);

var _url2 = _interopRequireDefault(_url);

var _observables = __webpack_require__(7);

var _observables2 = _interopRequireDefault(_observables);

var _base = __webpack_require__(8);

var _base2 = _interopRequireDefault(_base);

var _constants = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMovieDetail = function getMovieDetail() {
    var movie = this.movie,
        harvester = this.harvester;

    return _observables2.default.fromUrl(movie.link).map(harvester.getTorrentLink).map(function (torrentUrl) {
        return (0, _extends3.default)({}, movie, { torrentUrl: torrentUrl });
    });
};

var resolveId = function resolveId(movie) {
    var linkWithId = movie.imageUrl;
    var pathnames = _url2.default.parse(linkWithId).pathname.split("/");
    var last = pathnames[pathnames.length - 1];

    var _last$split = last.split("_"),
        _last$split2 = (0, _slicedToArray3.default)(_last$split, 1),
        id = _last$split2[0];

    return (0, _extends3.default)({
        id: Number(id)
    }, movie);
};

var existsMovieById = function existsMovieById() {
    var movie = this.movie,
        store = this.store;

    var value = store.getMovieById(movie.id);
    return _rx.Observable.just(value).map(function (obj) {
        return [movie, obj != void 0];
    });
};

var persistMovie = function persistMovie() {
    var movie = this.movie,
        store = this.store;

    return _rx.Observable.fromPromise(store.persistMovie(movie)).map(function () {
        return movie;
    });
};

var MovieProcessor = function (_Processor) {
    (0, _inherits3.default)(MovieProcessor, _Processor);

    function MovieProcessor() {
        (0, _classCallCheck3.default)(this, MovieProcessor);
        return (0, _possibleConstructorReturn3.default)(this, (MovieProcessor.__proto__ || (0, _getPrototypeOf2.default)(MovieProcessor)).apply(this, arguments));
    }

    (0, _createClass3.default)(MovieProcessor, [{
        key: "process",
        value: function (_process) {
            function process() {
                return _process.apply(this, arguments);
            }

            process.toString = function () {
                return _process.toString();
            };

            return process;
        }(function () {
            var harvester = this.harvester,
                store = this.store;

            var source = (0, _get3.default)(MovieProcessor.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovieProcessor.prototype), "process", this).call(this).map(harvester.getMoviesList).flatMap(_rx.Observable.fromArray);

            var sampledSource = source;
            if (process.env.MOVIES_SAMPLING != void 0) {
                sampledSource = source.take(Number(process.env.MOVIES_SAMPLING));
            }

            var processedSource = sampledSource.map(resolveId).flatMap(function (movie) {
                return existsMovieById.bind({ movie: movie, store: store })();
            }).filter(function (_ref) {
                var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                    movie = _ref2[0],
                    exists = _ref2[1];

                return !exists;
            }).map(function (_ref3) {
                var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
                    movie = _ref4[0],
                    exists = _ref4[1];

                return movie;
            });

            return _rx.Observable.zip(processedSource, _rx.Observable.interval(_constants.CONNECTION_INTERVAL)).map(function (_ref5) {
                var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                    movie = _ref6[0],
                    _ = _ref6[1];

                return movie;
            }).flatMap(function (movie) {
                return getMovieDetail.bind({ movie: movie, harvester: harvester })();
            }).flatMap(function (movie) {
                return persistMovie.bind({ movie: movie, store: store })();
            });
        })
    }]);
    return MovieProcessor;
}(_base2.default);

exports.default = MovieProcessor;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/get");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("got");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/create");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/entries");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONNECTION_INTERVAL = exports.CONNECTION_INTERVAL = 1000;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _taggedTemplateLiteral2 = __webpack_require__(9);

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['', ''], ['', '']);

var _rx = __webpack_require__(0);

var _strings = __webpack_require__(10);

var _configuration = __webpack_require__(2);

var _datasource = __webpack_require__(3);

var _processors = __webpack_require__(19);

var _processors2 = _interopRequireDefault(_processors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _configuration.configureEnvironment)();
var processors = (0, _processors2.default)();

var startProcessors = function startProcessors() {
  return _rx.Observable.fromArray(processors).flatMap(function (processor) {
    return processor.process();
  });
};

_rx.Observable.fromPromise(_datasource.store.connectDatabase()).flatMap(startProcessors).subscribe(function (x) {
  console.log((0, _strings.pretty)(_templateObject, x));
}, function (err) {
  console.log('Error: ' + err);
}, function () {
  console.log('Completed');
});

/***/ })
/******/ ]);