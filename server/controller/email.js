import email from '../services/email';
import loger from '../services/loger';
import { EMAIL_SUBJECT, EMAIL_TEXT_DEFAULT } from '../resources/constant';

const sendConfirmamtion = (data, emailChannel) => {
  const dt = JSON.parse(data.content.toString());
  const mail = {
    to: dt.email,
    sub: EMAIL_SUBJECT,
    html: EMAIL_TEXT_DEFAULT,
  };

  email(mail, (err, info) => {
    if (err) {
      loger.error(`email fail to send:> ${err.messsage}`);
    } else {
      loger.info('Email successfully sent.');
      emailChannel.ack();
    }
  });
};

export default sendConfirmamtion;
