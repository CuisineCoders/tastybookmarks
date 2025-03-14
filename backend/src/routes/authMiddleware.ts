import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export interface AuthenticatedRequest extends Request {
    userId: string;
}

const client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.REGION_AWS}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

export function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    client.getSigningKey(header.kid, (err: any, key: any) => {
        if (key) {
            callback(null, key.getPublicKey());
            return
        }

        callback(err ? err : new Error('Signing key not found'));
    });
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err: any, decoded: any) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        if (!decoded.sub) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        (req as AuthenticatedRequest).userId = decoded.sub;
        next();
    });
}
