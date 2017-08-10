import {
    Observable
} from "rx"

import Observables from '../lib/observables'

const CONNECTION_INTERVAL = 1000
const jsTorrentRegex = /openTorrent/g
const locationRegex = /window\.location\.href.*/g

const getMoviesList = ($) => {
    return $('ul.pelilist').children('li').map(function (i, elem) {
        const parent = $(this).children('a')
        return {
            title: parent.find('h2').first().text().trim(),
            link: parent.attr('href'),
            imageUrl: parent.find('img').first().attr('src'),
            format: parent.find('span').first().text()
        }
    }).get()
}

const bindTorrentLinkInMovie = ({movie, $}) => {
    const possibleScripts = []
    $("script").filter((index, elem) => elem.children.length == 1)
        .each((index, elem) => possibleScripts.push(elem.children[0].data))
    const script = possibleScripts.find((elem) => jsTorrentRegex.test(elem))
    const line = script.match(locationRegex)[0]
    const torrentUrl = line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""))
    return { ...movie, torrentUrl }
}

const getMovieDetail = (movie) => {
    return Observables.fromUrl(movie.link)
        .map($ => ({
            movie,
            $
        }))
        .map(bindTorrentLinkInMovie)
}


module.exports = function ($) {
    const source = Observable.just($).map(getMoviesList)
        .flatMap(Observable.fromArray)

    return Observable.zip(source, Observable.interval(CONNECTION_INTERVAL))
        .map(wrapper => wrapper[0])
        .flatMap(getMovieDetail)
}