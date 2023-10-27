// "use client";
// import React from 'react'
// import { sendEmail } from '../actions/emails/sendEmail';
// import { EmailTemplate } from '../email-templates/test-email';

// const TestEmailButton = () => {

//     const handleSubmit = async () => {
//         sendEmail({
//           from: 'onboarding@resend.dev',//from: "Mailgun Sandbox <postmaster@sandbox3111ef1b366f48d2b34bede5014d6166.mailgun.org>",//from: 'Admin <admin@modernwebdevelopment.net>',
//             to: ["javi2cc1@gmail.com"],
//             subject: 'Test Email',
//             // text: 'This is a test email',
//             // html: '<h1>This is a test email</h1>'
//             react: EmailTemplate({firstName: "John"}) as React.ReactElement
//         });
//     }

//   return (
//     <button onClick={handleSubmit}>
//         Send Test Email
//     </button>
//   )
// }

// export default TestEmailButton