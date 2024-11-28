import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { DynamicQR } from '../models/dynamic.model';

export const generateDynamicQR = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        const shortUrl = `${req.protocol}://${req.get('host')}/r/${Math.random().toString(36).substr(2, 8)}`;
        const qrCode = await QRCode.toDataURL(shortUrl);
        const dynamicQR = await DynamicQR.create({ originalUrl: url, shortUrl, qrCode });
        res.status(201).json({ message: 'Dynamic QR code created', qrCode, shortUrl });
    } catch (err) {
        res.status(400).json({ message: 'Failed to generate dynamic QR code' });
    }
};

export const updateDynamicQR = async (req: Request, res: Response) => {
    try {
        const { id, newUrl } = req.body;
        const dynamicQR = await DynamicQR.findByIdAndUpdate(id, { originalUrl: newUrl }, { new: true });
        if (!dynamicQR) return res.status(404).json({ message: 'QR code not found' });
        const qrCode = await QRCode.toDataURL(dynamicQR.shortUrl);
        dynamicQR.qrCode = qrCode;
        await dynamicQR.save();
        res.status(200).json({ message: 'Dynamic QR code updated', qrCode });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update QR code'});
    }
};
