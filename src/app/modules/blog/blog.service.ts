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

export const BlogServices = {
  createBlog,
  getBlogs,
};
