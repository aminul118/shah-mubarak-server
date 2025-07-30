import { Router } from 'express';
import { BlogController } from './blog.controller';

const router = Router();

router.post('/create', BlogController.createBlog);
router.get('/all-blogs', BlogController.getBlogs);

export const BlogRouter = router;
