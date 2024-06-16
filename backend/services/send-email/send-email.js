require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

class SendEmail {
   
    constructor() {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        this.transporter = transporter;
    }

    sendAccountCreation(to, fullName, confirmToken) {
        const emailTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'accountCreationTemplate.html'), 'utf8');
        const confirmationLink = `http://localhost:3000/confirm-email?token=${confirmToken}`;
        const htmlContent = emailTemplate.replace('[Nome do Usuário]', fullName).replace('[Link de Confirmação]', confirmationLink).replace(/\[Nome da Empresa\]/g, 'Finance Pro');

        const mailOptions = {
            from: 'no.reply.financepro24@gmail.com',
            to: to,
            subject: 'Bem-vindo à FinancePro - Confirme seu email',
            html: htmlContent
        };

        this.#sendEmail(mailOptions);
    }

    sendForgotPassword(to, forgotPasswordToken) {
        const emailTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'forgotPassword.html'), 'utf8');
        const forgotPasswordLink = `http://localhost:3000/reset-password?token=${forgotPasswordToken}`;
        const htmlContent = emailTemplate.replace('[Email do Usuário]', to).replace('[Link de Recuperação]', forgotPasswordLink).replace(/\[Nome da Empresa\]/g, 'Finance Pro');

        const mailOptions = {
            from: 'no.reply.financepro24@gmail.com',
            to: to,
            subject: 'Recuperação de senha',
            html: htmlContent
        };

        this.#sendEmail(mailOptions);
    }

    #sendEmail(mailOptions) {
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error(error);
            }
            console.log('Email enviado: ' + info.response);
        });
    }
}

module.exports = SendEmail;