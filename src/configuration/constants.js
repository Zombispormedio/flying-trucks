export const CONNECTION_INTERVAL = 1000

export const getTorrentPathname = () => process.env.DEFAULT_TORRENT_PATHNAME 

const createModelTypesModule = () => {
    const module = {}
    module.MOVIE = "movie"
    module.SERIE = "serie"   

    const {MOVIE, SERIE} = module
    module[MOVIE] = {
        modelName : {
            lowdb: "movies"
        }
    }

    module[SERIE] = {
        modelName : {
            lowdb: "series"
        }
    }

    return module
}

 export const ModelTypes = createModelTypesModule()
    