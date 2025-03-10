import { RecipeParser } from "./parsers/recipe-parser";
import { Recipe } from "../model/recipe";

export class RecipeParserManager {
    constructor(private parsers: Array<RecipeParser>) {
    }

    parse(url: string, html: string): Recipe {
        for (const parser of this.parsers) {
            if (parser.canHandle(url)) {
                return parser.parse(url, html);
            }
        }
        throw new Error('Url not supported')
    }
}