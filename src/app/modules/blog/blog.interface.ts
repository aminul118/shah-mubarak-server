import { Document } from "mongoose";

interface IBlog extends Document {
  title: string;
  category: string;
  content: string; // HTML string from Quill editor
  createdAt: Date;
  updatedAt: Date;
}

export { IBlog };
