import { Observable } from "rx";
import { createOmnibusProcessor } from "../processors";
import { bindNewsletterToHtml, sendMail } from "../mailer";
import { setEnvironment } from "../configuration/constants";
import {
  connectDatabase,
  disconnectDatabase
} from "../datasource/mongodb/connection/v2";
import { sendMultiple } from "../mailer/sender/v2";

module.exports = function main(context, callback) {
  let data = {};
  setEnvironment(context.secrets);
  const omnibusProcessor = createOmnibusProcessor();
  const store = omnibusProcessor.getStore();

  const sendNewsletter = (to, html) =>
    Observable.fromPromise(sendMail(sendMultiple, { to, html }));

  const sendHtmlByEmail = () => ({ html, data }) =>
    Observable.fromPromise(store.getEmails())
      .filter(emails => emails.length > 0)
      .flatMap(emails => sendNewsletter(emails, html))
      .map(() => data);

  const source = Observable.fromPromise(connectDatabase())
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
        data = result;
      },
      callback,
      () => {
        callback(null, { status: "Completed", data });
      }
    );
};
