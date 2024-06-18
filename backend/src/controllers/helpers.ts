import { HTMLElement, parse } from 'node-html-parser';

export const validateURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const fetchHTMLContent = async (url: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok, status ${response.status}`);
    }
    return response.text();
};

export const extractRecipeFromHTML = (html: string): any => {
    const document: HTMLElement = parse(html);
    const scripts: HTMLElement[] = document.querySelectorAll('script[type="application/ld+json"]');

    for (let script of scripts) {
        try {
            console.log(script);
            
            const data = JSON.parse(script.textContent);
            if (data['@type'] === 'Recipe') {
                return data;
            }
        } catch (error) {
            console.error('Error parsing JSON-LD script:', error);
        }
    }
    return null;
};
