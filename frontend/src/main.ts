import { bootstrapApplication } from '@angular/platform-browser';
import {TastyMainComponent} from "./tasty-main/tasty-main.component";
import {tastyMainConfig} from "./tasty-main/tasty-main.config";


bootstrapApplication(TastyMainComponent, tastyMainConfig)
  .catch((err) => console.error(err));
