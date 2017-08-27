import got from 'got'
import cheerio from 'cheerio'
import {
    Observable
} from 'rx'

export const sampleDataFromArray = (sampling) => ((data) => {
    return Observable.fromArray(data)
            .take(sampling)
            .toArray()
})

const Module = {}

Module.fromUrl = (url) => Observable.fromPromise(got(url))
    .map(response => response.body)
    .map(cheerio.load)
 

export default Module