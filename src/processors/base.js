import Observables from '../lib/observables'

const defaultDescriptor = {
    enumerable: true,
    configurable: false,
    writable: false,
}

export const createProcessor = (prototype, options) => {
    const descriptors = Object.entries(options)
        .reduce((memo, [key, value]) => {
            return {
                ...memo,
                [key]: {
                    ...defaultDescriptor,
                    value
                }
            }
        }, {})
    return Object.create(prototype, descriptors)
}

export default class Processor {
    constructor(initUrl, harvester, store) {
        this.harvester = harvester
        this.store = store
        this.initUrl = initUrl
    }

    getStore(){
        return this.store
    }

    process() {
       return Observables.fromUrl(this.initUrl)
    }
}