import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await BlogServices.createBlog(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog create successfully",
    data,
  });
});

const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogServices.getBlogs();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrieve successfully",
    data,
  });
});

export const BlogController = {
  createBlog,
  getBlogs,
};
