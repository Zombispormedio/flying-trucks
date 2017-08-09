import {
    Observable
} from "rx"

import Observables from '../lib/observables'


const getMoviesList = ($) =>{
   return $('ul.pelilist').children('li').map(function(i, elem){
       const parent = $(this).children('a')
       return {
            title: parent.find('h2').first().text().trim(),
            link: parent.attr('href'),
            image_url: parent.find('img').first().attr('src'),
            format: parent.find('span').first().text() 
       }
    }).get()
}


module.exports = function ($) {
    return Observable.just($)
                    .map(getMoviesList)
                    .flatMap(Observable.fromArray)
                    .flatMap()
                    
}