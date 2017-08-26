//import test from 'ava';
import {Observable} from 'rx'
import low from 'lowdb'
import lowFileAsync from 'lowdb/lib/storages/file-async'
import {curry} from 'ramda'
import {ModelTypes} from '../src/configuration/constants'
import util from 'util'
const db = low('db.json', {
    storage: lowFileAsync
})


const connectDatabase = () => {
    return db.defaults({
            movies: [],
            series: []
        })
        .write()
}

const persistModels = (type, models) => {        
    return models.reduce((memo, item)=>{
        return memo.push(item)
    }, db.get(ModelTypes[type].modelName.lowdb)).write()
}

const persistMovies = curry(persistModels)(ModelTypes.MOVIE)
const persistSeries = curry(persistModels)(ModelTypes.SERIE)


Observable.fromPromise(connectDatabase())
        .flatMap(()=>{
            return Observable.fromPromise(persistMovies([{hello: "hello"}, {hello: "bye"}]))
        })
.subscribe(
    function (x) {
      console.log(util.inspect(x));
    },
    function (err) {
      console.log(`Error: ${err}`);
    },
    function () {
      console.log('Completed');
    });