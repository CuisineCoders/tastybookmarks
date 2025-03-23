import { RecipeParser } from "./parsers/recipe-parser";
import { Recipe } from "../model/recipe";
import { ChefkochParser } from "./parsers/chefkoch-parser";
import { EinfachbackenParser } from "./parsers/einfachbacken-parser";

export class RecipeParserManager {
    private parsers: Array<RecipeParser> = [
        new ChefkochParser(),
        new EinfachbackenParser(),
    ];

    public parse(url: string, html: string): Recipe {
        for (const parser of this.parsers) {
            if (parser.canHandle(url)) {
                return parser.parse(url, html);
            }
        }
        throw new Error('Url not supported');
    }
}
