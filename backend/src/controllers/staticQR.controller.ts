import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { StaticQR } from '../models/static.model';

export const generateStaticQR = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        const qrCode = await QRCode.toDataURL(url);
        const staticQR = await StaticQR.create({ url, qrCode });
        res.status(201).json({ message: 'Static QR code created', qrCode });
    } catch (err) {
        res.status(400).json({ message: 'Failed to generate static QR code'});
    }
};

export const getSpecificStaticQR = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const staticQR = await StaticQR.findById(id);
        if (!staticQR) return res.status(404).json({ message: 'QR code not found' });
        res.status(200).json(staticQR);
    } catch (err) {
        res.status(400).json({ message: 'Failed to fetch QR code'});
    }
};
