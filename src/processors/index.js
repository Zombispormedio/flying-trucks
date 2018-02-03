import OmnibusProcessor from "./omnibus";
import { createProcessor } from "./base";
import { createStore, harvester } from "../datasource";
import { getOmnibusUrl } from "../configuration/constants";

export const createOmnibusProcessor = url => {
  const optionsProcessor = {
    name: "omnibus",
    initUrl: url || getOmnibusUrl(),
    harvester,
    store: createStore()
  };
  return createProcessor(OmnibusProcessor.prototype, optionsProcessor);
};
