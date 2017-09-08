import {Observable} from 'rx'
import {createOmnibusProcessor} from '../processors'
import {bindNewsletterToHtml, sendNewsletter} from '../mailer'
import {setEnvironment} from '../configuration/constants'

module.exports = function main(context, cb){
    setEnvironment(context.secrets)
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
                  cb(`Error: ${err}`)
                },
                function () {
                  cb(null, 'Completed')
                });
}

