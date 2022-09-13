import nodemailer from 'nodemailer'

export const registerEmail = async (data) => {
    const { email, name, token } = data

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "8a0617fa498a1f",
            pass: "997275afd07655"
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