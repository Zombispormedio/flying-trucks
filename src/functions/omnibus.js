import {Observable} from 'rx'
import util from 'util'
import {configureEnvironment} from '../configuration'
import {createOmnibusProcessor} from '../processors'

configureEnvironment()
const omnibusProcessor = createOmnibusProcessor()

Observable.fromPromise(omnibusProcessor.getStore().connectDatabase())
          .flatMap(() => omnibusProcessor.process())
          .subscribe(
            function (x) {
              console.log(util.inspect(x
              ));
            },
            function (err) {
              console.log(`Error: ${err}`);
            },
            function () {
              console.log('Completed');
            });
