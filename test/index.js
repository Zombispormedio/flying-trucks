import fs from 'fs'
import Handlebars from 'handlebars'
import Templates from '../src/mailer/template'

const compiledTemplate = Handlebars.compile(Templates.newsletter)

