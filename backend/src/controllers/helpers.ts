import { HTMLElement, parse } from 'node-html-parser';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';


export function validate(url: string): string | null {
    if (!url) {
        return 'URL is required';
    }
    try {
        new URL(url);
    } catch {
        return 'Invalid URL';
    }
    return null; // URL is valid
}

export async function fetchHTMLContent(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok, status ${response.status}`);
    }
    return response.text();
};

export function extractRecipeFromHTML(html: string): any {
    const document: HTMLElement = parse(html);
    const scripts: Array<HTMLElement> = document.querySelectorAll('script[type="application/ld+json"]');

    const jsonDataArray = scripts.map((script) => JSON.parse(script.textContent))
        .filter((jsonData) => jsonData.hasOwnProperty('@type'))
        .filter((jsonData) => jsonData['@type'] === 'Recipe');

    return jsonDataArray.shift();
};

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