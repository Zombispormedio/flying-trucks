import {ModelTypes} from '../../../configuration/constants'
import MovieModel from './movie'
import SerieModel from './serie'

export default {
    [ModelTypes.MOVIE]: MovieModel,
    [ModelTypes.SERIE]: SerieModel
}