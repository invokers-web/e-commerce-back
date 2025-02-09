import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  image?: string;
}

const blogsSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IBlog>("Blog", blogsSchema);
