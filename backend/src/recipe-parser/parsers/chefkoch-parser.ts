import { RecipeParser } from "./recipe-parser";
import { HTMLElement, parse } from "node-html-parser";
import { Recipe } from "../../model/recipe";

export class ChefkochParser extends RecipeParser {
    public canHandle(url: string): boolean {
        return url.includes('chefkoch.de');
    }

    public parse(url: string, html: string): Recipe {
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

        return jsonDataArray.find((jsonData) => jsonData["@type"] === "Recipe") ?? null;
    };

    private parseRecipe(recipeData: any, url: string): Partial<Recipe> {
        this.requireFieldsValidation(recipeData);

        const nutritionObject = recipeData.nutrition
                                ? {
                servingSize:         Number(recipeData.nutrition.servingSize) ?? undefined,
                calories:            recipeData.nutrition.calories,
                proteinContent:      recipeData.nutrition.proteinContent,
                fatContent:          recipeData.nutrition.fatContent,
                carbohydrateContent: recipeData.nutrition.carbohydrateContent,
            }
                                : undefined;

        const videoObject = recipeData.video && recipeData.video.length > 0 && recipeData.video[0].name
                            && recipeData.video[0].contentUrl
                            ? {
                name:         recipeData.video[0].name,
                description:  recipeData.video[0].description,
                thumbnailUrl: recipeData.video[0].thumbnailUrl,
                contentUrl:   recipeData.video[0].contentUrl,
                embedUrl:     recipeData.video[0].embedUrl,
                uploadDate:   recipeData.video[0].uploadDate,
            }
                            : undefined;

        const ingredients = recipeData.recipeIngredient.map((ingredient: string) => ingredient.trim());

        const instructions = recipeData.recipeInstructions
                                       .split('\n\n')
                                       .map((paragraph: string) => paragraph.split('\n')
                                                                            .map((line: string) => line.trim()));

        return  {
            url:          url,
            name:         recipeData.name,
            ingredients:  ingredients,
            instructions: instructions,
            description:  recipeData.description,
            imageUrl:     recipeData.image,
            keywords:     recipeData.keywords ?? undefined,
            prepTime:     recipeData.prepTime,
            cookTime:     recipeData.cookTime,
            totalTime:    recipeData.totalTime,
            category:     recipeData.recipeCategory,
            servingSize:  Number(recipeData.recipeYield),
            nutrition:    nutritionObject,
            video:        videoObject,
        }
    }
}

