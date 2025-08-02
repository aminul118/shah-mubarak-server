import { Router } from 'express';
import { BlogController } from './blog.controller';

const router = Router();

router.post('/create', BlogController.createBlog);
router.get('/all-blogs', BlogController.getBlogs);
router.get('/:slug', BlogController.getSingleBlog);

export const BlogRouter = router;
