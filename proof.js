const got = require('got')
const cheerio = require('cheerio')
const async = require('async')
const fs = require('fs')

const jsTorrentRegex = /openTorrent/g
const locationRegex =  /window\.location\.href.*/g
const hostname = "http://www.torrentrapid.com/"


const getFirstPage = (next) => {
    got("http://www.torrentrapid.com/series-hd/agente-carter/3124")
        .then((res) => {
            next(null, cheerio.load(res.body))
        })
}

const getList = ($, next) => {
    const links = new Set()
    $("ul.buscar-list").find("a").each((index, elem) => links.add(elem.attribs.href))
    next(null, Array.from(links))
}

const getTorrentPage = (link) => {
    return (next) =>{
        got(link)
        .then((res) => {
            next(null, cheerio.load(res.body))
        })
    }
}

const getTorrentLink = ($, next) => {
    const possibleScripts = []
    $("script").filter((index, elem)=> elem.children.length == 1)
        .each((index, elem) => possibleScripts.push(elem.children[0].data))

    const script = possibleScripts.find((elem) => jsTorrentRegex.test(elem))
    const line = script.match(locationRegex)[0]

    const query = line.substring(line.indexOf("descargar-torrent"), line.length-3)

    const filename = query.split("/")[1]

    const url = hostname+query

    got.stream(url).pipe(fs.createWriteStream(filename+".torrent"))

    next();
}

const downloadTorrent = (link, cb) =>{
    async.waterfall([
        getTorrentPage(link),
        getTorrentLink
    ], cb)
}

const downloadList = (list, next)=>{
    async.each(list, downloadTorrent, next);
}

async.waterfall([
    getFirstPage, 
    getList,
    downloadList
], () => {
    console.log("Finished!")
})