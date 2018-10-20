import Handlebars from 'handlebars'
import Templates from './template'

export const bindNewsletterToHtml = () => data => {
  const template = Handlebars.compile(Templates.newsletter);
  return {
    data,
    html: template(data)
  }
}

export const sendMail = (sender, {to, html}) => {
  const msg = {
    to,
    from: {
      email: 'noreply@flyingtrucks.org',
      name:  'Flying Trucks',
    },
    subject: '🚚 Flying Trucks Daily',
    html,
  }
  return sender(msg)
}


