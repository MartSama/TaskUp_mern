import nodemailer from 'nodemailer'

export const registerEmail = async (data) => {
    const { email, name, token } = data

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS 
        }
    });

    //Email information
    const info = await transport.sendMail({
        from: '"UpTask - Mart" <mart@uptask.com>',
        to: email,
        subject: "UpTask - confirm your account",
        text: "Check your account",
        html: `
            <p>Hola, ${name}, confirm your account in UpTask.</p>
            <p>Your account is almost ready, click <a href="${process.env.FRONTEND_URL}/confirm-account/${token}"><strong>Here!</strong></a> to continue</p>
            <p>If you don't create this account, ignore this email</p>
        `
    })
}