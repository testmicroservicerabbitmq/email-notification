/* eslint-disable import/no-extraneous-dependencies */
import request from 'request';

const sendEmail = async (obj) => {
  const options = {
    method: 'POST',
    url: `${process.env.MAILING_SERVER}/sendEmail`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: 'false',
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
      from: `Work-camp<${process.env.SMTP_FROM}>`,
      to: obj.email,
      subject: `Workcamp - ${obj.sub}`,
      html: obj.html,
    }),
  };
  request(options, (error, response) => {
    if (error) {
      return error;
    }
    return response;
  });
};

export default sendEmail;
