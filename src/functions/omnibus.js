import { Observable } from "rx";
import { createOmnibusProcessor } from "../processors";
import { bindNewsletterToHtml, sendMail } from "../mailer";
import { setEnvironment, getSentryDSN } from "../configuration/constants";
import {
  connectDatabase,
  disconnectDatabase
} from "../datasource/mongodb/connection/v2";
import { sendMultiple } from "../mailer/sender/v2";

const Sentry = require('@sentry/node');

module.exports = function main(context, callback) {
  setEnvironment(context.secrets);
  Sentry.init({ dsn: getSentryDSN(), environment: getSentryEnv() });

  const omnibusProcessor = createOmnibusProcessor();
  const store = omnibusProcessor.getStore();

  const sendNewsletter = (to, html) =>
    Observable.fromPromise(sendMail(sendMultiple, { to, html }));

  const sendHtmlByEmail = () => ({ html, data }) =>
    Observable.fromPromise(store.getEmails())
      .filter(emails => emails.length > 0)
      .flatMap(emails => sendNewsletter(emails, html))
      .map(() => data);

  
  let resultData = {
    series: [], movies: [], seriesVO: []
  };

  Observable.fromPromise(connectDatabase())
    .flatMap(() => omnibusProcessor.process())
    .filter(
      ({ series, movies, seriesVO }) =>
        series.length > 0 || movies.length > 0 || seriesVO.length > 0
    )
    .map(bindNewsletterToHtml())
    .flatMap(sendHtmlByEmail())
    .doOnCompleted(disconnectDatabase)
    .doOnError(disconnectDatabase)
    .subscribe(
      result => {
        resultData = result;
      },
      err => {
        Sentry.captureException(err);
        callback(err);
      },
      () => {
        Sentry.captureMessage(`
          Completed: 
          -  ${resultData.movies.length} movies
          -  ${resultData.series.length} series
          -  ${resultData.seriesVO.length} series VO
        `);
        callback(null, { status: "Completed", data: resultData });
      }
    );
};
