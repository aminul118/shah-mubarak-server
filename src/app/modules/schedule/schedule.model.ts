import { Schema, model } from 'mongoose';
import { ISchedule } from './schedule.interface';

const scheduleSchema = new Schema<ISchedule>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{10,15}$/,
    },
    scheduleDate: {
      type: Date,
      required: true,
    },
    meetLink: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Schedule = model<ISchedule>('Schedule', scheduleSchema);

export { Schedule };
