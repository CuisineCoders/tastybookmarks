import {bootstrapApplication} from '@angular/platform-browser';
import {TastyComponent} from "./tasty-main/tasty.component";
import {tastyConfig} from "./tasty-main/tasty.config";


bootstrapApplication(TastyComponent, tastyConfig)
  .catch((err) => console.error(err));
