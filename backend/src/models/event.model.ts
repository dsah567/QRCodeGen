import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    timestamp: Date;
    ipAddress: string;
    location: string;
    deviceType: string;
}

const EventSchema: Schema = new Schema({
    timestamp: { type: Date, required: true, default: Date.now },
    ipAddress: { type: String, required: true },
    location: { type: String, required: true },
    deviceType: { type: String, required: true },
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);
