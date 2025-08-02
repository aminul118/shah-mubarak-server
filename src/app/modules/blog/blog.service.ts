import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getBlogs = async () => {
  const result = await Blog.find();
  return result;
};
const getSingleBlog = async (slug: string) => {
  if (!slug) {
    throw new AppError(httpStatus.NOT_FOUND, 'Give Slug and get single blog');
  }
  const result = await Blog.findOne({ slug });
  return result;
};

export const BlogServices = {
  createBlog,
  getBlogs,
  getSingleBlog,
};
