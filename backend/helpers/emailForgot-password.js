import nodemailer from 'nodemailer'

export const forgto_passwordEmail = async (data) => {
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
        subject: "UpTask - Don't lose access, restore your password here!",
        text: "Restore password",
        html: `
            <p>Hola, ${name}, restore your password in UpTask.</p>
            <p>Your new password is almost ready, click <a href="${process.env.FRONTEND_URL}/forgot-password/${token}"><strong>Here!</strong></a> to continue</p>
            <p>If this is not you, ignore this email</p>
        `
    })
}