import { transporter } from "../../config/mailer.ts";

class MailService {
    sendReactivationLink = async (email: string, token: string) => {
        const link = `${process.env.API_URL}/api/auth/reactivate/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Account Reactivation",
            text: `Click to reactivate your account: ${link}\n\nExpires in 5 minutes.`,
            html: `<p><a href="${link}">Click here</a> to reactivate your account.</p><p>This link expires in 5 minutes.</p>`,
        });
    };
}

export default new MailService();
