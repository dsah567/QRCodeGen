import { Request, Response } from 'express';
import User from '../models/user.model'; // Assuming you have this
import {StaticQR} from '../models/static.model'; // Assuming you have this
import {DynamicQR} from '../models/dynamic.model'; // Assuming you have this
import { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload

// User Signup
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password, phone });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
};

// Get All Static QR Codes
export const getStaticQRCodes = async (req: Request, res: Response) => {
    try {
        if (!req.user || typeof req.user === 'string') {
            return res.status(401).json({ message: 'Unauthorized: Invalid user data' });
        }

        const userId = (req.user as JwtPayload).id;
        const staticQRCodes = await StaticQR.find({ owner: userId });

        res.status(200).json({ staticQRCodes });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
};

export const getDynamicQRCodes = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as JwtPayload).id;
        const dynamicQRs = await User.findById(userId).populate('dynamicQRs');
        res.status(200).json(dynamicQRs);
    } catch (err) {
        res.status(400).json({ message: 'Failed to fetch dynamic QR codes'});
    }
};