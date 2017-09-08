import HarvesterDataSource from './harvester'
import MongoDBDatasource from './mongodb'

export const harvester = HarvesterDataSource

export const createStore = () => MongoDBDatasource