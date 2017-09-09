import Handlebars from 'handlebars'
import Templates from './template'

export const bindNewsletterToHtml = () => Handlebars.compile(Templates.newsletter)

export const sendMail = (sender, {to, html}) => {
  const msg = {
    to,
    from: 'noreply@flyingtrucks.org',
    fromname:  'Flying Trucks',
    subject: '🚚 Flying Trucks Daily',
    html,
  }
  return sender(msg)
}


