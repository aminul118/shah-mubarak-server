import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import SubscriptionServices from "./subscription.service";

const createSubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionServices.createSubscription(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Subscription successfully",
    data: result,
  });
});

export const SubscriptionController = {
  createSubscription,
};
