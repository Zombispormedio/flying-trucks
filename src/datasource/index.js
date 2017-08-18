import HarvesterDataSource from './harvester'
import LowDBDatasource from './lowdb'
import MongoDBDatasource from './mongodb'

export const harvester = HarvesterDataSource

import {isDevelopment} from '../configuration'

let storeModule;
if(isDevelopment()){
     storeModule = LowDBDatasource
}else{
    storeModule = MongoDBDatasource
}

export const store = storeModule