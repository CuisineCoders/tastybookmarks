import { RecipeParser } from "./recipe-parser";
import { HTMLElement, parse } from "node-html-parser";
import { Recipe } from "../../model/recipe";

export class EinfachbackenParser implements RecipeParser {
    canHandle(url: string): boolean {
        return url.includes('einfachbacken.de');
    }

    parse(url: string, html: string): Recipe {
        const recipeData = this.extractRecipeFromHTML(html);

        if (!recipeData) {
            console.warn(`No valid recipe data found for URL: ${url}`);
            throw new Error('No valid JSON+LD Recipe found');
        }

        return this.parseRecipe(recipeData, url) as Recipe;
    }

    private extractRecipeFromHTML(html: string): any {
        const document: HTMLElement = parse(html);
        const scripts: Array<HTMLElement> = document.querySelectorAll('script[type="application/ld+json"]');

        let jsonDataArray = scripts.map((script) => {
            try {
                return JSON.parse(script.textContent);
            } catch (error) {
                console.error("JSON parsing error:", error);
                return null;
            }
        }).filter((jsonData) => jsonData !== null);

        const graphData = jsonDataArray.find((jsonData) => Array.isArray(jsonData["@graph"]));
        if (graphData) {
            return graphData["@graph"].find((entry: any) => entry["@type"] === "Recipe") ?? null;
        }
    };

    private parseRecipe(recipeData: any, url: string): Partial<Recipe> {
        const requiredFields = ['name', 'recipeIngredient', 'recipeInstructions'];
    
        requiredFields.forEach((field) => {
            if (!recipeData[field]) {
                throw new Error(`Recipe data incomplete: ${field} missing`);
            }
        });
    
        // const nutritionObject = recipeData.nutrition
        //     ? {
        //         servingSize: recipeData.nutrition.servingSize ?? undefined,
        //     }
        //     : undefined;
    
        const ingredients = recipeData.recipeIngredient.map((ingredient: string) => ingredient.trim());
    
        const instructions = recipeData.recipeInstructions.map((step: string) => step.trim().split('\n'));
    
        const newRecipe: Partial<Recipe> = {
            url: url,
            name: recipeData.name,
            ingredients: ingredients,
            instructions: instructions,
            description: recipeData.description,
            imageUrl: recipeData.image?.url ?? undefined,
            keywords: recipeData.keywords.split(',') ?? undefined,
            prepTime: recipeData.prepTime,
            cookTime: recipeData.cookTime,
            totalTime: recipeData.totalTime,
            category: recipeData.recipeCategory,
            // servingSize: Number(recipeData.recipeYield[0]) ?? undefined,
            // nutrition: nutritionObject,
        };
    
        return newRecipe;
    }
    
}

// {
//     "@type": "Recipe",
//     name: "Zimtsterne - nach Omas Original-Rezept!",
//     description: "Mit diesem Rezept kannst du klassische Zimtsterne mit Baiser einfach selber backen. Besonders weich und lecker, die schmecken wie vom Bäcker!",
//     keywords: "Anlässe,Weihnachten,Weihnachtsplätzchen,Zimtsterne,Rezepte,Klassiker,Saison,Winter,Mandeln,Puderzucker,Zimt,Eiweiß,Amaretto,Weizenmehl,Vanillezucker",
//     recipeCuisine: "deutsche Rezepte",
//     recipeYield: [
//       "62",
//       "62 Kekse",
//     ],
//     dateModified: "2025-02-11T16:57:48+01:00",
//     datePublished: "2021-12-16T11:11:05+01:00",
//     prepTime: "PT0M",
//     cookTime: "PT55M",
//     totalTime: "PT1H25M",
//     recipeIngredient: [
//       "400 g gemahlene Mandeln",
//       "250 g Puderzucker",
//       "1 TL gemahlener Zimt",
//       "2 Eiweiß (Gr. M)",
//       "2 EL Amaretto",
//       "1 Pck. Vanillezucker",
//       "etwas Weizenmehl zur Teigverarbeitung",
//       "125 g Puderzucker",
//       "1 Eiweiß (Gr. M)",
//     ],
//     recipeInstructions: [
//       "1. ​​​​​​Für den Teig Mandeln Puderzucker Zimt miteinander vermischen. Eiweiß hinzugeben und mit Amaretto und Vanillezucker miteinander verrühren. Teig in Frischhaltefolie wickeln und 30 Minuten kaltstellen.",
//       "2. Arbeitsfläche gut bemehlen und den Teig etwa 5 mm dick ausrollen. Mit einem Sternenausstecher Sterne ausstechen und auf ein mit Backpapier belegtes Blech legen. Ofen auf 120 Grad Umluft vorheizen. ",
//       "3. Für die Glasur Puderzucker und Eiweiß steif schlagen. Mit einem Teelöffel Glasur auf den Sternen verteilen und vorsichtig bis zu den Rändern und spitzen streichen. Sterne im vorgeheizten Ofen ca. 25 Minuten trocknen. Vollständig auskühlen lassen und dann in einer Dose lagern.",
//     ],
//     recipeCategory: "Zimtsterne",
//     author: {
//       "@type": "Person",
//       name: "Anna-Lena",
//       url: "https://www.einfachbacken.de/autoren/anna-lena",
//     },
//     image: {
//       "@type": "ImageObject",
//       representativeOfPage: "True",
//       url: "https://www.einfachbacken.de/sites/einfachbacken.de/files/styles/facebook/public/2021-10/zimtsterne_1_heller.jpg?h=2581597b&itok=U7d-NBWv",
//       width: "1200",
//       height: "630",
//     },
//     nutrition: {
//       "@type": "NutritionInformation",
//       servingSize: "Portion",
//     },
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingValue: "4.98875",
//       ratingCount: "1067",
//       bestRating: "5",
//       worstRating: "1",
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "einfach backen",
//       url: "https://www.einfachbacken.de",
//       logo: {
//         "@type": "ImageObject",
//         url: "https://www.einfachbacken.de/assets/images/logo-einfachbacken-60.jpg",
//         width: 146,
//         height: 60,
//       },
//       address: {
//         "@type": "PostalAddress",
//         addressCountry: "DE",
//         addressLocality: "Offenburg",
//         postalCode: "77652",
//         streetAddress: "Hubert Burda Platz 1",
//       },
//     },
//   }