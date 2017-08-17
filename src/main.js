import {Observable} from 'rx'
import {pretty} from './lib/strings'
import {configureEnvironment} from './configuration'
import Processors from './processors'

configureEnvironment()
const processors = Processors()

Observable.fromArray(processors)
  .flatMap(processor => processor.process())
  .subscribe(
    function (x) {
      console.log(x)
      console.log(pretty `${x}`);
    },
    function (err) {
      console.log(`Error: ${err}`);
    },
    function () {
      console.log('Completed');
    });