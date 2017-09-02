const path = require("path")
const through = require('through2') 
const File = require('vinyl')
module.exports = function (options) {
    const results = []
    return through.obj(function transform(file, _, done) {
            if (file.isBuffer()) {
                results.push(textToExport(file.contents.toString(), file.relative))
            }
            done(null)
        },
        function flush(done) {
            this.push(new File({
                path: options.concat,
                contents: new Buffer(join(results))
            }))
            done(null)
        });
};

function textToExport(text, path) {
    return `Module['${normalizePath(path)}'] = '${escape(text)}'`
}

function join(results) {
    return `const Module = {}\n${results.join(';\n')}\nexport default Module`
}

function normalizePath(text) {
    return path.basename(escape(text).replace(/\\/g, '/'), ".html")
}

function escape(text) {
    return text.replace(/'/g, "\\'").replace(/\r\n|\n/g, '\\n')
}