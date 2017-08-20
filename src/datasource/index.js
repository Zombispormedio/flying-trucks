import HarvesterDataSource from './harvester'
import LowDBDatasource from './lowdb'
import MongoDBDatasource from './mongodb'
import {isMongodb} from '../configuration'

export const harvester = HarvesterDataSource

export const createStore = () => {
    if(isMongodb()){
        return MongoDBDatasource
   }else{
       return LowDBDatasource
   }
}