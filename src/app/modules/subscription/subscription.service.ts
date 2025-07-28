import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ISubscription } from "./subscription.interface";
import { Subscription } from "./subscription.model";
import sendEmail from "../../utils/sendEmail";
import envVars from "../../config/env";

const createSubscription = async (payload: ISubscription) => {
  const isEmailExits = await Subscription.findOne({ email: payload.email });
  if (isEmailExits) {
    throw new AppError(httpStatus.FORBIDDEN, "Email already subscribed");
  }
  const result = await Subscription.create(payload);
  await sendEmail({
    to: payload.email,
    subject: "News Subscription Successfully",
    templateName: "subscriptionDone",
    templateData: {
      email: payload.email,
    },
  });

  await sendEmail({
    to: envVars.ADMIN_EMAIL,
    subject: "News Subscription",
    templateName: "subscriptionAdminAlert",
    templateData: {
      email: payload.email,
      time: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
    },
  });

  return result;
};

const SubscriptionServices = {
  createSubscription,
};

export default SubscriptionServices;
