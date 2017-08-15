import {Observable} from 'rx'
import {pretty} from './lib/strings'
import Observables from './lib/observables'
import {configureEnvironment} from './configuration'
import Products from './product'

configureEnvironment()
const products = Products()

const source = Observable.fromArray(Object.keys(products))
    .flatMap(key => {
        const {url, exec} = products[key]
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