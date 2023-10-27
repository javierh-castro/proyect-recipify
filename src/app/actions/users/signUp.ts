'use server';

import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '@/emails/sendEmail';
import { VerifyEmailEmailTemplate } from '@/app/email-templates/verify-email-email';

export const signUp = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        return 'User with that email already exists.';
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const createdUser = await prisma.user.create({
        data: {
            email,
            password: passwordHash,
        },
    });

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    await prisma.user.update({
        where: {
            id: createdUser.id
        },
        data: {
            emailVerificationToken: emailVerificationToken,
        }
    })

    await sendEmail({
        from: "Mailgun Sandbox <postmaster@sandbox3111ef1b366f48d2b34bede5014d6166.mailgun.org>",//from: 'Admin <admin@modernwebdevelopment.net>',
        to: [email],
        subject: 'Verify your email address',
        react: VerifyEmailEmailTemplate({email, emailVerificationToken}) as React.ReactElement
    });

    return "Successfully created new user!";
};
