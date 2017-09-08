import {Observable} from 'rx'
import util from 'util'
import {configureEnvironment} from './configuration'
import {setEnvironment} from './configuration/constants'
import {createOmnibusProcessor} from './processors'
import {bindNewsletterToHtml, sendNewsletter} from './mailer'

configureEnvironment()
setEnvironment(process.env)
const omnibusProcessor = createOmnibusProcessor()
const store = omnibusProcessor.getStore()

Observable.fromPromise(store.connectDatabase())
          .flatMap(() => omnibusProcessor.process())
          .filter(({series, movies}) => series.length > 0 || movies.length > 0 )
          .map(bindNewsletterToHtml())
          .flatMap(html => Observable.fromPromise(store.getEmails())
                      .flatMap(emails => sendNewsletter(emails, html))
                    )
          .doOnCompleted(() => store.close())
          .doOnError(() => store.close())
          .subscribe(
            function (x) {
            },
            function (err) {
              console.log(`Error: ${err}`)
            },
            function () {
              console.log('Completed')
            });
