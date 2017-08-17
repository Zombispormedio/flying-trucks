import Observables from '../lib/observables'

class Processor {
    constructor(initUrl, harvester, store){
        this.harvester = harvester
        this.store = store
        this.initUrl = initUrl
    }

    newRequest(){
        this.pipeline = Observables.fromUrl(this.initUrl)
        return this
    }

    process(){
        return this.pipeline;
    }
}

const defaults = {
    enumerable: true,
    configurable: false,
    writable: false,
}

export const createProcessor = (prototype, initUrl, harvester, store) => Object.create(prototype, {
    initUrl:{
        ...defaults,
        value: initUrl
    },
    harvester:{
        ...defaults,
        value: harvester
    },
    store:{
        ...defaults,
        value: store
    },
})
export default Processor