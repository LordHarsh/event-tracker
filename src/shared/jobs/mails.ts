import z from "zod";
import { eventTrigger, intervalTrigger } from "@trigger.dev/sdk";
import { client } from "../middlewares/trigger";
import { sendThankyouMail } from "../utils/sendMail";

// your first job
client.defineJob({
  id: "send-single-mail",
  name: "Send Single Mail",
  version: "0.1.0",
  trigger: intervalTrigger({
    seconds: 60,
  }),
  run: async (payload, io, ctx) => {
    await io.wait("Trying the dely", 5000);
    // await io.runTask("send-sinle-mail", async () => {
    //   return sendThankyouMail(payload.event, payload.user);
    // });
    await io.logger.info("Email Sent to ", { payload });
    return {
      message: "Email Sent",
    };
  },
});
