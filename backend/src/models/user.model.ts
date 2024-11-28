import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAuthToken(): string;
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
});

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT
userSchema.methods.generateAuthToken = function (): string {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });
    return token;
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
