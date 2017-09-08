import Handlebars from 'handlebars'
import Templates from './template'
import sgMail from '@sendgrid/mail'
import {getMailKey} from '../configuration/constants'

export const bindNewsletterToHtml = () => Handlebars.compile(Templates.newsletter)

export const sendNewsletter = (to, html) => {
      sgMail.setApiKey(getMailKey());
      const msg = {
        to,
        from: 'noreply@flyingtrucks.org',
        subject: '🚚 Flying Trucks Daily',
        html,
      };
      sgMail.sendMultiple(msg)
}


