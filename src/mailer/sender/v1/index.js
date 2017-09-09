import sendgrid from 'sendgrid'
import {getMailKey} from '../../../configuration/constants'

export const sendMultiple = (msg) => {
    const sgMail = sendgrid(getMailKey())
    return new Promise((resolve, reject) => {
        sgMail.send(msg, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}