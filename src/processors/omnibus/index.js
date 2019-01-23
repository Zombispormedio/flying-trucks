import vm from "vm";
import path from "path";
import { Observable } from "rx";
import Observables from "../../lib/observables";
import { createStore, harvester } from "../../datasource";
import Processor, { createProcessor } from "../base.js";
import {
  getDefaultPathname,
  CONNECTION_INTERVAL,
  getOmnibusUrl
} from "../../configuration/constants";

const extractDataFromScript = rawData => {
  const sandbox = {};
  const script = new vm.Script(rawData);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
  return {
    movies: sandbox.arrayMODPC || [],
    series: sandbox.arrayMODSH || [],
    seriesVO: sandbox.arrayMODSVO || []
  };
};

const foldArrayToObject = ([id, link, imageUrl, title, format]) => ({
  id: Number(id),
  link,
  imageUrl,
  title: title.trim(),
  format,
  createdAt: new Date()
});

const resolveMovieTorrentLink = () => data => {
  const { imageUrl } = data;
  const basename = path.basename(imageUrl, ".jpg");
  const torrentLink = `${getDefaultPathname()}${basename}.torrent`;
  return { ...data, torrentLink };
};

const resolveSerieTorrentLink = function(series) {
  const { harvester } = this;
  return Observable.fromArray(series)
    .flatMap(serie => {
      return Observables.fromUrl(serie.link)
        .map(harvester.getTorrentLink)
        .filter(Boolean)
        .map(torrentLink => ({ ...serie, torrentLink }));
    })
    .toArray();
};

const processMovies = function(movies) {
  const {
    store: { substractMovieIds, persistMovies }
  } = this;
  const featuredObservable = Observable.fromArray(this.featured).map(movie => ({
    ...movie,
    createdAt: new Date()
  }));
  const inputObservable = Observable.fromArray(movies).map(foldArrayToObject);
  return Observable.concat(featuredObservable, inputObservable)
    .map(resolveMovieTorrentLink())
    .toArray()
    .flatMap(movies => Observable.fromPromise(substractMovieIds(movies)))
    .flatMap(movies =>
      Observable.fromPromise(persistMovies(movies)).map(() => movies)
    );
};

const processSeries = function(series) {
  const {
    store: { substractSerieIds, persistSeries },
    harvester
  } = this;
  return Observable.fromArray(series)
    .map(foldArrayToObject)
    .toArray()
    .flatMap(series => Observable.fromPromise(substractSerieIds(series)))
    .flatMap(resolveSerieTorrentLink.bind({ harvester }))
    .flatMap(series =>
      Observable.fromPromise(persistSeries(series)).map(() => series)
    );
};

const foldData = function({ featured, data: { series, movies, seriesVO } }) {
  const moviesProcessorObservable = processMovies.bind({ ...this, featured })(
    movies
  );
  const seriesProcessorObservable = processSeries.bind(this)(series);

  const seriesVOProcessorObservable = processSeries.bind(this)(seriesVO);

  const seriesObservable = Observable.zip(
    seriesProcessorObservable,
    seriesVOProcessorObservable,
    (series, seriesVO) => ({ series, seriesVO })
  );

  return Observable.zip(
    seriesObservable,
    moviesProcessorObservable,
    (allSeries, movies) => ({ ...allSeries, movies })
  );
};

class OmnibusProcessor extends Processor {
  getFoldDataFunction() {
    return foldData.bind(this);
  }

  process() {
    const { harvester, store } = this;
    const source = super.process();
    const featuredSource = source.map(harvester.getFeaturedMovies);

    const inputSource = source
      .map(harvester.getScriptCode)
      .map(extractDataFromScript);

    return Observable.zip(featuredSource, inputSource, (featured, data) => ({
      featured,
      data
    })).flatMap(this.getFoldDataFunction());
  }
}

export default OmnibusProcessor;
