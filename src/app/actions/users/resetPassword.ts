'use server';

import prisma from '@/libs/prisma';
import crypto from 'crypto';
// import { sendEmail } from '../emails/sendEmail';
import { ResetPasswordEmailTemplate } from '@/app/email-templates/reset-password-email';

export const resetPassword = async (email: string) => {
    console.log('Resetting password for ' + email);

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(!user) {
        throw new Error('User not found');
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiry: expiryDate
        }
    })

    // await sendEmail({
    //     from: "Mailgun Sandbox <postmaster@sandbox3111ef1b366f48d2b34bede5014d6166.mailgun.org>",//from: 'Admin <admin@modernwebdevelopment.net>',
    //     to: [email],
    //     subject: 'Reset your password',
    //     react: ResetPasswordEmailTemplate({email, resetPasswordToken}) as React.ReactElement
    // });

    return "Password reset email sent"
};
