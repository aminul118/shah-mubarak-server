import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';
import slugify from 'slugify';

const blogSchema = new Schema<IBlog>(
  {
    content: {
      type: String,
      required: true,
    }, // store HTML content
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Helper function to generate slug
const generateSlug = (title: string) => {
  // Try to slugify, fallback to replacing spaces with dashes for Bangla
  const slug = slugify(title, {
    lower: true,
    strict: false, // ❌ Don't remove non-Latin characters
    locale: 'bn', // Support Bangla
  });

  // If slugify removes everything (Bangla only), fallback
  return slug || title.replace(/\s+/g, '-').toLowerCase();
};

// Generate slug before save (for create)
blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Generate slug before update
blogSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Partial<IBlog>;
  if (update.title) {
    update.slug = generateSlug(update.title);
    this.setUpdate(update);
  }
  next();
});

const Blog = model<IBlog>('Blog', blogSchema);

export { Blog };
