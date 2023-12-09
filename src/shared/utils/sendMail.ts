import { template } from "dot";
import { Credentials, SESV2 } from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/sesv2";
import { promises as fs } from "fs";
import config from "../../config";
import LoggerInstance from "../../loaders/logger";

const ses = new SESV2({
  apiVersion: "2019-09-27",
  region: config.aws.region,
  credentials: new Credentials({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  }),
});

const createSesMail = (
  html: string,
  text: string,
  subject: string,
  receiverEmail: string
): SendEmailRequest => {
  const mail: SendEmailRequest = {
    Content: {
      Simple: {
        Body: {
          Html: {
            Data: html,
          },
          Text: {
            Data: text,
          },
        },
        Subject: {
          Data: subject,
        },
      },
    },
    Destination: {
      ToAddresses: [receiverEmail],
    },
    ReplyToAddresses: [config.aws.reply],
    FromEmailAddress: config.aws.from,
  };
  return mail;
};

export const getTemplatedString = (data, file: string): string => {
  const templateVariable = template(file);
  return templateVariable(data);
};

const sendEmail = async (event, user, htmlBuffer, textBuffer, subject, mailType) => {
  try {
    user.qrurl =
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
      encodeURIComponent(user.name + "," + user.email + "," + user._id);
    user.eventName = event.name;
    user.eventTime = event.time.toString();
    user.eventVenue = event.venue;
    const mail = createSesMail(
      getTemplatedString(user, htmlBuffer.toString()),
      getTemplatedString(user, textBuffer.toString()),
      subject,
      user.email
    );
    const request = ses.sendEmail(mail);
    return request.promise();
  } catch (error) {
    LoggerInstance.error(
      `Email failed to ${user.email}.\nMail type: ${mailType}\nError: ${error.message}`
    );
  }
};

export const sendThankyouMail = async (event, user) => {
  try {
    const htmlBuffer = await fs.readFile("./public/thankyou.html");
    const textBuffer = await fs.readFile("./public/thankyou.html");
    const subject = `ThankYou for registring for ${event.name}`;
    await sendEmail(event, user, htmlBuffer, textBuffer, subject, "Thank You Mail");
  } catch (error) {
    LoggerInstance.error(
      `Email failed to ${user.email} due to failder loading of thankyou.html template.\nError: ${error.message}`
    );
  }
};

export const sendRSVPFormMail = async (event, user) => {
  try {
    const htmlBuffer = await fs.readFile("./public/rsvpform.html");
    const textBuffer = await fs.readFile("./public/rsvpform.html");
    const subject = `Please confirm your presence for ${event.name}`;
    await sendEmail(event, user, htmlBuffer, textBuffer, subject, "RSVP Form Mail");
  } catch (error) {
    LoggerInstance.error(
      `Email failed to ${user.email} due to failder loading of rsvpform.html template.\nError: ${error.message}`
    );
  }
};

export const sendQRMail = async (event, user) => {
  try {
    const htmlBuffer = await fs.readFile("./public/qr.html");
    const textBuffer = await fs.readFile("./public/qr.html");
    const subject = `Your ticket for ${event.name} is here🎟🎫`;
    await sendEmail(event, user, htmlBuffer, textBuffer, subject, "QR Mail");
  } catch (error) {
    LoggerInstance.error(
      `Email failed to ${user.email} due to failder loading of qr.html template.\nError: ${error.message}`
    );
  }
};
