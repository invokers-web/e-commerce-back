import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  product: Schema.Types.ObjectId;
  quantity: number;
  totalItemPrice: number;
}

export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  items: ICartItem[];
  totalCartPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      totalItemPrice: {
        type: Number,
        required: true,
        default: 0,
      },
    }
  ],
  totalCartPrice: {
    type: Number,
    required: true,
    default: 0,
  }
}, {
  timestamps: true,
});

export default mongoose.model<ICart>("Cart", cartSchema);
