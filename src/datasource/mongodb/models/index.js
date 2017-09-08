import {ModelTypes} from '../../../configuration/constants'
import MovieModel from './movie'
import SerieModel from './serie'
import SubscriberModel from './subscriber'

export default {
    [ModelTypes.MOVIE]: MovieModel,
    [ModelTypes.SERIE]: SerieModel,
    [ModelTypes.SUBSCRIBER]: SubscriberModel
}