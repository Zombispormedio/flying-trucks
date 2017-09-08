import Handlebars from 'handlebars'
import Templates from './template'
import sendgrid from 'sendgrid'
import {getMailKey} from '../configuration/constants'

export const bindNewsletterToHtml = () => Handlebars.compile(Templates.newsletter)

export const sendNewsletter = (to, html) => {
    const sgMail = sendgrid(getMailKey())
    const msg = {
        to,
        from: 'noreply@flyingtrucks.org',
        subject: '🚚 Flying Trucks Daily',
        html,
      }
      return new Promise((resolve, reject) => {
          console.log(sgMail)
        sgMail.send(msg, (err, data)=>{
            if(err) return reject(err)
            resolve(data)
        })
      } )
}


