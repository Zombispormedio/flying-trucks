export const CONNECTION_INTERVAL = 1000;

var environment;

export const setEnvironment = e => {
  environment = e;
};

export const getDefaultPathname = () => environment.DEFAULT_PATHNAME;

export const getMailKey = () => environment.SENDGRID_API_KEY;

export const getMongoUrl = () => {
  return environment.MONGODB_URL;
};

export const getOmnibusUrl = () => environment.OMNIBUS_URL;

const createModelTypesModule = () => {
  const module = {};
  module.MOVIE = "Movie";
  module.SERIE = "Serie";
  module.SUBSCRIBER = "subscriber";
  return module;
};

export const ModelTypes = createModelTypesModule();
