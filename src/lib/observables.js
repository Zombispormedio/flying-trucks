import got from 'got'
import cheerio from 'cheerio'
import {
    Observable
} from 'rx'

const Module = {}

Module.fromUrl = (url) => Observable.fromPromise(got(url))
    .map(response => response.body)
    .map(cheerio.load)

module.exports = Module