
import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  description: string;
  logo: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>({
  name: {
    type: String,
    required: [true, "Brand name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  logo: {
    type: String,
    required: [true, "Brand logo is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, {
  timestamps: true,
});

export default mongoose.model<IBrand>("Brand", brandSchema);
