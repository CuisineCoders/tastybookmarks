import { HTMLElement, parse } from 'node-html-parser';

export function validateURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export async function fetchHTMLContent(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok, status ${response.status}`);
    }
    return response.text();
};

export function extractRecipeFromHTML(html: string): any {
    const document: HTMLElement = parse(html);
    const scripts: HTMLElement[] = document.querySelectorAll('script[type="application/ld+json"]');

    const jsonDataArray = scripts.map((script) => JSON.parse(script.textContent))
        .filter((jsonData) => jsonData.hasOwnProperty('@type'))
        .filter((jsonData) => jsonData['@type'] === 'Recipe');

    return jsonDataArray.shift();
};
