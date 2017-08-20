import {Observable} from 'rx'
import {pretty} from '../lib/strings'
import {configureEnvironment} from '../configuration'
import {createMovieProcessor} from '../processors'

configureEnvironment()
const movieProcessor = createMovieProcessor()

Observable.fromPromise(movieProcessor.getStore().connectDatabase())
          .flatMap(() => movieProcessor.process())
          .subscribe(
            function (x) {
              console.log(pretty`${x}`);
            },
            function (err) {
              console.log(`Error: ${err}`);
            },
            function () {
              console.log('Completed');
            });
