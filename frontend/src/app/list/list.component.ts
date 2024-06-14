import { Component } from '@angular/core';
import { RecipeItem } from '../models/recipe-item.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  recipes: RecipeItem[] = [
    { title: 'Recipe 1', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Recipe 2', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Recipe 3', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Recipe 3', imageUrl: './dummy-image-square-300x300.jpg' },
  ];

}
