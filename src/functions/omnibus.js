import {Observable} from 'rx'
import util from 'util'
import {configureEnvironment} from '../configuration'
import {createOmnibusProcessor} from '../processors'

configureEnvironment()
const omnibusProcessor = createOmnibusProcessor()
const store = omnibusProcessor.getStore();

Observable.fromPromise(store.connectDatabase())
          .flatMap(() => omnibusProcessor.process())
          .doOnCompleted(()=>store.close())
          .doOnError(()=>store.close())
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
