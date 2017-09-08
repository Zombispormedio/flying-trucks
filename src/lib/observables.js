import rp from 'request-promise'
import cheerio from 'cheerio'
import {
    Observable
} from 'rx'

export const sampleDataFromArray = (sampling) => ((data) => {
    return Observable.fromArray(data)
            .take(sampling)
            .toArray()
})

const getCrawlerPromise = (uri) =>{
    return rp({
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    })
}

const Module = {}

Module.fromUrl = (url) => Observable.fromPromise(getCrawlerPromise(url))
 

export default Module