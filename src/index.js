import { Observable } from "rx";
import util from "util";
import { configureEnvironment } from "./configuration";
import { setEnvironment } from "./configuration/constants";
import {
  connectDatabase,
  disconnectDatabase
} from "./datasource/mongodb/connection/v2";
import { createOmnibusProcessor } from "./processors";
import { bindNewsletterToHtml, sendMail } from "./mailer";
import { sendMultiple } from "./mailer/sender/v2";

configureEnvironment();
setEnvironment(process.env);
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
    data => {
      console.log(data);
      console.log("Mail sent successfully");
    },
    err => {
      console.log(err);
    },
    () => {
      console.log("Completed");
    }
  );
