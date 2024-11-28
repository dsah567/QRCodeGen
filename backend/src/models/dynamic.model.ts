import mongoose, { Schema, Document } from 'mongoose';

export interface IDynamicQR extends Document {
    originalUrl: string;
    shortUrl: string;
    qrCode: string;
    events: mongoose.Types.ObjectId[];
}

const DynamicQRSchema: Schema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    qrCode: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

export const DynamicQR = mongoose.model<IDynamicQR>('DynamicQR', DynamicQRSchema);
