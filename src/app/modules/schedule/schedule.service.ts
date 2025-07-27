import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ISchedule } from "./schedule.interface";
import { Schedule } from "./schedule.model";
import { sendEmail } from "../../utils/sendEmail";
import { generateJitsiLink } from "./schedule.utils";
import envVars from "../../config/env";

const createSchedule = async (payload: ISchedule) => {
  const isExists = await Schedule.findOne({
    scheduleDate: payload.scheduleDate,
  });

  if (isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "This slot already booked");
  }

  const meetLink = await generateJitsiLink();

  const data = {
    ...payload,
    meetLink,
  };

  const result = await Schedule.create(data);
  // console.log(result);

  await sendEmail({
    to: result.email,
    subject: `Your Google Meet Link for "${result.subject}"`,
    templateName: "newSchedule",
    templateData: {
      name: result.name,
      email: result.email,
      phone: result.phone,
      message: result.message,
      scheduleDate: new Date(result.scheduleDate).toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
      }),
      meetLink: result.meetLink,
    },
  });
 
  await sendEmail({
    to: envVars.ADMIN_EMAIL,
    subject: `New Meeting Scheduled: ${result.subject}`,
    templateName: "adminSchedule",
    templateData: {
      name: result.name,
      email: result.email,
      phone: result.phone,
      scheduleDate: new Date(result.scheduleDate).toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
      }),
      meetLink: result.meetLink,
    },
  });

  return result;
};

const getAllSchedule = async () => {
  return Schedule.find();
};

export const ScheduleServices = {
  createSchedule,
  getAllSchedule,
};
