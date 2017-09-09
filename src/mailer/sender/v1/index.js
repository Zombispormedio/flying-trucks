import sendgrid from 'sendgrid'
import {getMailKey} from '../../../configuration/constants'

export const sendMultiple = (content) => {
    const sgMail = sendgrid(getMailKey())
    const personalizations = content.to.map(to => ({
        ...content,
        to
    }))
    const createPromise = (message) => new Promise((resolve, reject) => {
        sgMail.send(message, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })

    return Promise.all(personalizations.map(createPromise))
}