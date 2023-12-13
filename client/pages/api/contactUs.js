// import {sendEmail} from '../lib/sendgrid'
// import sendgrid from "@sendgrid/mail";

import { getStrapiURL } from "../../utils"

export default async function handler(req, res) {

    // console.log('req', req.body)

    const { email, details: text, phone, subject, name } = JSON.parse(req.body)
    const msg = {
        // to: 'ethienner@gmail.com', // Change to your recipient
        to: 'info@evoketennis.com.au', // Change to your recipient
        from: 'contact@evoketennis.com.au', // Change to your verified sender
        // subject: `Enquiry for ${subject} - ${phone} - ${name}`,
        subject,
        text,
        html: `<strong>${text}</strong>
            <br/>
            <br/>
            From: ${name} - ${email} - ${phone}
        `,
    }
    console.log('trying to send email')
    await fetch(getStrapiURL('/email'), {
        method: 'POST', body: JSON.stringify(msg), headers: { accept: 'application/json', 'content-type': 'application/json' },
    })
        .then(() => res.status(200).json('success'))
        .catch(() => res.status(400).json('error'))
    // .then((res) => {
    //     console.log('this shit worked')
    // }).catch((err) => {
    //     console.error('something wroong happened')
    // })
    // res.status(200).json('success')
}