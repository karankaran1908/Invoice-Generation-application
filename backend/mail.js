import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';
import { devConfig } from '../backend/env/development';

export const sendEmail = options =>
  new Promise((resolve, reject) => {
    const transpoter = nodemailer.createTransport({
      host: devConfig.ethereal.host,
      port: devConfig.ethereal.port,
      auth: {
        user: devConfig.ethereal.username,
        pass: devConfig.ethereal.password,
      },
    });


    const text = htmlToText.fromString(options.html, {
      wordwrap: 130,
    });

    //email options
    const mailOptions = {
      from: '"Invoice, Admins" <noreplay@invoice.com>',
      to: options.email,
      subject: options.subject,
      text,
      html: options.html,
    };

    //nodemailer instance returns promise
    transpoter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      // console.log('Message id ', info.messageId);
      // console.log('Preview URL ', nodemailer.getTestMessageUrl(info));
      return resolve({ message: 'Invoice sent' });
    });
  });
