import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { ScheduleServices } from './schedule.service';

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await ScheduleServices.createSchedule(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule booking successfully',
    data,
  });
});

export const ScheduleController = {
  createSchedule,
};
