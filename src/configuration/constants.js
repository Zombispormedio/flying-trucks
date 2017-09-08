export const CONNECTION_INTERVAL = 1000

var environment;

export const setEnvironment = (e) => { environment = e }

export const getDefaultPathname = () => environment.DEFAULT_PATHNAME 

export const getBadUrl = () => environment.BAD_URL

export const getMailKey = () => environment.SENDGRID_API_KEY

export const getMongoUrl = () => environment.MONGODB_URL

export const getOmnibusUrl = () => environment.OMNIBUS_URL

const createModelTypesModule = () => {
    const module = {}
    module.MOVIE = "Movie"
    module.SERIE = "Serie"   
    module.SUBSCRIBER = "subscriber"   

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
    