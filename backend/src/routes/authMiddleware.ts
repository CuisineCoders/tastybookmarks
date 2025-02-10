import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

const client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

export function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            callback(err);
        } else {
            if (key) {
                const signingKey = key.getPublicKey();
                callback(null, signingKey);
            } else {
                callback(new Error('Signing key not found'));
            }
        }
    });
}

export function verifyJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded: any) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log('Decoded JWT:', decoded);
        req.userId = decoded.sub; // `sub` ist die User-ID aus dem JWT
        next();
    });
}
