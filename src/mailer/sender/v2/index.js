import sgMail from '@sendgrid/mail'
import {getMailKey} from '../../../configuration/constants'

export const sendMultiple = (msg) => {
    sgMail.setApiKey(getMailKey());
    return sgMail.sendMultiple(msg)
}