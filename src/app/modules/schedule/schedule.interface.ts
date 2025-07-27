export interface ISchedule {
  name: string;
  email: string;
  phone: string;
  scheduleDate: Date;
  subject: string;
  message: string;
  meetLink?: string;
}
