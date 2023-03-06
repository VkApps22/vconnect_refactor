import nodemailer from 'nodemailer';
import sendEmailService from '../send';
import { env } from '../../../config';

const sendMailMock = jest.fn();
jest.mock('nodemailer');
const mockNodeMailer = () =>
  nodemailer.createTransport.mockImplementationOnce(() => ({
    sendMail: sendMailMock,
  }));

describe('sendEmail', () => {
  it('happy day', async () => {
    mockNodeMailer();

    await sendEmailService({
      to: 'devtestexperiment2020@gmail.com',
      subject: 'Test email',
      body: '<b>Hello World</b>',
    });

    expect(nodemailer.createTransport).toBeCalledWith({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
    });
    expect(sendMailMock).toBeCalledWith({
      from: `"VConnect – Platform" <${env.EMAIL_FROM}>`,
      to: 'devtestexperiment2020@gmail.com',
      subject: 'Test email',
      html: '<b>Hello World</b>',
    });
  });
});