// {
//     "@context": "http://schema.org",
//     "@type": "Recipe",
//     image: "https://img.chefkoch-cdn.de/rezepte/63031022928945/bilder/1036272/crop-960x540/ratatouille.jpg",
//     recipeCategory: "Raffiniert & preiswert",
//     recipeIngredient: [
//       "3  Paprikaschote(n), rote , grüne, gelbe",
//       "1  Zucchini",
//       "1  Zwiebel(n)",
//       "1  Aubergine(n)",
//       "2  Tomate(n)",
//       " Salz und Pfeffer",
//       " Knoblauch",
//       " Thymian",
//       " Butterschmalz oder Olivenöl",
//     ],
//     name: "Ratatouille",
//     description: "Ratatouille. Über 456 Bewertungen und für sehr gut befunden. Mit ► Portionsrechner ► Kochbuch ► Video-Tipps! Jetzt entdecken und ausprobieren!",
//     recipeInstructions: "Der einzige Unterschied zu den unzähligen Rezepten besteht eigentlich nur darin, dass ich die einzelnen Zutaten immer getrennt brate und erst ganz zum Schluss mische. So sind die Bestandteile meiner Ratatouille für das Auge immer erkennbar und verschwinden nicht in der Tomatensoße.\n\nAn Gemüse nehme ich, was der Markt eben hergibt. Immer dabei sind bunte Paprika, Zucchini, Zwiebeln und Auberginen. Die werden klitzeklein gewürfelt also so ungefähr Erbsengröße und immer schön separat in Butterschmalz gebraten. Olivenöl ist natürlich auch nicht falsch. \n\nUnd die Tomaten? Richtig, die werden überbrüht, enthäutet entkernt und dann in kleinen Stücken dem Ratatouille ganz zum Schluss zugemischt.\n\nGewürzt wird mit Salz, Pfeffer, Knoblauch, Thymian und was einem sonst noch einfällt. Jetzt wird das Ganze nochmals aufgewärmt. Das Gemüse hat noch Biss. Aber den kann man ja mit der Aufwärmzeit noch korrigieren.",
//     author: {
//       "@type": "Person",
//       name: "Daniel",
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "Chefkoch.de",
//     },
//     datePublished: "2002-06-03",
//     prepTime: "P0DT0H30M",
//     cookTime: "P0DT0H20M",
//     totalTime: "P0DT0H50M",
//     recipeYield: "4",
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingCount: 456,
//       ratingValue: 4.47,
//       reviewCount: 265,
//       worstRating: 0,
//       bestRating: 5,
//     },
//     video: [
//       {
//         "@type": "VideoObject",
//         name: "Video zu Ratatouille",
//         description: "Video zu Ratatouille",
//         thumbnailUrl: "https://img.chefkoch-cdn.de/images/crop-960x540/ck.de/videos/thumbs/612-org.jpg",
//         contentUrl: "https://www.chefkoch.de/rezepte/63031022928945/Ratatouille.html",
//         embedUrl: "https://img.chefkoch-cdn.de/ck.de/videos/612-video.mp4",
//         uploadDate: "2002-06-03",
//       },
//     ],
//     nutrition: {
//       "@type": "NutritionInformation",
//       servingSize: "1",
//       calories: "110 kcal",
//       proteinContent: "3,62g",
//       fatContent: "6,65g",
//       carbohydrateContent: "8,50g",
//     },
//     keywords: [
//       "Gemüse",
//       "Hauptspeise",
//       "Sommer",
//       "Europa",
//       "Vegetarisch",
//       "Beilage",
//       "raffiniert oder preiswert",
//       "Schnell",
//       "einfach",
//       "kalorienarm",
//       "Braten",
//       "Frankreich",
//       "Paleo",
//     ],
//     reviews: [
//       {
//         "@type": "Review",
//         reviewBody: "Großartiges Rezept, so kenne ich es aus Südfrankreich.\r\nMeine Empfehlung: mit reichlich Oregano würzen-\r\nEin wenig Gemüsebrühe macht sich auch gut.\r\nVG Volker",
//         datePublished: "2025-01-29",
//         author: {
//           "@type": "Person",
//           name: "skipper00",
//         },
//       },
//       {
//         "@type": "Review",
//         reviewBody: "Hallo!\r\nDeine Ratatouille gab es zu Lammbraten und Kritharaki. Das Gemüse sieht sehr schön aus und ist sehr lecker und aromatisch! Es schmeckt sehr gut auch vegetarisch einfach mit Nudeln oder auch kalt als Salat mit Schafskäse. Mmmh!\r\nLG wiemy",
//         datePublished: "2024-05-02",
//         author: {
//           "@type": "Person",
//           name: "Wiemy",
//         },
//       },
//       {
//         "@type": "Review",
//         reviewBody: "Habe das Ratatouille gestern zu Flanksteak gemacht. Die Komponenten einzeln in einem guten Olivenöl anzubraten lohnt sich wirklich. Sehr lecker, Gemüse noch mit Biss. Wird es wieder geben. \nDanke für das schöne Rezept.",
//         datePublished: "2023-07-24",
//         author: {
//           "@type": "Person",
//           name: "Brennesselbusch",
//         },
//       },
//       {
//         "@type": "Review",
//         reviewBody: "Hallöchen,\ntolles Rezept ❗\n5 ⭐⭐⭐⭐⭐❗\nEtwas Arbeit, aber es lohnt sich und schmeckt fantastisch 😋❗\nLG\nschinkenröllchen13 ",
//         datePublished: "2023-04-02",
//         author: {
//           "@type": "Person",
//           name: "schinkenröllchen13",
//         },
//       },
//       {
//         "@type": "Review",
//         reviewBody: "Sehr schönes Rezept. Das Endergebnis entschädigt für die ganze schnippelei. Kommt definitiv noch mal auf den Tisch.",
//         datePublished: "2022-10-14",
//         author: {
//           "@type": "Person",
//           name: "bubu614",
//         },
//       },
//     ],
//   }