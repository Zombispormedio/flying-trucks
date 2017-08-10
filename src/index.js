import {Observable} from 'rx'
import {pretty} from './lib/strings'
import Observables from './lib/observables'
import domains from './domain/base'


const source = Observable.fromArray(Object.keys(domains))
    .flatMap(key => {
        const {url, exec} = domains[key]
        return Observables.fromUrl(url)
                        .flatMap(exec)
                        .map(value => ({key, value}))
    })/*.reduce((memo, item)=>({
        ...memo, 
        [item.key]: item.value
    }), {})*/


const subscription = source.subscribe(
  function (x) {
    console.log(pretty`${x}`);
  },
  function (err) {
    console.log(`Error: ${err}`);
  },
  function () {
    console.log('Completed');
  });