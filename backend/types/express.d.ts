import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload; // Adjust based on what you store in `req.user`
        }
    }
}
