//import test from 'ava';
import {createMovieProcessor} from '../src/processors/movies'
import Processor from '../src/processors/base'

const processor = createMovieProcessor()

console.dir(processor instanceof Processor)