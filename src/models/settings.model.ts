import mongoose, { Schema, Document } from "mongoose";


export interface ILanguage {
    en: string;
    ar: string
}

export interface ISocialMedia {
    image: string;
    link: string
}

export interface IContact {
    phones: string[];
    email: string;
    socialMedia: ISocialMedia[];
    address: string;
    hotline: string;
}

export interface ISettings extends Document {
    name: ILanguage;
    description: ILanguage;
    logo: string;
    favicon: string;
    contact: IContact;
    about: ILanguage;
    termsAndConditions: ILanguage;
    privacyPolicy: ILanguage;

}

const settingsSchema = new Schema<ISettings>({
    name: {
        en: {
            type: String,
            required: [true, "English Name is required"]
        },
        ar: {
            type: String,
            required: [true, "Arabic Name is required"]
        }
    },
    description: {
        en: {
            type: String,
            required: [true, "Enlgish Description is required"]
        },
        ar: {
            type: String,
            required: [true, "Arabic Description is required"]
        }

    },
    logo: {
        type: String,
        required: [true, "Logo URL is required"]
    },
    favicon: {
        type: String,
        required: [true, "Favicon URL is required"]
    },
    contact: {
        address: {
            type: String,
            required: [true, "Address is required"]
        },
        hotline: {
            type: String,
            required: [true, "Phone number is required"]
        },
        phones: [
            {
                type: String,
                required: [true, "Phone number is required"]
            }
        ],
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        socialMedia: [
            {
                image: {
                    type: String,
                    required: [true, "Social media image is required"]
                },
                url: {
                    type: String,
                    required: [true, "Social media URL is required"]
                }
            }
        ]
    }
})

export default mongoose.model<ISettings>("Settings", settingsSchema);