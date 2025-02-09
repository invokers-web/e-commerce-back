import mongoose, { Schema, Document } from "mongoose";


export interface IAddress extends Document {
    user: Schema.Types.ObjectId;
    apartment: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;

}
const addressSchema = new Schema<IAddress>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    apartment: {
        type: String,
        required: [true, "Apartment is required"],
    },
    street: {
        type: String,
        required: [true, "Street is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    state: {
        type: String,
        required: [true, "State is required"],
    },
    zipCode: {
        type: String,
        required: [true, "Zip Code is required"],
    },
});

export default mongoose.model<IAddress>("Address", addressSchema);
