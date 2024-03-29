import nodemailer from "nodemailer";
import smtp from "nodemailer-smtp-transport";

export type ContactMailProps = {
  firm?: string | null;
  email: string;
  name: string;
  message: string;
  phone: string;
};

export async function sendContactMail({
  firm,
  name,
  message,
  email,
  phone,
}: ContactMailProps) {
  const transport = nodemailer.createTransport(
    smtp({
      host: "in.mailjet.com",
      port: 2525,
      auth: {
        user: process.env.MAILJET_KEY || "<your-mailjet-api-key",
        pass: process.env.MAILJET_SECRET || "<your-mailjet-api-secret>",
      },
    })
  );
  const mailOptions = {
    from: "jean@react-formation.fr",
    to: "contact@react-formation.fr",
    subject: `formulaire de contact ${name}`,
    text: `${name} de la société ${firm} t'as contacté pour : ${message}. Tu peux le contacter sur ${email} ou ${phone}`,
  };
  return transport.sendMail(mailOptions);
}
