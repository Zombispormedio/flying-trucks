const SCRIPT_TORRENT_REGEX = /openTorrent/g
const HREF_REGEX_IN_SCRIPT = /window\.location\.href.*/g
const SCRIPT_OMNIBUS_REGEX = /(^var (array.+) = \[\[.+)(\]\];)/mgi

const Module  =  {}

Module.getMoviesList = ($) => {
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

const getContentByRegexp = ($, selector, regexp) =>{
    const scripts = []
    $(selector).filter((_, {children}) => children.length == 1)
            .each((_, {children}) => {
                const [{data}] = children
                scripts.push(data)
            })

    return scripts.find((content) => regexp.test(content))
}

Module.getTorrentLink = ($) => {
    const script = getContentByRegexp($, "script", SCRIPT_TORRENT_REGEX)
    if(!script) {
        return null;
    }
    const matches = script.match(HREF_REGEX_IN_SCRIPT)
    const [line, _] = matches
    return line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""))
}


Module.getScriptCode = ($)=>{
    const content = getContentByRegexp($, "script", SCRIPT_OMNIBUS_REGEX) 
    return content.replace(/(\\n|\\t)/g, " ")
    .match(SCRIPT_OMNIBUS_REGEX).join("\n")
}

Module.getFeaturedMovies = ($)=>{
    return $("#load-modpc").children('li').filter(function(i, elem){
        const parent = $(this).children('a')
        return parent.find('img').length == 1
    }).map(function (i, elem) {
        const id = Number($(this).attr("id").replace("f-", ""))
        const parent = $(this).children('a')
        return {
            id,
            title: parent.find('h2').first().text().trim(),
            link: parent.attr('href'),
            imageUrl: parent.find('img').first().attr('src'),
            format: parent.find('span').first().text()
        }
    }).get()
}

export default Module