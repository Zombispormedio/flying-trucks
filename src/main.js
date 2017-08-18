import {Observable} from 'rx'
import {pretty} from './lib/strings'
import {configureEnvironment} from './configuration'
import {store} from './datasource'
import Processors from './processors'

configureEnvironment()
const processors = Processors()

const startProcessors = () => Observable.fromArray(processors)
  .flatMap(processor => processor.process())

Observable.fromPromise(store.connectDatabase())
          .flatMap(startProcessors)
          .subscribe(
            function (x) {
              console.log(pretty `${x}`);
            },
            function (err) {
              console.log(`Error: ${err}`);
            },
            function () {
              console.log('Completed');
            });

