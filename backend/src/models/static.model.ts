import mongoose, { Schema, Document } from 'mongoose';

export interface IStaticQR extends Document {
    url: string;
    qrCode: string;
}

const StaticQRSchema: Schema = new Schema({
    url: { type: String, required: true },
    qrCode: { type: String, required: true },
});

export const StaticQR = mongoose.model<IStaticQR>('StaticQR', StaticQRSchema);
