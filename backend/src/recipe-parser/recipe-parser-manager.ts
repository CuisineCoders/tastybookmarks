import { Recipe } from "../model/recipe";
import { ChefkochParser } from "./parser/chefkoch-parser";
import { RecipeParser } from "./parser/recipe-parser";

export class RecipeParserManager {
    private parsers: Array<RecipeParser> = [
        new ChefkochParser()
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
